import jsdoc from "eslint-plugin-jsdoc"

/** @type {import('eslint').Linter.Config[]} */
export default [
	/**
	 * Technically could go in js config, but nicer to have these types of rules separated. Mostly are plugin rules, except for some eslint import related rules marked // #eslint.
	 */
	{
		name: "jsdoc/base",
		plugins: {
			jsdoc: jsdoc ?? "WTF",
		},
		settings: {
			jsdoc: {
				mode: "typescript", // not working, has to be set in package?
				maxLines: 0,
			},
		},
		rules: {
		/**
		 * I barely use js anymore, so this is mostly to fix some of the most common jsdoc formatting problems.
		 * There's a few extra ts specific rules in the typescript config, including actually requiring a jsdoc comment, which would otherwise be annoying to have to do with most of the few js files in my projects (usually small scripts or files that exist for odd reasons).
		 *
		 * #awaiting tsdoc to be the standard so we can use the tsdoc eslint plugin
		 */

			// exceptions are for typedoc plugin
			"jsdoc/check-tag-names": ["warn", { definedTags: ["packageDocumentation", "env"]}],
			"jsdoc/tag-lines": ["error", "any", { startLines: 1 }],
			"jsdoc/no-bad-blocks": "warn",
			"jsdoc/require-asterisk-prefix": ["warn", "always"],
			"jsdoc/require-hyphen-before-param-description": ["warn", "never"],
			"jsdoc/no-blank-blocks": "warn",

			// #region disabled
			"jsdoc/check-access": "off",
			"jsdoc/check-param-names": "off",
			"jsdoc/check-property-names": "off",
			"jsdoc/check-types": "off",
			"jsdoc/check-values": "off",
			"jsdoc/empty-tags": "off", // dangerous auto-fix
			"jsdoc/implements-on-classes": "off",
			"jsdoc/no-defaults": "off",
			"jsdoc/no-types": "off",
			"jsdoc/no-undefined-types": "off",
			"jsdoc/require-description": "off",
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
			"jsdoc/valid-types": "off",
			// #regionend
		},
	},
]
