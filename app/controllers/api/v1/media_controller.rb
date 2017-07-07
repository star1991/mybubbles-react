class Api::V1::MediaController < ApplicationController
  before_action :find_media, only: [:update, :destroy]

  def create
    @media = Medium.new(bubble_id: params[:bubble_id], user_id: current_user.id, title: params[:title])
    @media.album_id = params[:album_id].to_i if params[:album_id].present? && Album.find(params[:album_id]).present?
    unless @media.add_encoded_attachment(params[:attachment], params[:filename])
      render 'api/v1/shared/failure', locals: {errors: [{attachment: 'is not valid'}]}, status: :unprocessable_entity and return
    end
    if @media.save
      head :created
    else
      render 'api/v1/shared/failure', locals: {errors: [@media.errors]}, status: :unprocessable_entity
    end
  end

  def update
    if current_user == @media.uploader or current_user.can_manage?(@media.bubble)
      if @media.update_attributes(media_params)
        head :no_content
      else
        render 'api/v1/shared/failure', locals: {errors: [@media.errors]}, status: :unprocessable_entity
      end
    else
      render 'api/v1/shared/failure', locals: {errors: [{user: ["hasn't access"]}] }, status: :unauthorized
    end
  end

  def destroy
    if current_user == @media.uploader or current_user.can_manage?(@media.bubble)
      @media.destroy
      head :no_content
    else
      render 'api/v1/shared/failure', locals: {errors: [{user: ["hasn't access"]}] }, status: :unauthorized
    end
  end

  private

  def media_params
    params.require(:medium).permit(:title)
  end

  def find_media
    @media = Medium.find(params[:id])
  end
end