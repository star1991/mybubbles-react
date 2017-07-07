json_response(json) do
  json.reset_password_token params[:reset_password_token]
end