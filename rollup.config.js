import resolve from "@rollup/plugin-node-resolve";

const output = {
  file: "./dist/cinnamon.js",
  format: "esm",
  // sourcemap: true,
};

export default {
  input: "./src/main.js",
  output,
  plugins: [resolve()],
  watch: {
    exclude: "node_modules/**",
  },
};
