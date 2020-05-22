#!/usr/bin/env bash

echo "Copying .eslintrc.js"
cp ./node_modules/@alanscodelog/eslint-config/copy/root.eslintrc.js ./.eslintrc.js
cp ./node_modules/@alanscodelog/eslint-config/copy/tests.eslintrc.js ./tests/.eslintrc.js
echo "==========================================================="
echo "Don't forget to configure the \"// TOCONFIGURE\" comments :"
echo "==========================================================="
echo "Searching... (grep \"// TOCONFIGURE\".eslintrc.js -H -n -A1 --color)"
echo ""
grep "// TOCONFIGURE" .eslintrc.js tests/.eslintrc.js -H -n -A1 --color
