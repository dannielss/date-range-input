import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";

export default {
    input: "index.ts",
    output: [
        { file: "dist/index.js", format: "cjs", sourcemap: true },
        { file: "dist/index.esm.js", format: "esm", sourcemap: true }
    ],
    plugins: [
        resolve(),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),
        babel({ babelHelpers: "bundled" })
    ],
    external: ["react", "react-dom"]
};
