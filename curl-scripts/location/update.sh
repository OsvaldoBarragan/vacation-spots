#!/bin/bash

API="http://localhost:5000"
URL_PATH="/locations"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
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
