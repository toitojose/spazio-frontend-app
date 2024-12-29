import vue from 'eslint-plugin-vue';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

const maxLineLength = 200;

export default [
  {
    files: ['src/**/*.{ts,vue,js}'],
    ignores: ['tests/e2e/plugins/*'],

    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        parser: '@typescript-eslint/parser',
      },
    },
    plugins: {
      vue,
      'unused-imports': unusedImports,
      prettier,
    },
    rules: {
      'arrow-body-style': 'off',
      'arrow-parens': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'func-names': 'off',
      'linebreak-style': 0,
      'max-len': [
        'error',
        {
          code: maxLineLength,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreUrls: true,
          tabWidth: 2,
        },
      ],
      'no-debugger': 'error',
      'no-underscore-dangle': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      'object-curly-newline': ['error', { consistent: true }],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'vue/attributes-order': 'error',
      'vue/html-closing-bracket-spacing': 'error',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 5,
          multiline: { max: 1 },
        },
      ],
      'vue/multi-word-component-names': 'off',
      'vue/no-mutating-props': 'warn',
      'vue/no-reserved-component-names': 'warn',
      'vue/no-v-html': 'off',
      'vue/order-in-components': 'error',
      'vue/require-default-prop': 'off',
      'vue/require-prop-types': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'always', // Permite omitir paréntesis en argumentos únicos
        },
      ],
    },
  },
  {
    files: ['*.spec.js'], // Reglas específicas para pruebas
    globals: {
      expect: 'readonly',
    },
    languageOptions: {
      parser: tsParser, // Usamos el mismo parser para pruebas
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      env: {
        mocha: true,
        commonjs: true,
        node: true,
      },
    },
    rules: {
      'func-names': 'off',
      'no-console': 'warn',
      'no-unused-expressions': 'off',
    },
  },
];
