module ApplicationHelper

  def json_response(json, errors=[])
    if block_given?
      json.result { yield }
    else
      json.set! :result, {}
    end
    json.errors errors
  end

end
