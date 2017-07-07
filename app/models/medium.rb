class Medium < ActiveRecord::Base
  enum kind: [ :image, :video ]
  mount_uploader :attachment, MediumUploader

  belongs_to :bubble
  belongs_to :uploader, class_name: "User", foreign_key: :user_id
  belongs_to :album

  validates :bubble_id,
            presence: true,
            numericality: { only_integer: true }
  validates :user_id,
            presence: true,
            numericality: { only_integer: true }
  validates :attachment, presence: true
  validates :kind, presence: true

  def add_encoded_attachment(encoded_string, file_name='')
    description, encoded_bytes = encoded_string.split(',')
    return false unless encoded_bytes

    file_type, file_format = parse_attachment_description(description)
    # rm file extension if filename includes it
    file_name.sub!(/\.#{file_format}\z/i, '')
    bytes = Base64.decode64(encoded_bytes)
    # ensure file_name
    file_name = "temp-#{Time.now.to_f}" if file_name.blank?
    tempfile = "#{Rails.root}/tmp/#{file_name}.#{file_format}"
    # save temp file
    File.open(tempfile, 'wb') do |f|
      f.write(bytes)
    end
    # save curriervawe attachment for temp file
    File.open(tempfile) do |f|
      self.attachment = f
    end
    # delete temp file
    File.delete(tempfile)
    # set attachment kind (type)
    self.kind = file_type.to_sym
    self.attachment.present?
  end

  private

  def parse_attachment_description(description)
    regex = /\Adata:(\w+)\/(\w+);base64\z/
    [regex.match(description).try(:[], 1), regex.match(description).try(:[], 2)]
  end


end
