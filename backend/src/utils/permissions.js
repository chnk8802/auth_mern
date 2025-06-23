import RolePermission from "../models/rolePermissionModel";

async function getPermissions(role, model) {
  const permission = await RolePermission.findOne({ role, model }).lean();
  if (!permission) {
    console.warn(`No permissions found for role: "${role}", model: "${model}"`);
    return { canReadFields: [], canWriteFields: [] };
  }
  return {
    canReadFields: permission.canReadFields || [],
    canWriteFields: permission.canWriteFields || [],
  };
}
