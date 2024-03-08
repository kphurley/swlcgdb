#!/usr/bin/env node

const esbuild = require('esbuild');
const svgrPlugin = require('esbuild-plugin-svgr');

esbuild.build({
  entryPoints: ['app/javascript/application.js'],
  bundle: true,
  outdir: 'app/assets/builds',
  sourcemap: true,
  publicPath: 'assets',
  minify: true,
  plugins: [
      svgrPlugin(),
  ],
}).then(result => {
  console.log('Production build completed - ', result);
});