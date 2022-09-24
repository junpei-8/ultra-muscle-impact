const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  plugins: ['import', 'solid'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:solid/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-console': PROD ? 'warn' : 'off',
    'no-debugger': PROD ? 'warn' : 'off',

    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',

    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: '{@,src}/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc' },
        'newlines-between': 'never',
      },
    ],
    'import/no-unresolved': 'off',
    'import/named': 'off',
  },
};
