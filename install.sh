#!/usr/bin/env bash

# COLORS - use with echo -e to enable backslash escaping
RED="\033[0;31m"
GREEN="\033[0;32m"
CYAN="\033[1;36m"

RESET="\033[0m"

INSTALLER_PATH="./node_modules/@alanscodelog/eslint-config/install.sh"
ESLINT_ROOT="./node_modules/@alanscodelog/eslint-config/copy/eslint.config.js"
ESLINT_ROOT_DEST="eslint.config.js"

ABORT_MESSAGE="${RED}Aborting install, you can try again by running ${INSTALLER_PATH}.${RESET}"


if ! cp $ESLINT_ROOT $ESLINT_ROOT_DEST
then
	echo -e "${RED}Failed to copy ${ESLINT_ROOT} to ${ESLINT_ROOT_DEST}${RESET}"
	echo -e $ABORT_MESSAGE
	exit 1
else
	echo -e "${GREEN}Copied ${ESLINT_ROOT} to ${ESLINT_ROOT_DEST}${RESET}"
fi

echo -e "${GREEN}Succesfully Installed${RESET}"
