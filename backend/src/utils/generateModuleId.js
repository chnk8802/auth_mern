import Counter from "../models/counterModel.js";

/**
 * Generates a unique ID like "USR0001", "ORD0001", etc.
 * @param {string} module - Full module name for counter tracking (e.g., "user", "order").
 * @param {string} prefix - Short prefix for final ID (e.g., "USR", "ORD").
 * @returns {Promise<string>} - A promise that resolves to the generated ID.
 */
export const generateModuleId = async (module, prefix) => {
  const moduleKey = module.toLowerCase();

  const counter = await Counter.findOneAndUpdate(
    { module: moduleKey },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const paddedSeq = String(counter.seq).padStart(4, "0");
  return `${prefix.toUpperCase()}${paddedSeq}`;
};