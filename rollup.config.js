
const output = [
    {
        file: "./dist/cinnamon.js",
        name: "cinnamon",
        format: "iife",
        sourcemap: true
    },
    {
        file: "./dist/cinnamon-esm.js",
        format: "esm",
        sourcemap: true
    }
]

export default {
    input: "./src/main.js",
    output,
    watch: {
        exclude: "node_modules/**"
    }
}
