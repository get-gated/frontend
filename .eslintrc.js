module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'next',
    'plugin:react/recommended',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    //project: './tsconfig.json',
    tsconfigRootDir: './',
  },

  plugins: ['react', '@typescript-eslint', 'import'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    //reconsider these as we improve app
    'react/display-name': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  ignorePatterns: ['**/*/graphql/generated.ts'],
};
