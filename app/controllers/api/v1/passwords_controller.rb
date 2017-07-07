class Api::V1::PasswordsController < Devise::PasswordsController
  skip_before_action :authenticate_user_from_token!, only: [:create, :new, :update]
  respond_to :json, except: :new
  respond_to :html, only: :new

end
