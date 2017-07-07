
json.set! :bubbles do
  json.array! bubbles do |bubble|
    json.extract! bubble, :name, :invitable, :kind
    json.radius bubble_member.radius
    json.partial! 'api/v1/albums/albums', albums: bubble.albums
    json.partial! 'api/v1/media/media', media: bubble.substantive_media
  end
end
