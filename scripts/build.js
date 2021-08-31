const { build } = require('esbuild');

build({
  entryPoints: ['./builds/cdn.ts'],
  outdir: 'dist/chromo-mimic.js',
  bundle: true,
  minify: true,
  platform: 'browser',
});

build({
  entryPoints: ['./builds/module.ts'],
  outfile: 'dist/chromo-mimic.esm.js',
  bundle: true,
  minify: true,
  format: 'esm',
});
