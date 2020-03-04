curl -w "\n" --header "Content-Type: application/json" \
  --request POST \
  --data '{ "message": "'"$1"'" }' \
  http://DOMAIN:4201/api/message/publish