// src/controllers/lookupController.js
import { modelsMap } from "../utils/modelMap.js";
import { lookupValidation } from "../validations/lookup/lookup.validation.js";
import { createError } from "../utils/errorHandler.js";
import response from "../utils/response.js";
import { getPaginationOptions } from "../utils/pagination.js";

/** Safely parse JSON from string or return object as-is */
function safeParseJSON(maybeJSON) {
  if (!maybeJSON) return undefined;
  if (typeof maybeJSON === "object") return maybeJSON;
  try {
    return JSON.parse(maybeJSON);
  } catch {
    return undefined;
  }
}

/** Escape regex special chars for search */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Get nested value from doc using dot-path (works with populated docs too) */
function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

/** Build label string from displayFields; fallback chain if empty */
function buildLabel(doc, fields) {
  const parts = fields
    .map((f) => getNestedValue(doc, f))
    .filter((v) => v !== undefined && v !== null && `${v}`.trim() !== "");
  if (parts.length) return parts.join(" - ");
  // sensible fallbacks
  return doc.displayName || doc.name || doc.title || doc.code || `${doc._id}`;
}

/** Validate that requested fields are safe/known for the Model */
function validateDisplayFields(Model, fields) {
  const schemaPaths = new Set(Object.keys(Model.schema.paths)); // includes _id and nested paths (e.g., "address.city")
  const virtuals = Model.schema.virtuals || {}; // populated virtuals allowed (e.g., "customer")
  const allowFirstSegments = new Set([
    ...Array.from(schemaPaths).map((p) => p.split(".")[0]),
    ...Object.keys(virtuals),
  ]);

  const blacklist = new Set(["password", "hash", "salt"]);
  fields.forEach((f) => {
    const first = f.split(".")[0];
    if (!allowFirstSegments.has(first)) {
      throw createError(400, `Field "${f}" is not a valid path for ${Model.modelName}`);
    }
    if (blacklist.has(first)) {
      throw createError(400, `Field "${f}" is not allowed`);
    }
  });
}

/** Convert displayFields to a projection string (always include _id) */
function makeProjection(fields) {
  const set = new Set(["_id", ...fields]);
  return Array.from(set).join(" ");
}

/** Normalize populate input into an array acceptable by Mongoose */
function normalizePopulate(populate) {
  if (!populate) return [];
  const p = typeof populate === "string" ? safeParseJSON(populate) ?? populate : populate;
  if (Array.isArray(p)) return p;
  if (typeof p === "string") return [{ path: p }];
  if (typeof p === "object") return [p];
  return [];
}

export const lookup = async (req, res, next) => {
  try {
    // 1) Validate basic query shape
    const { error, value } = lookupValidation.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const {
      module: moduleName,
      displayField,
      criteria,
      search,
      populate,
      sort,
    } = value;

    // 2) Resolve Model
    const Model = modelsMap[moduleName];
    if (!Model) {
      throw createError(400, `Unknown module "${moduleName}"`);
    }

    // 3) Parse fields & validate
    const fields = displayField.split(",").map((f) => f.trim()).filter(Boolean);
    if (!fields.length) throw createError(400, "displayField must include at least one field");
    validateDisplayFields(Model, fields);

    // 4) Build query/filter
    const baseFilter = safeParseJSON(criteria) ?? {};
    if (typeof baseFilter !== "object" || Array.isArray(baseFilter)) {
      throw createError(400, "criteria must be an object or JSON object string");
    }

    // 5) Search across display fields (case-insensitive)
    let filter = { ...baseFilter };
    if (search && search.trim() !== "") {
      const rx = new RegExp(escapeRegex(search.trim()), "i");
      const or = fields.map((f) => ({ [f]: rx }));
      filter = { $and: [baseFilter, { $or: or }] };
    }

    // 6) Pagination & sorting
    const { page, limit, skip } = getPaginationOptions({
      page: req.query.page,
      limit: req.query.limit,
    });

    // 7) Projection
    const projection = makeProjection(fields);

    // 8) Build query
    // let query = Model.find(filter).select(projection).sort(sortObj).skip(skip).limit(limit);
    let query = Model.find(filter).select(projection).skip(skip).limit(limit);

    // 9) Populate (optional)
    const populateArr = normalizePopulate(populate);
    if (populateArr.length) {
      populateArr.forEach((p) => {
        // minimal sanitize: require "path"
        if (typeof p === "string") query = query.populate(p);
        else if (p && typeof p === "object" && p.path) query = query.populate(p);
      });
    }

    // 10) Execute
    const [docs, total] = await Promise.all([
      query.exec(),
      Model.countDocuments(filter),
    ]);

    // 11) Format
    const data = docs.map((doc) => ({
      value: doc._id,
      label: buildLabel(doc, fields),
      // Optional: include raw for advanced UIs; comment in/out as you prefer
      // raw: doc,
    }));

    return response(res, data, `${moduleName} lookup data fetched`, {
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / (limit || 1)),
        // sort: sortObj,
      },
    });
  } catch (err) {
    next(err);
  }
};
