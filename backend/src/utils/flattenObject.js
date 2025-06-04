function flattenObject(obj, prefix = "", res = {}) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        flattenObject(value, newKey, res);
      } else {
        res[newKey] = value;
      }
    }
  }
  return res;
}
export default flattenObject;