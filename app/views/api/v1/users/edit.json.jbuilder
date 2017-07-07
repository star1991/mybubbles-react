json_response(json) do
  json.partial! 'users_full_info', users: [current_user]
end