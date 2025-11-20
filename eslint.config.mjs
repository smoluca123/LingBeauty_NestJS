// // @ts-check
// import eslint from '@eslint/js';
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// import globals from 'globals';
// import tseslint from 'typescript-eslint';

// export default tseslint.config(
//   {
//     ignores: ['eslint.config.mjs'],
//   },
//   eslint.configs.recommended,
//   ...tseslint.configs.recommendedTypeChecked,
//   eslintPluginPrettierRecommended,
//   {
//     languageOptions: {
//       globals: {
//         ...globals.node,
//         ...globals.jest,
//       },
//       sourceType: 'commonjs',
//       parserOptions: {
//         projectService: true,
//         tsconfigRootDir: import.meta.dirname,
//       },
//     },
//   },
//   {
//     rules: {
//       '@typescript-eslint/no-explicit-any': 'off',
//       '@typescript-eslint/no-floating-promises': 'warn',
//       // Chuyển unsafe rules sang 'warn' thay vì 'off' để vẫn cảnh báo nhưng không chặn
//       // Điều này giúp cân bằng giữa type safety và tính thực tế khi làm việc với nodenext
//       '@typescript-eslint/no-unsafe-argument': 'warn',
//       '@typescript-eslint/no-unsafe-call': 'warn',
//       '@typescript-eslint/no-unsafe-member-access': 'warn',
//       '@typescript-eslint/no-unsafe-assignment': 'warn',
//       '@typescript-eslint/no-unsafe-return': 'warn',
//       'prettier/prettier': ['error', { endOfLine: 'auto' }],
//     },
//   },
// );

import eslintNestJs from '@darraghor/eslint-plugin-nestjs-typed';
// ... and all your other imports
export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [
      'plugin:@darraghor/nestjs-typed/recommended',
      'plugin:@darraghor/nestjs-typed/no-swagger',
    ],
  },
  eslintNestJs.configs.flatRecommended, // This is the recommended ruleset for this plugin
);
