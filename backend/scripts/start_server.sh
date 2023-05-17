set -o errexit

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR/.." || exit

#FLASK_APP=app.py
FLASK_DEBUG=True

FLASK_DEBUG=$FLASK_DEBUG poetry run flask run --port 8000