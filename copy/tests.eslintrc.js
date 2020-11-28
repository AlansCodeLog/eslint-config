module.exports ={
	extends: [
		// https://github.com/AlansCodeLog/my-eslint-config
		// extends:
		// ./node_modules/@alanscodelog/eslint-config/js.js
		// prev + ./node_modules/@alanscodelog/eslint-config/typescript.js (default)
		// prev + ./node_modules/@alanscodelog/eslint-config/vue.js
		// TOCONFIGURE
		"@alanscodelog/eslint-config",
		// add /js, /typescript, /vue for specific config

		// ./node_modules/@alanscodelog/eslint-config/tests.js
		"@alanscodelog/eslint-config/tests",
	],
	rules: {
		// I like to toggle these on occasionally, but otherwise keep them off
		// "import/no-unused-modules": [ "warn", { unusedExports: true, missingExports: false /* interferes with ts */ } ],
		// "@typescript-eslint/no-unnecessary-condition": [ "warn", { allowConstantLoopConditions: true } ],
	}
}
