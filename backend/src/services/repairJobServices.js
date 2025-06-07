import RepairJob from "../models/repairJobModel.js";

/**
 * Get a single repair job with populated spare part info
 */
export const getRepairJobWithSpareParts = async (repairJobId, customSelect = null) => {
  return await RepairJob.findById(repairJobId)
    .select(customSelect || 'repairStatus repairJobCode finalCost paymentDetails sparePartEntries')
    .populate({
      path: 'sparePartEntries',
      select: 'sparePart supplier unitCost',
      populate: [
        {
          path: 'sparePart',
          select: 'name stock',
        },
        {
          path: 'supplier',
          select: 'name contact',
        },
      ],
    });
};

/**
 * List repair jobs with filters, pagination, sorting, and projection
 */
export const listRepairJobs = async ({
  filter = {},
  page = 1,
  limit = 10,
  sort = '-createdAt',
  select = 'repairStatus repairJobCode deviceModel finalCost repairCost paymentDetails'
} = {}) => {
  const skip = (page - 1) * limit;
  const query = RepairJob.find(filter)
    .select(select)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate({
      path: 'customer',
      select: 'name phoneNumber',
    });

  const total = await RepairJob.countDocuments(filter);
  const data = await query;

  return {
    data,
    page,
    totalPages: Math.ceil(total / limit),
    totalRecords: total,
  };
};
