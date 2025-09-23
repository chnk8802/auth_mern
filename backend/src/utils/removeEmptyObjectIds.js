// utils/removeEmptyObjectIds.js
export function removeEmptyObjectIds(obj) {
  for (const key in obj) {
    if (
      obj[key] === "" &&
      obj.hasOwnProperty(key) &&
      obj[key] !== undefined
    ) {
      // Only sanitize if the schema path is ObjectId
      if (
        obj[key] === "" &&
        obj.constructor?.schema?.paths?.[key]?.instance === "ObjectID"
      ) {
        obj[key] = undefined;
      }
    }
  }
  return obj;
}
