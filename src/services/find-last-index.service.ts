export const findLastIndex = <T>(
  arr: Array<T>,
  callBack: (x: T) => boolean
): number => {
  const index = [...arr].reverse().findIndex((x: T) => callBack(x));
  if (index === -1) return -1;
  return arr.length - 1 - index;
};
