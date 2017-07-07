class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  respond_to :json
  
  before_action :authenticate_user_from_token!

  ##
  # User Authentication
  # Authenticates the user with OAuth2 Resource Owner Password Credentials Grant
  def authenticate_user_from_token!
    auth_token = request.headers['Authorization']

    if auth_token
      authenticate_with_auth_token(auth_token)
    else
      authentication_error
    end
  end

  private

  def authenticate_with_auth_token(auth_token)
    unless auth_token.include?(':')
      authentication_error
      return
    end

    user_id = auth_token.split(':').first
    user = User.where(id: user_id).first

    if user && Devise.secure_compare(user.api_key.access_token, auth_token)
      # User can access
      sign_in user, store: false
    else
      authentication_error
    end
  end

  ##
  # Authentication Failure
  # Renders a 401 error
  def authentication_error
    # User's token is either invalid or not in the right format
    render json: { result: {}, errors: [{ user: ['is unauthorized'] }] }, status: :unauthorized  # Authentication timeout
  end
end
