#reviews

API="http://localhost:5000"
URL_PATH="/reviews"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "review": {
      "locationId": "'"${LOCATION_ID}"'"
    }
  }'

echo
