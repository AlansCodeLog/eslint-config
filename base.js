module.exports = {
	env: {
		node: true,
		browser: true,
		es6: true,
	},
	plugins: [
		"import",
		"simple-import-sort",
		"jsdoc",
	],
	settings: {
		"import/ignore": ["node_modules"],
		jsdoc: {
			mode: "jsdoc",
			maxLines: 0,
		},
	},
	/**
	 * Technically could go in js config, but nicer to have these types of rules separated.
	 */
	rules: {
		// #region JSDOC
		/**
		 * I barely use js anymore, so this is mostly to fix some of the most common jsdoc formatting problems.
		 * There's a few extra ts specific rules in the typescript config, including actually requiring a jsdoc comment, which would otherwise be annoying to have to do with most of the few js files in my projects (usually small scripts or files that exist for odd reasons).
		 */

		"jsdoc/check-alignment": "warn",
		// exceptions are for typedoc plugin
		"jsdoc/check-tag-names": ["warn", { definedTags: ["packageDocumentation", "module"]}],
		"jsdoc/empty-tags": "warn",
		"jsdoc/newline-after-description": ["warn", "always"],
		"jsdoc/no-bad-blocks": "warn",
		"jsdoc/require-hyphen-before-param-description": ["warn", "never"],
		// #region disabled
		"jsdoc/check-access": "off",
		"jsdoc/check-examples": "off",
		"jsdoc/check-indentation": "off",
		"jsdoc/check-line-alignment": "off",
		"jsdoc/check-param-names": "off",
		"jsdoc/check-property-names": "off",
		"jsdoc/check-syntax": "off",
		"jsdoc/check-types": "off",
		"jsdoc/check-values": "off",
		"jsdoc/implements-on-classes": "off",
		"jsdoc/match-description": "off",
		"jsdoc/no-defaults": "off",
		"jsdoc/no-types": "off",
		"jsdoc/no-undefined-types": "off",
		"jsdoc/require-description": "off",
		"jsdoc/require-description-complete-sentence": "off",
		"jsdoc/require-example": "off",
		"jsdoc/require-file-overview": "off",
		"jsdoc/require-jsdoc": "off",
		"jsdoc/require-param": "off",
		"jsdoc/require-param-description": "off",
		"jsdoc/require-param-name": "off",
		"jsdoc/require-param-type": "off",
		"jsdoc/require-property": "off",
		"jsdoc/require-property-description": "off",
		"jsdoc/require-property-name": "off",
		"jsdoc/require-property-type": "off",
		"jsdoc/require-returns": "off",
		"jsdoc/require-returns-check": "off",
		"jsdoc/require-returns-description": "off",
		"jsdoc/require-returns-type": "off",
		"jsdoc/require-throws": "off",
		"jsdoc/valid-types": "off",
		// #regionend
		// #regionend

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
