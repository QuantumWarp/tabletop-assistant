import js from "@eslint/js";
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime']
];