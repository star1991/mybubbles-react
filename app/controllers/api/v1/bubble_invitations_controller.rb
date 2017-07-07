class Api::V1::BubbleInvitationsController < ApplicationController

  def create
    bubble = Bubble.find(params[:bubble_id])
    if !bubble.invitable?
      render 'api/v1/shared/failure', locals: {errors: [{bubble: ["is not invitable"]}] }, status: :unprocessable_entity
    elsif bubble.bubble_members.where(user_id: current_user.id).first
      render 'api/v1/shared/failure', locals: {errors: [{user: ["is already a member of this bubble"]}] }, status: :unprocessable_entity
    else
      bi = bubble.bubble_invitations.build(new_member_id: current_user.id, status: :pending)
      if bi.save
        head status: :ok
      else
        render 'api/v1/shared/failure', locals: {errors: bi.errors }, status: :unprocessable_entity
      end
    end
  end

  def update
    @bi = BubbleInvitation.find_by(token: params[:token])
    if @bi.bubble.bubble_members.where(user_id: current_user.id).where("user_role < #{BubbleMember.user_roles[:guest]}").first
      if @bi.update_attributes(moderator_id: current_user.id, status: params[:new_status])
        if @bi.approved?
          InvitationMailer.join_new_member_to_bubble(@bi).deliver
        end
        head status: :ok
      else
        render 'api/v1/shared/failure', locals: {errors: @bi.errors }, status: :unprocessable_entity
      end
    else
      render 'api/v1/shared/failure', locals: {errors: [{user: ["hasn't access"]}] }, status: :unauthorized
    end
  end
end
