export const clearSVG = (svg: SVGElement): void => {
  Array.from(svg.children).forEach((x: Element) => svg.removeChild(x));
};
