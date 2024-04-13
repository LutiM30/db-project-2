export function areAllValuesExist(obj) {
  for (let value of Object.values(obj)) {
    if (value === undefined || value === null || value === "") {
      return false;
    }
  }
  return true;
}
