class AddAlbumIdToMedium < ActiveRecord::Migration
  def change
    add_column :media, :album_id, :integer
    add_index :media, :album_id
  end
end
