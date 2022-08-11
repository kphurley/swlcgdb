#!/usr/bin/env node

const esbuild = require('esbuild');
const svgrPlugin = require('esbuild-plugin-svgr');

esbuild.build({
  entryPoints: ['app/javascript/application.js'],
  bundle: true,
  outdir: 'app/assets/builds',
  sourcemap: true,
  publicPath: 'assets',
  watch: {
    onRebuild(error, result) {
      if (error) console.error('watch build failed:', error)
      else console.log('watch build succeeded:', result)
    },
  },
  plugins: [
      svgrPlugin(),
  ],
}).then(result => {
  console.log('watching...')
});