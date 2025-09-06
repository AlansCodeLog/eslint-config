import importPlugin from "eslint-plugin-import"
import simpleImportSort from "eslint-plugin-simple-import-sort"
// workaround for https:// github.com/eslint-stylistic/eslint-stylistic/issues/506

/** @type {import('eslint').Linter.Config[]} */
export default [
	/**
	 * Technically could go in js config, but nicer to have these types of rules separated. Mostly are plugin rules, except for some eslint import related rules marked // #eslint.
	 */
	{
		name: "imports/base",
		plugins: {
			"simple-import-sort": simpleImportSort,
			import: importPlugin,
		},
		settings: {
			"import/ignore": ["node_modules"],
		},
		rules: {
			// note this does not have support for require
			"simple-import-sort/imports": ["warn", {
			// see https://github.com/lydell/eslint-plugin-simple-import-sort/#custom-grouping
				groups: [
				// Side effect imports.
					["^\\u0000"],
					// Packages.
					["^@?\\w"],
					// Sibling file.
					["^\\."],
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
			"no-duplicate-imports": "off",
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
		},
	},
]
