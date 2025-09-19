// src/utils/modelsMap.js
import User from "../models/userModel.js";
import Customer from "../models/customerModel.js";
import RepairJob from "../models/repairJobModel.js";
import SparePart from "../models/sparePartModel.js";
import Supplier from "../models/supplierModel.js"
import SparePartEntry from "../models/sparePartEntryModel.js";

export const modelsMap = {
  users: User,
  user: User,
  User,
  customer:Customer,
  customers:Customer,
  Customer,
  RepairJob,
  repairJob:RepairJob,
  sparePartEntry:SparePartEntry,
  SparePartEntry,
  spareParts:SparePart,
  sparePart:SparePart,
  SparePart,
  supplier:Supplier,
  Supplier
};