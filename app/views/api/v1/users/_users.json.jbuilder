
json.set! :users do
  json.array! users do |user|
    json.extract! user, :first_name
    json.access_token user.api_key.access_token
  end
end
