import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/cinnamon.ts",
  output: [
    {
      file: "./dist/cinnamon.js",
      format: "esm",
    },
    // {
    //   file: "./dist/cinnamon-test.js",
    //   format: "cjs",
    // },
    // {
    //   file: "./dist/cinnamon-experiment.js",
    //   format: "iife",
    //   name: "cinnamon",
    // },
  ],
  plugins: [typescript()],
  watch: {
    exclude: "node_modules/**",
  },
};
