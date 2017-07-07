json.set! :albums do
  json.array! @albums do |album|
    json.extract! album, :name, :updated_at
    json.media_count album.media.count
    json.partial! 'api/v1/media/media', media: album.media
  end
end