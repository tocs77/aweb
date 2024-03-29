import webpack, { RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoaders';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    buildLocales: '',
    locales: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
  };
  config?.resolve?.modules?.push(paths.src);
  config?.resolve?.extensions?.push('.ts', '.tsx');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  config!.resolve!.alias = { ...config?.resolve?.alias, '@': paths.src };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  config.module.rules = config?.module?.rules.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }

    return rule;
  });

  config?.module?.rules?.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });
  config?.module?.rules?.push(buildCssLoader(true));
  config?.plugins?.push(
    new webpack.DefinePlugin({
      __IS_DEV__: true,
      __API__: JSON.stringify('http://testapi.org/'),
      __PROJECT__: JSON.stringify('storybook'),
    }),
  );

  return config;
};
