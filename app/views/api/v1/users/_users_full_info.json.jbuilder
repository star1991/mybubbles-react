
json.set! :users do
  json.array! users do |user|
    json.extract! user, :id, :email, :first_name, :username, :phone, :gender, :zip_code, :birthday, :created_at, :updated_at
    json.avatar_url user.avatar_url
    json.set! :interests do
      json.array! user.interests do |interest|
        json.extract! interest, :display_as, :name
      end
    end
  end
end

json.set! :popular_interests do
  json.array! @interests do |interest|
    json.extract! interest, :display_as, :name
  end
end
