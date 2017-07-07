class CreateBubbles < ActiveRecord::Migration
  def change
    create_table :bubbles do |t|
      t.string :name
      t.integer :kind, null: false
      t.boolean :invitable

      t.timestamps null: false
    end
  end
end
