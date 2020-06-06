let yellow = "\x1b[33m"
let reset = "\033[0m"
let message = yellow +
`@alanscodelog/eslint-config: Don't forget to run the install script:
Note: This will overwrite ".eslintrc.js" and "tests/.eslintrc.js"
./node_modules/@alanscodelog/eslint-config/install.sh`
+ reset
console.log(message)
