module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:i18next/recommended',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['@typescript-eslint', 'react', 'i18next', 'react-hooks'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_$',
        argsIgnorePattern: '^_$',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/display-name': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      rules: {
        'i18next/no-literal-string': 'off',
      },
    },
  ],
};
