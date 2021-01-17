#!/bin/sh

API="http://localhost:5000"
URL_PATH="/locations"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
