class Album < ActiveRecord::Base
  belongs_to :bubble
  has_many :media, dependent: :destroy

  validates :name, presence: true

  default_scope { includes(:media) }
end
