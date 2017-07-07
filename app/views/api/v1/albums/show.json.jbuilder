json.set! :albums do
  json.array! [@album] do |album|
    json.partial! 'album', album: album
  end
end
