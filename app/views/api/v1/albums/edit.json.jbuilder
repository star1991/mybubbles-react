json.set! :albums do
  json.array! [@album] do |album|
    json.extract! album, :name, :updated_at
  end
end