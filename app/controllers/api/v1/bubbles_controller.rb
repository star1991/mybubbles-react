class Api::V1::BubblesController < ApplicationController
  skip_before_action :authenticate_user_from_token!, only: [:join_member]
  before_action :only_valid_user_has_access, except: [:show, :join_member]
  before_action :find_bubble, except: [:new, :create, :join_member]

  def show
    bm = @bubble.bubble_members.where(user_id: current_user.id).first
    render :show, locals: {bubble_member: bm}, status: :ok
  end

  def new
    @bubble_kinds = Bubble.kinds
  end

  def create
    bm = BubbleMember.new(user_id: 0, bubble_id: 0, user_role: 0, radius: params[:radius])
    if bm.invalid?
      render 'api/v1/shared/failure', locals: {errors: bm.errors }, status: :bad_request
    else
      @bubble = Bubble.new(bubble_params)
      if @bubble.save
        bm = @bubble.bubble_members.build(member: current_user, user_role: BubbleMember.user_roles[:owner], radius: params[:radius])
        if bm.save
          render :create, locals: {bubble_member: bm}, status: :ok and return
        end
      end
      render 'api/v1/shared/failure', locals: {errors: @bubble.errors }, status: :unprocessable_entity
      end
    end

  def edit
  end

  def update
    if @bubble.bubble_members.where(user_id: current_user.id).where("user_role < #{BubbleMember.user_roles[:guest]}").first
      if @bubble.update_attributes(bubble_params)
        head :no_content
      else
        render 'api/v1/shared/failure', locals: {errors: @bubble.errors }, status: :unprocessable_entity
      end
    else
      render 'api/v1/shared/failure', locals: {errors: [{user: ["hasn't access"]}] }, status: :unauthorized
    end
  end

  def destroy
    if @bubble.bubble_members.where(user_id: current_user.id, user_role: BubbleMember.user_roles[:owner]).first
      @bubble.destroy
      head :no_content
    else
      render 'api/v1/shared/failure', locals: {errors: [{user: ["hasn't access"]}] }, status: :unauthorized
    end
  end

  def move
    bm = @bubble.bubble_members.where(user_id: current_user.id).first
    if bm.present?
      bm.radius = params[:radius]
      if bm.save
        render :show, locals: {bubble_member: bm}, status: :ok
      else
        render 'api/v1/shared/failure', locals: {errors: bm.errors }, status: :unprocessable_entity
      end
    end
  end

  def join_member
    bi = BubbleInvitation.find_by(token: params[:token])
    bm = bi.bubble.bubble_members.build(user_id: bi.new_member_id, user_role: BubbleMember.user_roles[:guest], radius: 1)
    if bm.save
      render :join_member, status: :ok
    else
      render :join_member, status: :unprocessable_entity
    end
  end

  def join_me
    if @bubble.invitable?
      render 'api/v1/shared/failure', locals: {errors: [{user: ["can join this bubble only by invite"]}] }, status: :unprocessable_entity
    elsif @bubble.bubble_members.where(user_id: current_user.id).first
      render 'api/v1/shared/failure', locals: {errors: [{user: ["is already a member of this bubble"]}] }, status: :unprocessable_entity
    else
      bm = @bubble.bubble_members.build(member: current_user, user_role: BubbleMember.user_roles[:guest], radius: 1)
      if bm.save
        render :show, locals: {bubble_member: bm}, status: :ok
      else
        render 'api/v1/shared/failure', locals: {errors: bm.errors }, status: :unprocessable_entity
      end
    end
  end

  def disjoin_me
    if @bubble.owner == current_user
      render 'api/v1/shared/failure', locals: {errors: [{bubble: ["should have the owner"]}] }, status: :unprocessable_entity
    else
      bm = @bubble.bubble_members.where(user_id: current_user.id).first
      if bm.nil?
        render 'api/v1/shared/failure', locals: {errors: [{user: ["is not a member of this bubble"]}] }, status: :unprocessable_entity
      else
        bm.destroy
        head :no_content
      end
    end
  end

  def disjoin
    if @bubble.bubble_members.where(user_id: current_user.id).where("user_role <= #{BubbleMember.user_roles[:moderator]}").first.nil?
      render 'api/v1/shared/failure', locals: {errors: [{you: ["have not permissions"]}] }, status: :unauthorized
    elsif @bubble.owner.id == params[:member_id].to_i
      render 'api/v1/shared/failure', locals: {errors: [{bubble: ["should have the owner"]}] }, status: :unprocessable_entity
    else
      bm = @bubble.bubble_members.where(user_id: params[:member_id]).first
      if bm.nil?
        render 'api/v1/shared/failure', locals: {errors: [{user: ["is not a member of this bubble"]}] }, status: :unprocessable_entity
      else
        bm.destroy
        head :no_content
      end
    end
  end

  def member
    if @bubble.owner == current_user
      if @bubble.owner.id != params[:member_id].to_i
        if ["guest", "moderator"].include? params[:new_role]
          bm = @bubble.bubble_members.find_by(user_id: params[:member_id])
          if bm.nil?
            render 'api/v1/shared/failure', locals: {errors: [{user: ["is not a member of this bubble"]}] }, status: :unprocessable_entity
          else
            bm.user_role = params[:new_role].to_sym
            if bm.save
              head :no_content
            else
              render 'api/v1/shared/failure', locals: {errors: bm.errors}, status: :unprocessable_entity
            end
          end
        else
          render 'api/v1/shared/failure', locals: {errors: [{new_role: ["is unknown"]}] }, status: :bad_request
        end
      else
        render 'api/v1/shared/failure', locals: {errors: [{you: ["cann't change your role 'owner' for now"]}] }, status: :unprocessable_entity
      end
    else
      render 'api/v1/shared/failure', locals: {errors: [{you: ["have not permissions"]}] }, status: :unauthorized
    end
  end

  private
  def bubble_params
    params.require(:bubble).permit(:name, :kind, :invitable)
  end

  def find_bubble
    @bubble = Bubble.find(params[:id])
  end

  def only_valid_user_has_access
    render 'api/v1/shared/failure', locals: {errors: [{user: ["has incomplete profile"]}] }, status: :unauthorized if current_user.invalid?
  end
end
