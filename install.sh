#!/usr/bin/env bash

# COLORS - use with echo -e to enable backslash escaping
RED="\033[0;31m"
GREEN="\033[0;32m"
CYAN="\033[1;36m"

RESET="\033[0m"

INSTALLER_PATH="./node_modules/@alanscodelog/eslint-config/install.sh"
ESLINT_ROOT="./node_modules/@alanscodelog/eslint-config/copy/root.eslintrc.js"
ESLINT_ROOT_DEST="./.eslintrc.js"
ESLINT_TESTS="./node_modules/@alanscodelog/eslint-config/copy/tests.eslintrc.js"
ESLINT_TESTS_DEST="./tests/.eslintrc.js"

ABORT_MESSAGE="${RED}Aborting install, you can try again by running ${INSTALLER_PATH}.${RESET}"

GREP_HEADER="Don't forget to configure the \"// TOCONFIGURE\" comments:"
GREP_SEPARATOR=$(printf "%${#GREP_HEADER}s")
GREP_SEPARATOR=$(echo ${GREP_SEPARATOR// /=})

GREP_COMMAND="grep \"// TOCONFIGURE\" ${ESLINT_ROOT_DEST} ${ESLINT_TESTS_DEST} -H -n -A1 --color"
# -H prints the filename
# -n adds line numbers
# -A1 shows the (1) line after the match

if ! cp $ESLINT_ROOT $ESLINT_ROOT_DEST
then
	echo -e "${RED}Failed to copy ${ESLINT_ROOT} to ${ESLINT_ROOT_DEST}${RESET}"
	echo -e $ABORT_MESSAGE
	exit 1
else
	echo -e "${GREEN}Copied ${ESLINT_ROOT} to ${ESLINT_ROOT_DEST}${RESET}"
fi

if ! cp $ESLINT_TESTS $ESLINT_TESTS_DEST
then
	echo -e "${RED}Failed to copy ${ESLINT_TESTS} to ${ESLINT_TESTS_DEST}${RESET}"
	echo -e $ABORT_MESSAGE
	exit 1
else
	echo -e "${GREEN}Copied ${ESLINT_TESTS} to ${ESLINT_TESTS_DEST}${RESET}"
fi

echo -e "${GREEN}Succesfully Installed${RESET}"

echo ""
echo -e "${CYAN}${GREP_SEPARATOR}"
echo ${GREP_HEADER}
echo -e "${GREP_SEPARATOR}${RESET}"
echo "Searching... ($GREP_COMMAND)"
echo ""
eval $GREP_COMMAND
echo "Copying root eslintrc.js";
