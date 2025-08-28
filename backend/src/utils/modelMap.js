// src/utils/modelsMap.js
import User from "../models/userModel.js";
import Customer from "../models/customerModel.js";
import RepairJob from "../models/repairJobModel.js";
import SparePart from "../models/sparePartModel.js";
import Supplier from "../models/supplierModel.js"

export const modelsMap = {
  users: User,
  user: User,
  User,
  Customer,
  RepairJob,
  SparePart,
  Supplier
};