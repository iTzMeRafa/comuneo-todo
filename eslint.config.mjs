import { defineConfig, globalIgnores } from 'eslint/config';
import unusedImports from 'eslint-plugin-unused-imports';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import html from 'eslint-plugin-html';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

const prettierConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

export default defineConfig([
	globalIgnores(['**/*.*', '!**/*.ts', '!**/*.tsx']),
	{
		extends: compat.extends(
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended',
			'next/core-web-vitals',
			'plugin:react/recommended',
			'plugin:prettier/recommended'
		),

		plugins: {
			'unused-imports': unusedImports,
			'@typescript-eslint': typescriptEslint,
			html,
			react: reactPlugin,
			prettier: prettierPlugin,
		},

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			parser: tsParser,
			ecmaVersion: 12,
			sourceType: 'module',
			parserOptions: {
				project: './tsconfig.json',
				ecmaFeatures: { jsx: true },
			},
		},

		settings: { react: { version: 'detect' } },

		rules: {
			'unused-imports/no-unused-imports': 'error',
			'@typescript-eslint/no-unused-vars': 'off',
			'@next/next/no-img-element': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'react-hooks/exhaustive-deps': 'off',
			'no-console': 'warn',
			'max-len': ['warn', { code: 180, ignoreUrls: true }],
			'react/jsx-first-prop-new-line': ['error', 'multiline'],
			'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'react/no-unescaped-entities': 0,

			'prettier/prettier': ['error', prettierConfig],
		},
	},
]);
