json_response(json) do
  json.extract! @bubble, :name, :invitable, :kind
  json.radius bubble_member.radius
end