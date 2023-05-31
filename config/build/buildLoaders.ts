import webpack from 'webpack';

export const buildLoaders = (): webpack.RuleSetRule[] => {
  const typeScriptLoader: webpack.RuleSetRule = {
    test: /\.(ts|tsx)$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };
  return [typeScriptLoader];
};
