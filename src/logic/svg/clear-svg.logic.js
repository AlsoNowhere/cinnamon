export const clearSVG = (svg) => {
  [...svg.children].forEach((x) => svg.removeChild(x));
};
