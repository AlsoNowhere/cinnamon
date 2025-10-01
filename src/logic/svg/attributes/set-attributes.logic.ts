export const setAttributes = (target: SVGElement, attributes: Record<string, string | Object | undefined>): void => {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value instanceof Object) {
      const newValue = Object.entries(value)
        .map(([key, value]) => `${key}: ${value};`)
        .join(" ");
      target.setAttribute(key, newValue);
      return;
    }
    value !== undefined && target.setAttribute(key, value);
  });
};
