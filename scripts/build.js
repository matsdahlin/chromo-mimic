const { build } = require('esbuild');

build({
  entryPoints: ['./src/chromo-mimic.js'],
  outdir: 'dist',
  bundle: true,
  minify: true,
  platform: 'browser',
});

build({
  entryPoints: ['./src/chromo-mimic.ts'],
  outfile: 'dist/chromo-mimic.esm.js',
  bundle: true,
  minify: true,
  format: 'esm',
});
