/* eslint-disable */
/* We need the octal escapes, this will not run in strict mode. */

const yellow = "\x1b[33m"
const reset = "\033[0m"
const message = yellow +
`@alanscodelog/eslint-config: Don't forget to run the install script:
Note: This will overwrite ".eslintrc.js" and "tests/.eslintrc.js"
./node_modules/@alanscodelog/eslint-config/install.sh`
+ reset
console.log(message)
