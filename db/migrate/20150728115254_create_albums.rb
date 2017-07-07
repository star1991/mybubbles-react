class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.references :bubble, index: true, foreign_key: true
      t.string :name

      t.timestamps null: false
    end
  end
end
