import stylistic from "@stylistic/eslint-plugin"
import importPlugin from "eslint-plugin-import"
import jsdocPlugin from "eslint-plugin-jsdoc"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import globals from "globals"
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

// /** @type {import('eslint').Linter.FlatConfig[]} */
 
export default [
	/**
	 * Technically could go in js config, but nicer to have these types of rules separated. Mostly are plugin rules, except for some eslint import related rules marked // #eslint.
	 */
	{
		files: [`**/*.{${allFileTypes.join(",")}}`],
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
		rules: {
		// #region JSDOC
		/**
		 * I barely use js anymore, so this is mostly to fix some of the most common jsdoc formatting problems.
		 * There's a few extra ts specific rules in the typescript config, including actually requiring a jsdoc comment, which would otherwise be annoying to have to do with most of the few js files in my projects (usually small scripts or files that exist for odd reasons).
		 *
		 * #awaiting tsdoc to be the standard so we can use the tsdoc eslint plugin
		 */

			"jsdoc/check-alignment": "warn",
			// exceptions are for typedoc plugin
			"jsdoc/check-tag-names": ["warn", { definedTags: ["packageDocumentation", "env"]}],
			"jsdoc/multiline-blocks": "warn",
			"jsdoc/tag-lines": ["error", "any", { startLines: 1 }],
			"jsdoc/no-bad-blocks": "warn",
			"jsdoc/no-multi-asterisks": "warn",
			"jsdoc/require-asterisk-prefix": ["warn", "always"],
			"jsdoc/require-hyphen-before-param-description": ["warn", "never"],
			"jsdoc/no-blank-blocks": "warn",
			// #region disabled
			"jsdoc/imports-as-dependencies": "off", // can't find what this is
			"jsdoc/informative-docs": "off",
			"jsdoc/no-blank-block-descriptions": "off",
			"jsdoc/check-access": "off",
			"jsdoc/check-examples": "off",
			"jsdoc/check-indentation": "off",
			"jsdoc/check-line-alignment": "off",
			"jsdoc/check-param-names": "off",
			"jsdoc/check-property-names": "off",
			"jsdoc/check-syntax": "off",
			"jsdoc/check-types": "off",
			"jsdoc/check-values": "off",
			"jsdoc/empty-tags": "off", // dangerous auto-fix
			"jsdoc/implements-on-classes": "off",
			"jsdoc/match-description": "off",
			"jsdoc/match-name": "off",
			"jsdoc/no-defaults": "off",
			"jsdoc/no-missing-syntax": "off",
			"jsdoc/no-restricted-syntax": "off",
			"jsdoc/no-types": "off",
			"jsdoc/no-undefined-types": "off",
			"jsdoc/require-description-complete-sentence": "off",
			"jsdoc/require-description": "off",
			"jsdoc/require-example": "off",
			"jsdoc/require-file-overview": "off",
			"jsdoc/require-jsdoc": "off",
			"jsdoc/require-param-description": "off",
			"jsdoc/require-param-name": "off",
			"jsdoc/require-param-type": "off",
			"jsdoc/require-param": "off",
			"jsdoc/require-property-description": "off",
			"jsdoc/require-property-name": "off",
			"jsdoc/require-property-type": "off",
			"jsdoc/require-property": "off",
			"jsdoc/require-returns-check": "off",
			"jsdoc/require-returns-description": "off",
			"jsdoc/require-returns-type": "off",
			"jsdoc/require-returns": "off",
			"jsdoc/require-throws": "off",
			"jsdoc/require-yields-check": "off",
			"jsdoc/require-yields": "off",
			"jsdoc/sort-tags": "off",
			"jsdoc/text-escaping": "off", // weird issues with comments at start of files
			"jsdoc/valid-types": "off",
			// #regionend
			// #regionend

			// #region IMPORTS
			// note this does not have support for require
			"simple-import-sort/imports": ["warn", {
			// see https://github.com/lydell/eslint-plugin-simple-import-sort/#custom-grouping
				groups: [
				// Side effect imports.
					["^\\u0000"],
					// Packages.
					["^@?\\w"],
					// Sibling file.
					["^\\./"],
					[
					// Absolute imports and other imports such as Vue-style `@/foo`.
					// Anything that does not start with a dot.
						"^[^.]",
					// moves non-node_modules aliases to be with the rest of the aliases
					// ...aliases,
					],
					// Relative imports.
					["^\\../"],
				],
			}],
			// "import/default": "warn",
			// "import/export": "warn",
			// "import/namespace": "warn",
			// "import/newline-after-import": ["warn", { count: 2 }],
			"import/no-absolute-path": "warn",
			// "import/no-anonymous-default-export": ["warn", { allowArray: false, allowArrowFunction: true, allowAnonymousClass: true, allowAnonymousFunction: true, allowCallExpression: true, allowLiteral: false, allowObject: true }],
			// "import/no-deprecated": "warn",
			"import/no-duplicates": ["warn", { considerQueryString: true }],
			"import/no-extraneous-dependencies": ["warn", {
			// confusing but if true or matches DOESN' enforce the rule
				devDependencies: ["!src/**/*"],
				optionalDependencies: true,
				peerDependencies: true,
			}],
			// "import/no-mutable-exports": "warn",
			// "import/no-named-as-default-member": "warn",
			// "import/no-named-as-default": "warn",
			"import/no-named-default": "warn",
			"import/no-useless-path-segments": ["warn", {
				noUselessIndex: false,
			}],
			"import/no-webpack-loader-syntax": "warn",
			"no-duplicate-imports": ["warn", { includeExports: false }], // ⚠️ // #eslint
			"no-restricted-imports": ["warn", {
				patterns: [
					{
						group: ["*/index.js", "!types/index.js"],
						message: "Avoid importing from index files to avoid circular dependencies.",
					},
				],
			}],

			// #region UNUSED
			"import/no-namespace": "off", // never do it unless necessary
			"import/consistent-type-specifier-style": "off", // done by typescript
			"import/dynamic-import-chunkname": "off",
			"import/exports-last": "off",
			"import/extensions": "off",
			"import/first": "off",
			"import/group-exports": "off",
			"import/max-dependencies": "off",
			"import/named": "off", // was being weird with star exports
			"import/no-amd": "off",
			"import/no-commonjs": "off",
			"import/no-cycle": "off", // want but off because it complains when importing types and there's no way to whitelist them
			"import/no-default-export": "off",
			"import/no-dynamic-require": "off",
			"import/no-empty-named-blocks": "warn",
			"import/no-import-module-exports": "off",
			"import/no-internal-modules": "off",
			"import/no-named-export": "off",
			"import/no-nodejs-modules": "off",
			"import/no-relative-packages": "off",
			"import/no-relative-parent-imports": "off",
			"import/no-restricted-paths": "off",
			"import/no-self-import": "off",
			"import/no-unassigned-import": "off",
			"import/no-unresolved": "off", // gets annoying with custom resolve paths
			"import/no-unused-modules": "off", // turned on manually when i want
			"import/order": "off", // doesn't work properly (cant tell external from internal)
			"import/prefer-default-export": "off",
			"import/unambiguous": "off",
			"simple-import-sort/exports": "off",
		// #regionend
		// #regionend
		},
	},
]
