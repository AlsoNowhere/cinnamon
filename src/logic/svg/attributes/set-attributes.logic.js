export const setAttributes = (target, attributes) => {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value instanceof Object) {
      value = Object.entries(value)
        .map(([key, value]) => `${key}: ${value};`)
        .join(" ");
    }
    value !== undefined && target.setAttribute(key, value);
  });
};
