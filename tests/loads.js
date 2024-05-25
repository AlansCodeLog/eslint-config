/**
 * Checks that our config loads and has no errors or deprecated rules.
 */

// const { ESLint } = require("eslint")


import { ESLint } from "eslint"
const eslint = new ESLint()

eslint.lintFiles("tests/fixtures/**/*")
	.then(async results => {
		const formatter = await eslint.loadFormatter()
		const prettyRes = formatter.format(results)
		console.log(prettyRes)

		const hasProblems = results.find(res => res.errorCount > 0 || res.usedDeprecatedRules.length > 0) !== undefined
		const hasDeprecatedRules = results.find(res => res.usedDeprecatedRules.length > 0) !== undefined

		if (hasDeprecatedRules) {
			console.log("The following rules are deprecated:\n")

			for (const res of results) {
				// these won't be printed by the eslint formatter normally
				if (res.usedDeprecatedRules.length > 0) {
					for (const rule of res.usedDeprecatedRules) {
						console.error(`${rule.ruleId}\n\tReplaced by: [${rule.replacedBy.join(", ")}]`)
					}
				}
			}
			// give the errors some space
			console.log("")
		}
		if (hasProblems) process.exit(1)
	})
