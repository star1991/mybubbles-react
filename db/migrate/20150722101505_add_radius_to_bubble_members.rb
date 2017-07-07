class AddRadiusToBubbleMembers < ActiveRecord::Migration
  def change
    add_column :bubble_members, :radius, :integer
  end
end
