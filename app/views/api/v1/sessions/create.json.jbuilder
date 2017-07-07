json_response(json) do
  json.partial! 'api/v1/users/users', users: [current_user]
end