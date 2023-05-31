import webpack from 'webpack';

export const buildLoaders = (): webpack.RuleSetRule[] => {
  const typeScriptLoader: webpack.RuleSetRule = {
    test: /\.(ts|tsx)$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const cssLoader: webpack.RuleSetRule = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      'style-loader',
      // Translates CSS into CommonJS
      'css-loader',
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };

  return [typeScriptLoader, cssLoader];
};
