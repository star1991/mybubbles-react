class User < ActiveRecord::Base
  enum gender: [ :male, :female ]

  # mount_uploader :avatar, AvatarUploader
  mount_base64_uploader :avatar, AvatarUploader
  attr_accessor :agree_to_terms

  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  # :registerable, :rememberable
  devise :database_authenticatable, :recoverable, :trackable, :validatable, :confirmable

  has_one :api_key, dependent: :destroy
  has_many :identities, dependent: :destroy
  has_many :bubble_members, dependent: :destroy
  has_many :bubbles, through: :bubble_members
  has_many :media, dependent: :destroy
  has_many :user_interests, dependent: :destroy
  has_many :interests, through: :user_interests

  after_create :reset_access_token!

  # on save validations
  validates :first_name, presence: true
  validates :avatar, presence: true
  validates :agree_to_terms, acceptance: true
  # only on create validations
  validates :agree_to_terms, presence: true, on: :create
  validates :password_confirmation, presence: true, on: :create
  # only on update validations
  validates :gender, presence: true, on: :update
  validates :zip_code, presence: true, on: :update
  validates :birthday, presence: true, on: :update
  validates :username, on: :update,     # “USERNAME” is not username anymore, its PROFILE URL (example mybubblz.com/dimiisthebest)
            presence: true,
            uniqueness: true

  def my_bubbles
    Bubble.joins(:bubble_members).where('bubble_members.user_role' => BubbleMember.user_roles[:owner], 'bubble_members.user_id' => self.id)
  end

  def reset_access_token!
    token = loop do
      new_token = "#{self.id}:#{Devise.friendly_token}"
      break new_token unless ApiKey.where(access_token: new_token).first
    end

    self.create_api_key(access_token: token)
  end

  def is_owner_of?(bubble)
    bubble.bubble_members.where('bubble_members.user_role' => BubbleMember.user_roles[:owner], 'bubble_members.user_id' => self.id).first.present?
  end

  def is_moderator_of?(bubble)
    bubble.bubble_members.where('bubble_members.user_role' => BubbleMember.user_roles[:moderator], 'bubble_members.user_id' => self.id).first.present?
  end

  def can_manage?(bubble)
    self.is_owner_of?(bubble) or self.is_moderator_of?(bubble)
  end

  def is_member_of?(bubble)
    bubble.bubble_members.where('bubble_members.user_id' => self.id).first.present?
  end

end
