class CreateMedia < ActiveRecord::Migration
  def change
    create_table :media do |t|
      t.references :bubble, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.string :title
      t.integer :kind
      t.string :attachment

      t.timestamps null: false
    end
  end
end
