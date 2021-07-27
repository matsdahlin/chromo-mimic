const { build } = require('esbuild');

build({
  entryPoints: ['./src/chroma-mimic.js'],
  outdir: 'dist',
  bundle: true,
  // minify: true,
  platform: 'browser',
});
