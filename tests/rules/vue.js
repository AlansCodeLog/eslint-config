const typescript = require("./typescript")
const vue = require("../../vue")


const excludeExtends = ["./js", "./base", "./typescript", "./vue"]
module.exports = {
	plugins: [
		...typescript.plugins,
		...(vue.plugins ? vue.plugins : []),
	],
	extends: [
		...typescript.extends,
		...(vue.extends ? vue.extends : []),
	].filter(entry => !excludeExtends.includes(entry)),
	rules: {
		...typescript.rules,
		...vue.overrides[0].rules,
	},
}
