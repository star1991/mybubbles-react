class CreateBubbleInvitations < ActiveRecord::Migration
  def change
    create_table :bubble_invitations do |t|
      t.references :bubble, index: true, foreign_key: true
      t.integer :new_member_id
      t.integer :moderator_id
      t.string :token
      t.integer :status

      t.timestamps null: false
    end
  end
end
