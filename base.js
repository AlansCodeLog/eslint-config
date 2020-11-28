module.exports = {
	env: {
		node: true,
		browser: true,
		es6: true,
		jest: true,
	},
	ignorePatterns: [
		"*.eslintrc.js",
		"*.config.js", // otherwise vscode complains about config files not being part of the project
	],
	settings: {
		"import/ignore": ["node_modules"],
	},
}
