module.exports = {
	root: false,
	/**
	 * Without this eslint config, eslint will complain about the octal literals used in the post install script.
	 * We cannot change any of the options in the root eslintrc though since that would affect any packages relying on the config. So the post install script has been moved to this folder where we can add this eslintrc to fix the problem.
	 */
	parserOptions: {
		sourceType: "script",
	},
}
