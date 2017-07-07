json.set! :media do
  json.array! media do |medium|
    json.partial! 'api/v1/media/medium', medium: medium
  end
end