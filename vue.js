/**
 * Just extending ts will only make the rules apply to ts files. We want them to also apply to vue files. This config will take care of disabling any rules that interfere.
 */
const tsRules = require("./typescript").overrides[1].rules


module.exports = {
	extends: [
		"./typescript",
	],
	overrides: [
		{
			files: ["**/*.vue"],
			extends: [
				"plugin:vue/vue3-essential",
				"@vue/typescript",
			],
			parser: "vue-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
				ecmaVersion: 2020,
				sourceType: "module",
			},
			plugins: [
				"vue",
			],
			rules: {
				...tsRules,
				// #region INTERFERE
				"@typescript-eslint/typedef": "off",
				"import/no-default-export": ["off"],
				// #regionend

				// #region NAMING
				"vue/attribute-hyphenation": ["warn", "always"],
				"vue/component-definition-name-casing": ["warn", "kebab-case"],
				"vue/custom-event-name-casing": "warn",
				"vue/prop-name-casing": ["warn", "camelCase"],
				"vue/v-bind-style": ["warn", "shorthand"],
				"vue/v-on-event-hyphenation": ["warn", "always", { autofix: true }],
				"vue/v-on-style": ["warn", "shorthand"],
				"vue/v-slot-style": ["warn", {
					atComponent: "v-slot",
					default: "shorthand",
					named: "shorthand",
				}],
				// #regionend

				// #region SPACING
				"vue/html-closing-bracket-newline": ["warn", {
					singleline: "never",
					multiline: "always",
				}],
				"vue/html-closing-bracket-spacing": ["warn", {
					startTag: "never",
					endTag: "never",
					selfClosingTag: "never",
				}],
				"vue/html-indent": ["warn", "tab", {
					attribute: 1,
					baseIndent: 1,
					closeBracket: 0,
					alignAttributesVertically: false,
					ignores: [],
				}],
				"vue/max-attributes-per-line": ["warn", {
					singleline: 3,
					multiline: {
						max: 1,
						allowFirstLine: false,
					},
				}],
				"vue/multiline-html-element-content-newline": ["warn", {
					ignoreWhenEmpty: true,
					ignores: ["pre", "textarea"],
					allowEmptyLines: false,
				}],
				"vue/mustache-interpolation-spacing": ["warn", "always"],
				"vue/no-multi-spaces": ["warn"],
				"vue/singleline-html-element-content-newline": ["off"],
				// #regionend

				// #region OTHER STYLING
				"vue/html-quotes": ["warn", "double", { avoidEscape: true }],
				"vue/html-self-closing": ["warn", {
					html: {
						void: "never",
						normal: "always",
						component: "always",
					},
					svg: "always",
					math: "always",
				}],
				"vue/html-end-tags": ["warn"],
				"vue/next-tick-style": ["warn", "promise"],
				"vue/no-spaces-around-equal-signs-in-attribute": ["warn"],
				"vue/one-component-per-file": ["warn"],
				// #regionend

				// #region ORDER
				"vue/attributes-order": ["warn", {
					order: [
						"CONDITIONALS",
						"GLOBAL",
						"OTHER_ATTR",
						"DEFINITION",
						"LIST_RENDERING",
						"UNIQUE",
						"RENDER_MODIFIERS",
						"TWO_WAY_BINDING",
						"OTHER_DIRECTIVES",
						"EVENTS",
						"CONTENT",
					],
					alphabetical: false,
				}],
				"vue/component-tags-order": ["warn", {
					order: [["docs", "template", "script"], "style"],
				}],
				"vue/order-in-components": ["warn", {
					order: [
						"el",
						"name",
						"key",
						"parent",
						"functional",
						["delimiters", "comments"],
						["components", "directives", "filters"],
						"extends",
						"mixins",
						["provide", "inject"],
						"ROUTER_GUARDS",
						"layout",
						"middleware",
						"validate",
						"scrollToTop",
						"transition",
						"loading",
						"inheritAttrs",
						"model",
						["props", "propsData"],
						"emits",
						"setup",
						"fetch",
						"asyncData",
						"data",
						"head",
						"computed",
						"watch",
						"watchQuery",
						"methods",
						"LIFECYCLE_HOOKS", // hooks below methods
						["template", "render"],
						"renderError",
					],
				}],
				// #regionend

				// #region ERROR PRONE
				"vue/html-button-has-type": ["warn", {
					button: true,
					submit: true,
					reset: true,
				}],
				"vue/no-restricted-custom-event": ["warn", {
					event: "input",
					message: "If you intend a prop for v-model, it should be 'update:modelValue' in Vue 3.",
					suggest: "update:modelValue",
				}],
				"vue/no-restricted-props": ["warn", {
					name: "value",
					message: "If you intend a prop for v-model, it should be 'modelValue' in Vue 3.",
					suggest: "modelValue",
				}],
				"vue/no-constant-condition": "warn",
				"vue/no-deprecated-v-is": "warn",
				"vue/no-invalid-model-keys": "warn",
				"vue/no-lone-template": ["warn", { ignoreAccessible: false }],
				"vue/no-multiple-slot-args": "warn",
				"vue/no-template-shadow": "warn",
				"vue/no-this-in-before-route-enter": "warn",
				"vue/require-default-prop": "warn",
				"vue/require-emit-validator": "warn",
				"vue/require-explicit-emits": "warn",
				"vue/require-prop-types": "warn",
				"vue/this-in-template": ["warn", "never"],
				"vue/valid-next-tick": "warn",
				// #regionend


				// #region TODO
				"vue/array-bracket-newline": "off",
				"vue/array-bracket-spacing": "off",
				"vue/arrow-spacing": "off",
				"vue/block-spacing": "off",
				"vue/block-tag-newline": "off",
				"vue/brace-style": "off",
				"vue/camelcase": "off",
				"vue/comma-dangle": "off",
				"vue/comma-spacing": "off",
				"vue/comma-style": "off",
				"vue/component-name-in-template-casing": "off",
				"vue/dot-location": "off",
				"vue/dot-notation": "off",
				"vue/eqeqeq": "off",
				"vue/func-call-spacing": "off",
				"vue/html-comment-content-newline": "off",
				"vue/html-comment-content-spacing": "off",
				"vue/html-comment-indent": "off",
				"vue/key-spacing": "off",
				"vue/keyword-spacing": "off",
				"vue/match-component-file-name": "off",
				"vue/max-len": "off",
				"vue/new-line-between-multi-line-property": "off",
				"vue/no-bare-strings-in-template": "off",
				"vue/no-boolean-default": "off",
				"vue/no-custom-modifiers-on-v-model": "off",
				"vue/no-duplicate-attr-inheritance": "off",
				"vue/no-empty-component-block": "off",
				"vue/no-empty-pattern": "off",
				"vue/no-extra-parens": "off",
				"vue/no-irregular-whitespace": "off",
				"vue/no-multiple-objects-in-class": "off",
				"vue/no-multiple-template-root": "off",
				"vue/no-potential-component-option-typo": "off",
				"vue/no-reserved-component-names": "off",
				"vue/no-restricted-block": "off",
				"vue/no-restricted-call-after-await": "off",
				"vue/no-restricted-component-options": "off",
				"vue/no-restricted-static-attribute": "off",
				"vue/no-restricted-syntax": "off",
				"vue/no-restricted-v-bind": "off",
				"vue/no-sparse-arrays": "off",
				"vue/no-static-inline-styles": "off",
				"vue/no-template-target-blank": "off",
				"vue/no-unregistered-components": "off",
				"vue/no-unsupported-features": "off",
				"vue/no-unused-properties": "off",
				"vue/no-useless-concat": "off",
				"vue/no-useless-mustaches": "off",
				"vue/no-useless-v-bind": "off",
				"vue/no-v-for-template-key": "off",
				"vue/no-v-html": "off",
				"vue/no-v-model-argument": "off",
				"vue/object-curly-newline": "off",
				"vue/object-curly-spacing": "off",
				"vue/object-property-newline": "off",
				"vue/operator-linebreak": "off",
				"vue/padding-line-between-blocks": "off",
				"vue/prefer-template": "off",
				"vue/require-direct-export": "off",
				"vue/require-name-property": "off",
				"vue/script-indent": "off",
				"vue/sort-keys": "off",
				"vue/space-in-parens": "off",
				"vue/space-infix-ops": "off",
				"vue/space-unary-ops": "off",
				"vue/static-class-names-order": "off",
				"vue/template-curly-spacing": "off",
				"vue/v-for-delimiter-style": "off",
				"vue/v-on-function-call": "off",
				"vue/valid-v-bind-sync": "off",
				// #regionend

				// #region UNUSED
				"vue/no-unused-refs": "off",
				// #endregion
			},
		},
	],
}
