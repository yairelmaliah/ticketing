export const getAllObjectMethods = (obj: object) => {
  let result = [];

  do {
    result.push(...Object.getOwnPropertyNames(obj));
  } while ((obj = Object.getPrototypeOf(obj)));

  return result;
};
