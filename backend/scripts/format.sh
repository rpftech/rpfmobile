#!/bin/bash

set -o errexit

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR/.." || exit

source ./scripts/fix_imports.sh
source ./scripts/check_types.sh
source ./scripts/lint.sh