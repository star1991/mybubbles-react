class AddProfileFieldsToUser < ActiveRecord::Migration
  def change
    add_column :users, :first_name, :string
    add_column :users, :gender, :integer
    add_column :users, :zip_code, :string
    add_column :users, :phone, :string
    add_column :users, :birthday, :date
  end
end
