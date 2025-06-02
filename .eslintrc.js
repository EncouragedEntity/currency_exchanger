module.exports = {
  root: true,
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks'],
  plugins: ['@typescript-eslint', 'react', 'react-native', 'optimize-regex', 'import'],
  parser: '@typescript-eslint/parser',
  env: {
    'react-native/react-native': true,
    'jest': false,
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [{
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    rules: {
      'no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/default-param-last': 'off',
    },
  }],
  rules: {
    'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],

    'import/order': [
      'error',
      {
        'groups': [
          ['external', 'builtin'],
          'internal',
          ['sibling', 'parent'],
          'index',
        ],
        'pathGroups': [
          {
            pattern: '{react,react-native}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'app/environments',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'app/modules/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'app/components/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'app/screens/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'app/containers',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'app/containers/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'app/navigation',
            group: 'internal',
          },
          {
            pattern: 'app/theme',
            group: 'internal',
          },
          {
            pattern: 'app/localization',
            group: 'internal',
          },
          {
            pattern: 'app/storage/**',
            group: 'internal',
          },
          {
            pattern: 'app/storage',
            group: 'internal',
          },
          {
            pattern: 'app/services/**',
            group: 'internal',
          },
          {
            pattern: 'app/hooks',
            group: 'internal',
          },
          {
            pattern: 'app/hooks/**',
            group: 'internal',
          },
          {
            pattern: 'app/utilities/**',
            group: 'internal',
          },
          {
            pattern: 'app/constants',
            group: 'internal',
          },
        ],
        'pathGroupsExcludedImportTypes': ['internal', 'react'],
        'newlines-between': 'never',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-unresolved': 'off',
    'import/no-duplicates': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-filename-extension': ['warn', {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }],
    'no-tabs': 'error',
    'semi': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'jsx-quotes': ['error', 'prefer-single'],
    'eol-last': ['error', 'never'],

    'no-console': 'warn',
    'spaced-comment': 'warn',
    'no-unused-vars': 'warn',
    'no-else-return': 'warn',
    'prefer-rest-params': 'warn',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: '*' },
      { blankLine: 'never', prev: 'import', next: 'import' },
    ],
    'max-len': ['warn', { code: 120, ignoreStrings: true }],
    'no-param-reassign': ['error', { props: false }],
    'no-use-before-define': ['error', { variables: false }],
    'quote-props': ['warn', 'consistent'],

    'curly': 'off',

    'no-shadow': 'off',
    'prefer-spread': 'off',
    'object-shorthand': 'off',
    'arrow-body-style': 'off',
    'no-underscore-dangle': 'off',
    'no-return-assign': 'off',
    'no-confusing-arrow': 'off',
    'consistent-return': 'off',
    'global-require': 'off',

    'optimize-regex/optimize-regex': 'warn',

    'func-names': ['error', 'as-needed', {
      generators: 'never',
    }],

    'object-curly-newline': ['error', {
      ObjectPattern: { multiline: true },
    }],

    'react/jsx-no-bind': 'off',
    'react/jsx-boolean-value': 'off',

    'react/jsx-fragments': ['error', 'element'],

    'react/sort-comp': ['error', {
      order: ['static-methods', 'static-variables', 'lifecycle', 'everything-else', 'render'],
    }],

    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/no-is-mounted': 'warn',
    'react/no-did-mount-set-state': 'warn',
    'react/no-did-update-set-state': 'warn',
    'react/no-will-update-set-state': 'warn',
    'react/state-in-constructor': ['warn', 'always'],
    'react/no-unused-state': 'warn',

    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 0,
    'react-native/split-platform-components': 0,
    'react-native/no-unused-styles': 2,
    'react-native/no-single-element-style-arrays': 2,
    'react-native/no-raw-text': 2,
  },
};
