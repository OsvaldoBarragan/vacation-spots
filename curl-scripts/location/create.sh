#!/bin/bash

API="http://localhost:5000"
URL_PATH="/locations"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "location": {
      "name": "'"${NAME}"'",
      "country": "'"${COUNTRY}"'",
      "activities": "'"${ACTIVITIES}"'",
      "cuisines": "'"${CUISINES}"'",
      "imageUrl": "'"${IMAGEURL}"'"
    }
  }'

echo
