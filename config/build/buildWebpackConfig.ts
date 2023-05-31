import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolver } from './buildResolvers';

export const buildWebpackConfig = (options: BuildOptions): webpack.Configuration => {
  const { mode, paths } = options;
  return {
    mode: mode,
    entry: paths.entry,
    output: {
      path: paths.build,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: buildPlugins(paths),
    module: {
      rules: buildLoaders(),
    },
    resolve: buildResolver(),
  };
};
