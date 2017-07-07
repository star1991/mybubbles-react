class Interest < ActiveRecord::Base

  has_many :user_interests, dependent: :destroy
  has_many :users, through: :user_interests
  has_many :bubble_interests, dependent: :destroy
  has_many :bubbles, through: :bubble_interests

  validates :name, uniqueness: true

end
