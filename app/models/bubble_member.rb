class BubbleMember < ActiveRecord::Base
  enum user_role: [:owner, :moderator, :guest]

  belongs_to :member, class_name: "User", foreign_key: :user_id
  belongs_to :bubble

  validates :bubble_id, presence: true
  validates :user_id, presence: true
  validates :user_role, presence: true
  validates :radius,
            presence: true,
            numericality: { only_integer: true, greater_than_or_equal_to: 1 }

  validates :bubble_id, uniqueness: { scope: :user_id }
end
