#!/bin/sh

API="http://localhost:5000"
URL_PATH="/locations"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
