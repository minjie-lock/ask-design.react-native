import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: [
        './src/**/*',
        '!./src/**/*.test.{ts,tsx}',
      ],
    },
  },
  tools: {
    rspack: {
      resolve: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
  resolve: {
    alias: {
      '@': './src',
    },
    extensions: ['.ts', '.tsx'],
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
      autoExternal: true,
      output: {
        externals: [
          'react',
          'react-dom',
          'react-native',
        ],
      },
    },
    {
      bundle: false,
      dts: true,
      autoExternal: true,
      format: 'cjs',
      output: {
        externals: [
          'react',
          'react-dom',
          'react-native',
        ],
      },
    },
  ],
  output: {
    target: 'node',
  },

  plugins: [pluginReact()],
});
