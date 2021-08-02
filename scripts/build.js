const { build } = require('esbuild');

build({
  entryPoints: ['./src/chromo-mimic.js'],
  outdir: 'dist',
  bundle: true,
  minify: true,
  platform: 'browser',
});
