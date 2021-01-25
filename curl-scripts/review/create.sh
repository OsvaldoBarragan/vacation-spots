 #reviews

API="http://localhost:5000"
URL_PATH="/reviews"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "review": {
      "rating": "'"${RATING}"'",
      "title": "'"${TITLE}"'",
      "content": "'"${CONTENT}"'",
      "locationId": "'"${LOCATION_ID}"'"
    }
  }'

echo
