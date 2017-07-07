class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_user_from_token!, only: :create

  def create
    @user = User.new(user_signup_params)
    if @user.save
      render :create, status: :created
    else

      invalid_signup_attempt
    end
  end

  def edit
    @interests = Interest.where('interests.counter >= 5') # FIXME temp stub
    render :edit, status: :ok
  end

  def update
    if current_user.update_attributes(user_params)
      apply_interests(params[:user][:interests]) if params[:user].present?
      head :no_content
    else
      render 'api/v1/shared/failure', locals: {errors: [current_user.errors]}, status: :unprocessable_entity
    end
  end

  def destroy
    user = current_user
    sign_out :user
    user.destroy
    head :no_content
  end

  private
  def user_signup_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :avatar, :agree_to_terms)
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :username, :first_name, :gender,
                                 :zip_code, :birthday, :phone, :avatar)
  end

  def invalid_signup_attempt
    warden.custom_failure!
    render 'api/v1/shared/failure', locals: {errors: [@user.errors]}, status: :unprocessable_entity
  end

  def apply_interests(interest_names)
    interest_names ||= []

    #destory non actual user_intersts
    current_user.interests.each do |interest|
      unless interest_names.include?(interest.name)
        UserInterest.where(user_id: current_user.id, interest_id: interest.id).destroy_all
        #####  FIXME  needs to decrement counter?
        # interest.counter -= 1
        # interest.save!
      end
    end

    # add new interests to user
    interest_names.each do |interest_name|
      interest = Interest.where(name: interest_name.downcase).first
      interest = Interest.create(name: interest_name.downcase, display_as: interest_name) if interest.nil?
      if UserInterest.where(user_id: current_user.id, interest_id: interest.id).blank?
        interest.users << current_user
        interest.counter += 1
        interest.save!
      end
    end
  end
end