// @ts-check

const rules = {
  'strict': 0,

  'space-before-function-paren': 0,
  'no-extra-parens': 0,

  'indent': [1, 2],
  'curly': 0,
  'multiline-comment-style': 0,
  'no-restricted-syntax': 0,

  'max-classes-per-file': 0,
  'class-methods-use-this': 0,
  'new-cap': 0,
  'newline-per-chained-call': 0,
  'prefer-destructuring': ['error', {
    'VariableDeclarator': {
      'array': false,
      'object': true,
    },
  }],

  'linebreak-style': [1, 'unix'],
};

const jsRules = { ...rules };
const tsRules = {
  ...rules,
  '@typescript-eslint/no-non-null-assertion': 0,
};

/** @type {import('@typescript-eslint/utils').TSESLint.Linter.Config} */
module.exports = {
  env: {
    node: true,
    jest: true,
    es2022: true,
    browser: true,
  },
  settings: {
    react: {
      version: 'detect',
    }
  },
  ignorePatterns: ['node_modules/', 'build/'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      plugins: ['@typescript-eslint/eslint-plugin', 'react'],
      extends: [
        '@forvais/eslint-config-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended'
      ],
      rules: tsRules,
    },
    {
      files: ['*.js'],
      extends: [
        '@forvais/eslint-config-base',
      ],
      rules: jsRules,
    },
  ],
};
