module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'import/no-unresolved': 'off',
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-nested-ternary': 'off',
  },
  ignorePatterns: [
    'reportWebVitals.ts',
    'react-app-env.d.ts',
    '**/reference/**',
  ],
};
