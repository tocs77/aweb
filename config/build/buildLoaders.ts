import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoaders';

export const buildLoaders = (options: BuildOptions): webpack.RuleSetRule[] => {
  const typeScriptLoader: webpack.RuleSetRule = {
    test: /\.(ts|tsx)$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const cssLoader: webpack.RuleSetRule = buildCssLoader(options.isDev);

  const svgLoader: webpack.RuleSetRule = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };

  const assetsLoader: webpack.RuleSetRule = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    type: 'asset/resource',
  };

  return [typeScriptLoader, cssLoader, svgLoader, assetsLoader];
};
