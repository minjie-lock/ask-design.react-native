import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
// import postcss from 'rollup-plugin-postcss';
// import serve from '@rollup/plugin-serve';
// import livereload from '@rollup/plugin-livereload';
// import del from '@rollup/plugin-delete';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import { terser } from '@rollup/plugin-alias';
const path = require('path');

export default {

  input: './src/index.ts', //入口文件

  output: {
    file: './dist/bundle.js', //打包后的存放文件
    //dir: './dist', // 多入口打包必需加上的属性
    format: 'cjs', //输出格式 amd es6 iife umd cjs
    name: 'bundleName', //如果iife,umd需要指定一个全局变量
    sourcemap: true, // 是否开启代码回溯
  },

  plugins: [
    nodeResolve(), // 支持从node_modules引入其他的包
    commonjs(), //支持common.js
    // es6语法转义
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx'],
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }),

    // postcss(), //支持加载css，添加前缀等

    typescript({
      exclude: 'node_modules/**',
      include: 'src/**',
    }),

    // 打包前清空目标目录
    // del({ targets: 'dist/*', verbose: true }),

    // 压缩js
    // terser(),

    // livereload('dist'), //watch dist目录，当目录中的文件发生变化时，刷新页面

    // 使用别名
    alias({
      entries: [{ find: '@', replacement: path.join(__dirname, 'src') }],
    }),
  ],
  external: ['react'] //告诉rollup不要将此lodash打包，而作为外部依赖，在使用该库时需要先安装相关依赖

};