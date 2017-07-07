class Api::V1::AlbumsController < ApplicationController
  before_action :find_bubble, only: [:index, :create]
  before_action :find_album, except: [:index, :create]

  def index
    @albums = @bubble.albums
  end

  def show
  end

  def create
    if current_user.is_member_of?(@bubble)
      @album = @bubble.albums.build(album_params)
      if @album.save
        head :created
      else
        render 'api/v1/shared/failure', locals: {errors: [@album.errors]}, status: :unprocessable_entity
      end
    else
      render 'api/v1/shared/failure', locals: {errors: [{user: ["is not a member of this bubble"]}] }, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if current_user.can_manage?(@album.bubble)
      if @album.update_attributes(album_params)
        head :no_content
      else
        render 'api/v1/shared/failure', locals: {errors: [@album.errors]}, status: :unprocessable_entity
      end
    else
      render 'api/v1/shared/failure', locals: {errors: [{user: ["hasn't access"]}] }, status: :unauthorized
    end
  end

  def destroy
    if current_user.can_manage?(@album.bubble)
      @album.destroy
      head :no_content
    else
      render 'api/v1/shared/failure', locals: {errors: [{user: ["hasn't access"]}] }, status: :unauthorized
    end
  end

  private

  def find_album
    @album = Album.find(params[:id])
  end

  def find_bubble
    @bubble = Bubble.find(params[:bubble_id])
  end

  def album_params
    params.require(:album).permit(:name)
  end
end