module.exports = {
	root: true,
	extends: [
		// https://github.com/AlansCodeLog/my-eslint-config
		// extends:
		// ./node_modules/@alanscodelog/eslint-config/js.js
		// prev + ./node_modules/@alanscodelog/eslint-config/typescript.js (default)
		// prev + ./node_modules/@alanscodelog/eslint-config/vue.js
		// TOCONFIGURE
		"@alanscodelog/eslint-config"
		// add /js, /typescript, /vue for specific config
	],
	ignorePatterns: [
	],
	rules: {
	},
	// TOCONFIGURE
	overrides: [
		// Eslint: https://eslint.org/docs/rules/
		{ files: [ "bin/*.js" ], parserOptions: {sourceType: "script"}, },
		{
			files: [ "**/*.js", "**/*.ts" ],
			rules: {
				// like to toggle this on occasionally, but otherwise keep off
				// "import/no-unused-modules": [ "warn", { unusedExports: true, missingExports: false }]
			}
		},
		// Typescript: https://github.com/typescript-eslint/typescript-eslint/master/packages/eslint-plugin#supported-rules
		{
			files: [ "**/*.ts", "**/*.vue"],
			rules: {
			}
		},
		// Vue: https://eslint.vuejs.org/rules/
		{
			files: [ "**/*.vue"],
			rules: {
			}
		}
	]
}
