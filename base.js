const fs = require("fs")
const path = require("path")


const aliases = []
if (fs.existsSync("./tsconfig.json")) {
	try {
		// eslint-disable-next-line import/no-extraneous-dependencies
		const tsc = require("typescript")
		const tsconfig = tsc.readConfigFile("tsconfig.json", tsc.sys.readFile)
		const compilerOptions = tsconfig.config.compilerOptions
		if (compilerOptions && compilerOptions.paths) {
			for (const alias of Object.keys(compilerOptions.paths)) {
				if (!compilerOptions.paths[alias][0].startsWith("node_modules")) {
					aliases.push(`^${alias.replace(/\/\*.*/, "")}`)
				}
			}
		}
	} catch (e) {
		// eslint-disable-next-line no-console
		console.log(`@alanscodelog/eslint-config detected a typescript config to read path aliases from at "${path.resolve("./tsconfig.json")}" but encountered an error attempting to read it. Linting will continue but tsconfig path aliases will not be added to "simple-import-sort/imports", this might result in invalid lint errors.`)
		// eslint-disable-next-line no-console
		console.log(e)
	}
}


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
	 * Technically could go in js config, but nicer to have these types of rules separated. Mostly are plugin rules, except for some eslint import related rules marked // #eslint.
	 */
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
		"jsdoc/check-tag-names": ["warn", { definedTags: ["packageDocumentation", "env", "internal"]}],
		"jsdoc/multiline-blocks": "warn",
		"jsdoc/newline-after-description": ["warn", "always"],
		"jsdoc/no-bad-blocks": "warn",
		"jsdoc/no-multi-asterisks": "warn",
		"jsdoc/require-asterisk-prefix": ["warn", "always"],
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
		"jsdoc/tag-lines": "off",
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
					...aliases,
				],
				// Relative imports.
				// These are technically banned by "no-restricted-imports" below.
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
		"no-duplicate-imports": ["warn", { includeExports: false }], // ⚠️ // #eslint
		"no-restricted-imports": ["warn", { // #eslint
			patterns: ["../*"],
			paths: [
				{ name: "fs", importNames: ["default"], message: `Please use \`import { promises as fs } from "fs"\` instead, otherwise disable this warning if sync fs functions are needed.` },
			],
		}],

		// #region UNUSED
		"import/no-relative-packages": "off",
		"import/no-import-module-exports": "off",
		"import/exports-last": "off",
		"import/extensions": "off",
		"import/first": "off",
		"import/group-exports": "off",
		"import/max-dependencies": "off",
		"import/no-amd": "off",
		"import/no-commonjs": "off",
		"import/no-cycle": "off", // want but off because it complains when importing types and there's no way to whitelist them
		"import/no-dynamic-require": "off",
		"import/no-internal-modules": "off",
		"import/no-named-export": "off",
		"import/no-nodejs-modules": "off",
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
}
