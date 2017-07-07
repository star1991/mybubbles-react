json_response(json) do
  json.extract! @bubble, :name, :invitable, :kind
end