import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const inputDir = 'src/';
const inputFile = 'main.js';
const outputDir = 'build';
const outputFile = 'main.js';

console.log(
  '\x1b[1m%s\x1b[0m',
  `Rollup bundling in ${process.env.BUILD} mode.`,
);

const developmentPlugins = [
  nodeResolve({
    mainFields: ['module'],
  }),
  commonjs({
    include: 'node_modules/**',
  }),
];

const productionPlugins = [
  ...developmentPlugins,
  babel({
    compact: false,
    exclude: ['node_modules/**'],
    babelrc: true,
  }),
  terser(),
];

function createConfig() {
  const productionMode = process.env.BUILD === 'production';

  const plugins = productionMode
    ? productionPlugins
    : developmentPlugins;

  return {
    watch: {
      include: `${inputDir}/**`,
    },
    input: `${inputDir}/${inputFile}`,
    plugins,
    output: [
      {
        file: `${outputDir}/${outputFile}`,
        format: 'esm',
        sourcemap: true,
        name: 'World',
      },
    ],
  };
}

export default createConfig();
