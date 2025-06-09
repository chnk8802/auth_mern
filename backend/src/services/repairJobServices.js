import RepairJob from "../models/repairJobModel.js";

/**
 * Get a single repair job with populated spare part info
 */
// export const getRepairJobWithSpareParts = async (repairJobId, customSelect = null) => {
//   return await RepairJob.findById(repairJobId)
//     .select(customSelect || 'repairStatus repairJobCode finalCost paymentDetails sparePartEntries')
//     .populate({
//       path: 'sparePartEntries',
//       select: 'sparePart supplier unitCost',
//       populate: [
//         {
//           path: 'sparePart',
//           select: 'name stock',
//         },
//         {
//           path: 'supplier',
//           select: 'name contact',
//         },
//       ],
//     });
// };
/**
 * List repair jobs with filters, tokenized search, pagination, sorting, and projection
 */
export const listRepairJobs = async ({
  filter = {},
  search = "",
  page = 1,
  limit = 25,
  sort = "-createdAt",
  select = "repairStatus repairJobCode deviceModel finalCost repairCost paymentDetails",
} = {}) => {
  const skip = (page - 1) * limit;

  // Build tokenized search condition
  const searchConditions = [];
  if (search && typeof search === "string") {
    const tokens = search.trim().split(/\s+/); // Split by space
    for (const token of tokens) {
      const regex = new RegExp(token, "i");
      searchConditions.push({
        $or: [
          { repairJobCode: regex },
          { deviceModel: regex },
          { issueDescription: regex },
        ],
      });
    }
  }

  // Combine filters with tokenized AND of OR conditions
  const finalFilter = {
    ...filter,
    ...(searchConditions.length ? { $and: searchConditions } : {}),
  };

  console.log("finalFilter", finalFilter, filter, search, page, limit, sort, select);

  // Query DB
  const query = RepairJob.find(finalFilter)
    .select(select)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate({
      path: "customer",
      select: "fullName phone",
    });

  const total = await RepairJob.countDocuments(finalFilter);
  const data = await query;

  return {
    data,
    page,
    totalPages: Math.ceil(total / limit),
    totalRecords: total,
  };
};