class BubbleInvitation < ActiveRecord::Base
  enum status: [:pending, :approved, :declined]

  belongs_to :bubble
  belongs_to :moderator, class_name: 'User', foreign_key: :moderator_id
  belongs_to :new_member, class_name: 'User', foreign_key: :new_member_id

  validates :bubble_id, presence: true
  validates :new_member_id, presence: true
  validates :status, presence: true
  validates :token,
            presence: true,
            uniqueness: true

  after_initialize :ensure_token

  private
  def ensure_token
    self.token = loop do
      new_token = Devise.friendly_token
      break new_token unless BubbleInvitation.where(token: new_token).first
    end if self.token.blank?
  end
end
