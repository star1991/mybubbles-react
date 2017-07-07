class InvitationMailer < ApplicationMailer

  def join_new_member_to_bubble(bubble_invitation)
    @bubble_invitation = bubble_invitation
    mail(to: @bubble_invitation.new_member, subject: "Invite")
  end
end
