import stylistic from "@stylistic/eslint-plugin"
import globals from "globals"

import importsRules from "./imports.js"
import jsdocRules from "./jsdoc.js"

// workaround for https:// github.com/eslint-stylistic/eslint-stylistic/issues/506
/** @type {import('eslint').Linter.Config[]} */
export default [
	/**
	 * Technically could go in js config, but nicer to have these types of rules separated. Mostly are plugin rules, except for some eslint import related rules marked // #eslint.
	 */
	{
		name: "base",
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
			"@stylistic": stylistic,
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
	...jsdocRules,
	...importsRules,
]
