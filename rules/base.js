import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin"
import importPlugin from "eslint-plugin-import"
import jsdocPlugin from "eslint-plugin-jsdoc"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import globals from "globals"
import  jsdocRules  from "./jsdoc.js"
import  importsRules  from "./imports.js"
export const allFileTypes = [
	"js",
	"ts",
	"cts",
	"mts",
	"vue",
	"cjs",
	"mjs",
	"tsx",
	"jsx",
]
// workaround for https:// github.com/eslint-stylistic/eslint-stylistic/issues/506
/** @type any */
const stylisticAsAny = stylistic
/** @type {import('eslint').ESLint.Plugin}*/
const stylisticAsPlugin = stylisticAsAny
 
export default defineConfig(
	/**
	 * Technically could go in js config, but nicer to have these types of rules separated. Mostly are plugin rules, except for some eslint import related rules marked // #eslint.
	 */
	{
		linterOptions: {
			reportUnusedDisableDirectives: "warn",
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2021,
				...globals.worker,
			},
		},
		plugins: {
			"@stylistic": stylisticAsPlugin,
			"simple-import-sort": simpleImportSort,
			import: importPlugin,
			jsdoc: jsdocPlugin,
		},
		settings: {
			"import/ignore": ["node_modules"],
			jsdoc: {
				mode: "typescript", // not working, has to be set in package?
				maxLines: 0,
			},
		},
		ignores: [
			// for editors, so they try to lint files in here when we open them
			"**/coverage/",
			"**/dist/",
			"**/docs/",
		],
	},
	jsdocRules,
	importsRules,
)
