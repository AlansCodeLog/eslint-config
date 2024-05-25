// awaiting https://github.com/sarbbottam/eslint-find-rules/issues/351

// import { exec as _exec } from "child_process"
// import { promisify } from "util"


// const exec = promisify(_exec)

// const folder = "./tests/rules"
async function main() {
	// let missing = false
	// for (const file of ["js", "typescript", "vue"]) {
	// 	const { stdout, stderr } = await exec(`pnpm eslint-find-rules --unused --no-error ${folder}/${file}.js`)
	// 		.catch(err => {
	// 			console.log(`\nError in ${file} Config:\n`)
	// 			console.log(err)
	//
	// 			process.exit(1)
	// 		})
	//
	// 	if (stderr) {
	// 		console.log(`\nError in ${file} Config:\n`, stderr)
	// 		process.exit(1)
	// 	}
	// 	const list = stdout
	// 		.replace("unused rules", "")
	// 		.split(/\s+/)
	// 		.filter(line => line.trim() !== "")
	// 	if (list.length > 0) {
	// 		missing = true
	// 		console.log(`\nUnset Rules in ${file} Config:`)
	// 		console.log(list.join("\n"))
	// 	}
	// }
	// if (missing) {
	// 	console.log("Please set rules to off if unused.")
	//
	// 	process.exit(1)
	// }
}
main()
