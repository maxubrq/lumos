import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  /* ----------------------------------------
   * Base JS rules (ES2022, Node)
   * -------------------------------------- */
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,

      /* No-Surprise hygiene */
      'no-console': 'off', // logging is a design choice
      'no-debugger': 'error',
      'no-implicit-coercion': 'error',
      'no-multi-spaces': 'error',
      'no-shadow': 'off',
      'no-unused-vars': 'off', // handled by TS
      'no-return-await': 'error',
      'require-await': 'error',
    },
  },

  /* ----------------------------------------
   * TypeScript (strict, production-grade)
   * -------------------------------------- */
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.ts'],
  })),

  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      /* NSA Core Rules */
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      /* Make intent explicit */
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],

      /* Kill ambiguity */
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',

      /* Clean boundaries */
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    },
  },

  /* ----------------------------------------
   * Tests (Vitest)
   * -------------------------------------- */
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.vitest,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'require-await': 'off',
    },
  },

  /* ----------------------------------------
   * Ignore build artifacts
   * -------------------------------------- */
  {
    ignores: ['dist/**', 'coverage/**'],
  },
];
