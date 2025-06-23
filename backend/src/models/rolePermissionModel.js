import mongoose from "mongoose";

const RolePermissionSchema = new mongoose.Schema({
  role: { type: String, required: true },
  model: { type: String, required: true },
  canReadFields: { type: [String] },
  canWriteFields: { type: [String] },
});

const RolePermission = mongoose.model("RolePermission", RolePermissionSchema);

export default RolePermission;