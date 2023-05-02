export type ObjectFieldType = {
  [field: string]: string | object | string[] | object[] | any;
};

export const trimAllValueWithObjectField = (objField: ObjectFieldType) => {
  if ((!Array.isArray(objField) && typeof objField !== 'object') || objField === null) {
    return objField;
  }
  return Object.keys(objField).reduce(
    (acc: ObjectFieldType, key) => {
      acc[key] =
        typeof objField[key] === 'string'
          ? (objField[key] as string).trim()
          : trimAllValueWithObjectField(objField[key]);
      return acc;
    },
    Array.isArray(objField) ? [] : {},
  );
};
