// Deal with floating points returning odd values.
export const round = (number) => {
  let output = number;

  // const difference = number - Math.round(number);

  // console.log(
  //   "Round: ",
  //   number,
  //   Math.round(number),
  //   difference,
  //   Math.pow(Math.pow(difference, 2), 1 / 2),
  //   Math.pow(Math.pow(difference, 2), 1 / 2) < 0.000_000_000_001
  // );

  // if (Math.pow(Math.pow(difference, 2), 1 / 2) < 0.000_000_000_001)
  //   return Math.round(number);

  return output;
};
