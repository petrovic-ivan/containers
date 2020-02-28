curl -w "\n" --header "Content-Type: application/json" \
  --request POST \
  --data '{ "message": "'"$1"'" }' \
  http://ac74357f459c011eaa0aa06d913c29dc-184115419.us-west-2.elb.amazonaws.com:4201/api/message/publish