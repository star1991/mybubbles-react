class Bubble < ActiveRecord::Base
  enum kind: [:global, :common, :privy]

  has_many :bubble_members, dependent: :destroy
  has_many :members, through: :bubble_members
  has_many :bubble_invitations, dependent: :destroy
  has_many :media, dependent: :destroy
  has_many :albums, dependent: :destroy

  validates :name,
            presence: true,
            uniqueness: true
  validates :kind, presence: true

  def owner
    self.members.joins(:bubble_members).where("bubble_members.user_role = #{BubbleMember.user_roles[:owner]}").first
  end

  def substantive_media
    self.media.where(album_id: nil)
  end
end
