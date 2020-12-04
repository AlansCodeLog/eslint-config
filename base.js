module.exports = {
	env: {
		node: true,
		browser: true,
		es6: true,
	},
	plugins: [
		"import",
		"simple-import-sort",
	],
	settings: {
		"import/ignore": ["node_modules"],
	},
	/**
	 * Technically could go in js config, but nicer to have these types of rules separated.
	 */
	rules: {
		// #region IMPORTS
		// note this does not have support for require
		"simple-import-sort/imports": ["warn", {
			groups: [
				// Side effect imports.
				["^\\u0000"],
				// Packages.
				// Things that start with a letter (or digit or underscore), or `@` followed by a letter.
				["^@?\\w"],
				// Relative imports.
				// Anything that starts with a dot.
				["^\\./"],
				// Absolute imports and other imports such as Vue-style `@/foo`.
				// Anything that does not start with a dot.
				["^[^.]"],
				// Relative imports.
				// Anything that starts with a dot.
				["^\\../"],
			],
		}],
		"import/default": "warn",
		"import/dynamic-import-chunkname": "warn",
		"import/export": "warn",
		"import/named": "warn",
		"import/namespace": "warn",
		"import/newline-after-import": ["warn", { count: 2 }],
		"import/no-absolute-path": "warn",
		"import/no-anonymous-default-export": ["warn", { allowArray: false, allowArrowFunction: true, allowAnonymousClass: true, allowAnonymousFunction: true, allowCallExpression: true, allowLiteral: false, allowObject: true }],
		"import/no-default-export": "warn",
		"import/no-deprecated": "warn",
		"import/no-duplicates": "warn",
		"import/no-extraneous-dependencies": ["warn", {
			devDependencies: ["src/**/*"],
			optionalDependencies: ["src/**/*"],
			peerDependencies: ["src/**/*"],
		}],
		"import/no-mutable-exports": "warn",
		"import/no-named-as-default-member": "warn",
		"import/no-named-as-default": "warn",
		"import/no-named-default": "warn",
		"import/no-namespace": "warn",
		"import/no-useless-path-segments": ["warn", { noUselessIndex: true }],
		"import/no-webpack-loader-syntax": "warn",
		"no-duplicate-imports": ["warn", { includeExports: false }], // ⚠️
		"no-restricted-imports": ["warn", {
			patterns: ["../*"],
			paths: [
				{ name: "fs", importNames: ["default"], message: `Please use \`import { promises as fs } from "fs"\` instead, otherwise disable this warning if sync fs functions are needed.` },
			],
		}],
		// #regionend
	},
}
