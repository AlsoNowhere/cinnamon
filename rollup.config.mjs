import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/cinnamon.ts",
  output: [
    {
      file: "./dist/cinnamon.js",
      format: "esm",
    },
  ],
  plugins: [typescript()],
  watch: {
    exclude: "node_modules/**",
  },
};
