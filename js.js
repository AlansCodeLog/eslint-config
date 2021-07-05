/**
 * ⚠️ means the rule has a typescript version is disabled in typescript files, but any changes to it should be "synced" with the typescript version.
 */
module.exports = {
	extends: [
		"./base",
	],
	overrides: [
		{
			files: ["**/*.js"],
			parserOptions: {
				// usually I transpile all modules
				ecmaVersion: 2021,
				sourceType: "module",
			},
			rules: {
				// #region STYLE - CLASS RELATED
				"accessor-pairs": "warn",
				"constructor-super": "warn",
				"grouped-accessor-pairs": "warn",
				"no-dupe-class-members": "warn", // ⚠️
				// #regionend

				// #region STYLE - WHITESPACE
				"array-bracket-newline": ["warn", "consistent"],
				"array-bracket-spacing": ["warn", "never", { objectsInArrays: false, arraysInArrays: false }],
				"array-element-newline": ["warn", "consistent"],
				"brace-style": ["warn", "1tbs", { allowSingleLine: true }], // ⚠️
				"comma-dangle": ["warn", "always-multiline"], // ⚠️
				"comma-spacing": ["warn", { before: false, after: true }], // ⚠️
				"func-call-spacing": "warn", // ⚠️
				"keyword-spacing": ["warn", { before: true, after: true }], // ⚠️
				"space-before-function-paren": ["warn", { anonymous: "never", asyncArrow: "always", named: "never" }], // ⚠️
				"space-infix-ops": "warn", // ⚠️
				"object-curly-newline": ["warn", { consistent: true }],
				"object-curly-spacing": ["warn", "always", { objectsInObjects: true, arraysInObjects: false }],
				"object-property-newline": ["warn", { allowAllPropertiesOnSameLine: true }],
				"arrow-spacing": "warn",
				"computed-property-spacing": "warn",
				"function-call-argument-newline": ["warn", "consistent"],
				"generator-star-spacing": ["warn", { before: false, after: true }],
				"key-spacing": ["warn", { afterColon: true }],
				"newline-per-chained-call": ["warn", { ignoreChainWithDepth: 3 }],
				"no-mixed-spaces-and-tabs": "warn",
				"no-multiple-empty-lines": ["warn", { max: 2, maxEOF: 1, maxBOF: 0 }],
				"no-trailing-spaces": ["warn", { skipBlankLines: true }],
				"no-whitespace-before-property": "warn",
				"nonblock-statement-body-position": "warn",
				"padded-blocks": ["warn", "never"],
				"rest-spread-spacing": "warn",
				"semi-spacing": ["warn", { before: false, after: true }],
				"space-before-blocks": "warn",
				"space-in-parens": ["warn", "never"],
				"space-unary-ops": "warn",
				"spaced-comment": "warn",
				"switch-colon-spacing": "warn",
				"template-curly-spacing": "warn",
				"template-tag-spacing": "warn",
				"yield-star-spacing": ["warn", "after"],
				// #regionend

				// #region STYLE - DELIMITERS / OPERATORS
				"jsx-quotes": "warn",
				"no-extra-semi": "warn", // ⚠️
				"operator-assignment": "warn",
				"prefer-template": "warn",
				"quote-props": ["warn", "as-needed", { unnecessary: true }],
				quotes: ["warn", "double", { avoidEscape: false, allowTemplateLiterals: true }], // ⚠️
				semi: ["warn", "never"], // ⚠️
				// #regionend

				// #region STYLE - FUNCTIONS
				"arrow-body-style": "warn",
				"arrow-parens": ["warn", "as-needed"],
				"no-inner-declarations": ["warn", "both"],
				// #regionend

				// #region STYLE - OBJECTS / ARRAYS
				"dot-location": ["warn", "property"],
				"dot-notation": "warn", // ⚠️
				"no-new-object": "warn",
				"object-shorthand": "warn",
				curly: ["warn", "multi-line"],
				// #regionend

				// #region PREFERENCE - GENERAL
				camelcase: "warn",
				"default-case-last": "warn",
				eqeqeq: ["warn", "always"],
				"guard-for-in": "warn",
				"new-parens": "warn",
				"no-alert": "warn",
				"no-console": "warn",
				"no-debugger": "warn",
				"no-new-wrappers": "warn",
				"no-throw-literal": "warn", // ⚠️
				"no-unneeded-ternary": "warn",
				"no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: false }], // ⚠️
				"no-useless-call": "warn",
				"no-useless-computed-key": "warn",
				"no-useless-rename": "warn",
				"no-useless-return": "warn",
				"no-var": "warn",
				"no-void": ["warn", { allowAsStatement: true }],
				"prefer-exponentiation-operator": "warn",
				"prefer-const": ["warn", { ignoreReadBeforeAssign: false }],
				"prefer-object-spread": "warn",
				"prefer-regex-literals": "warn",
				"prefer-rest-params": "warn",
				"prefer-spread": "warn",
				"symbol-description": "warn",
				yoda: "warn",
				// #regionend

				// #region PREFERENCE - FILES
				"eol-last": "warn",
				"linebreak-style": ["warn", "unix"],
				"max-lines": ["warn", 1000],
				// #regionend

				// #region UNSAFE / ERROR PRONE
				"block-scoped-var": "warn",
				"for-direction": "warn",
				"getter-return": "warn",
				"no-async-promise-executor": "warn",
				"no-await-in-loop": "warn",
				"no-bitwise": "warn",
				"no-caller": "warn",
				"no-case-declarations": "warn", // no vars not inside brackets in switch statements
				"no-class-assign": "warn",
				"no-compare-neg-zero": "warn",
				"no-cond-assign": "warn",
				"no-const-assign": "warn",
				"no-constant-condition": "warn",
				"no-constructor-return": "warn",
				"no-control-regex": "warn",
				"no-delete-var": "warn",
				"no-dupe-args": "warn",
				"no-dupe-else-if": "warn",
				"no-dupe-keys": "warn",
				"no-duplicate-case": "warn",
				"no-empty-character-class": "warn",
				"no-empty-pattern": "warn",
				"no-empty": "warn",
				"no-eq-null": "warn",
				"no-eval": "warn",
				"no-ex-assign": "warn",
				"no-extend-native": "warn",
				"no-extra-bind": "warn",
				"no-extra-boolean-cast": "warn",
				"no-fallthrough": "warn",
				"no-floating-decimal": "warn",
				"no-func-assign": "warn",
				"no-global-assign": "warn",
				"no-implicit-globals": "warn",
				"no-implied-eval": "warn", // ⚠️
				"no-import-assign": "warn",
				"no-invalid-regexp": "warn",
				"no-invalid-this": "warn", // ⚠️
				"no-irregular-whitespace": "warn",
				"no-iterator": "warn",
				"no-label-var": "warn",
				"no-labels": "warn",
				"no-lone-blocks": "warn",
				"no-loop-func": "warn", // ⚠️
				"no-loss-of-precision": "warn", // ⚠️
				"no-misleading-character-class": "warn",
				"no-mixed-operators": "warn",
				"no-multi-spaces": "warn",
				"no-new-func": "warn",
				"no-new-symbol": "warn",
				"no-new": "warn",
				"no-nonoctal-decimal-escape": "Warn",
				"no-obj-calls": "warn",
				"no-octal-escape": "warn",
				"no-octal": "warn",
				"no-promise-executor-return": "warn",
				"no-proto": "warn",
				"no-prototype-builtins": "warn",
				"no-redeclare": ["warn"], // ⚠️
				"no-regex-spaces": "warn",
				"no-return-await": "warn", // ⚠️
				"no-script-url": "warn",
				"no-self-assign": "warn",
				"no-self-compare": "warn",
				"no-sequences": "warn",
				"no-setter-return": "warn",
				"no-shadow-restricted-names": "warn",
				"no-shadow": ["warn"], // ⚠️
				"no-sparse-arrays": "warn",
				"no-template-curly-in-string": "warn",
				"no-this-before-super": "warn",
				"no-undef-init": "warn",
				"no-undef": "warn",
				"no-unexpected-multiline": "warn",
				"no-unmodified-loop-condition": "warn",
				"no-unreachable-loop": "warn",
				"no-unreachable": "warn",
				"no-unsafe-finally": "warn",
				"no-unsafe-optional-chaining": "warn",
				"no-unsafe-negation": "warn",
				"no-unused-expressions": ["warn", { allowTernary: true }], // ⚠️
				"no-unused-labels": "warn",
				"no-use-before-define": ["warn", { functions: false, classes: true, variables: true }], // ⚠️
				"no-useless-catch": "warn",
				"no-useless-escape": "warn",
				"no-with": "warn",
				"prefer-numeric-literals": "warn",
				"prefer-promise-reject-errors": ["warn", { allowEmptyReject: true }],
				radix: "warn",
				"require-await": "warn", // ⚠️
				"require-yield": "warn",
				"use-isnan": "warn",
				"valid-typeof": "warn",
				"wrap-iife": ["warn", "inside", { functionPrototypeMethods: true }],
				// #regionend

				// #region UNUSED
				// kept for reference and also `show-unset` script
				"array-callback-return": "off",
				"block-spacing": "off",
				"capitalized-comments": "off",
				"class-methods-use-this": "off",
				"comma-style": "off",
				complexity: "off",
				"consistent-return": "off",
				"consistent-this": "off",
				"default-case": "off",
				"default-param-last": "off",
				"func-name-matching": "off",
				"func-names": "off",
				"func-style": "off",
				"function-paren-newline": "off",
				"id-blacklist": "off",
				"id-denylist": "off",
				"id-length": "off",
				"id-match": "off",
				"implicit-arrow-linebreak": ["off", "beside"], // too annoying in certain situations
				indent: "off",
				"init-declarations": "off",
				"line-comment-position": "off",
				"lines-around-comment": "off",
				"lines-between-class-members": "off",
				"max-classes-per-file": "off",
				"max-depth": "off",
				"max-len": "off",
				"max-lines-per-function": "off",
				"max-nested-callbacks": "off",
				"max-params": "off",
				"max-statements-per-line": "off",
				"max-statements": "off",
				"multiline-comment-style": "off",
				"multiline-ternary": "off",
				"new-cap": "off",
				"no-array-constructor": "off",
				"no-confusing-arrow": "off",
				"no-continue": "off",
				"no-div-regex": "off",
				"no-else-return": "off",
				"no-empty-function": "off",
				"no-extra-label": "off",
				"no-extra-parens": "off",
				"no-implicit-coercion": "off",
				"no-inline-comments": "off",
				"no-lonely-if": "off",
				"no-magic-numbers": ["off", { ignoreArrayIndexes: true, detectObjects: true, ignore: [1]}],
				"no-multi-assign": "warn",
				"no-multi-str": "off",
				"no-negated-condition": "off",
				"no-nested-ternary": "off",
				"no-param-reassign": "off",
				"no-plusplus": "off",
				"no-restricted-exports": "off",
				"no-restricted-globals": "off",
				"no-restricted-properties": "off",
				"no-restricted-syntax": "off",
				"no-return-assign": "off",
				"no-tabs": "off",
				"no-ternary": "off",
				"no-undefined": "off",
				"no-underscore-dangle": "off",
				"no-useless-backreference": "off", // was complaining when I didn't have a backreference?
				"no-useless-concat": "off",
				"no-useless-constructor": "off",
				"no-warning-comments": "off",
				"one-var-declaration-per-line": "off",
				"one-var": ["off", "never"],
				"operator-linebreak": "off",
				"padding-line-between-statements": "off",
				"prefer-arrow-callback": "off",
				"prefer-destructuring": "off",
				"prefer-named-capture-group": "off",
				"require-atomic-updates": "off",
				"require-unicode-regexp": "off",
				"semi-style": "off",
				"sort-imports": "off",
				"sort-keys": "off",
				"sort-vars": "off",
				strict: "off",
				"unicode-bom": "off",
				"vars-on-top": "off",
				"wrap-regex": "off",
				// #regionend
			},
		},
	],
}
