
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: 'source/js/core/main.js',
    output: [
        {
            file: 'built/bundle.es.min.js',
            format: 'esm',
          },
    ],
    plugins: [terser()],
  },
]

