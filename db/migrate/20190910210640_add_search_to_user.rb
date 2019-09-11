class AddSearchToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :search, :string
  end
end
