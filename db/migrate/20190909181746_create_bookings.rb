class CreateBookings < ActiveRecord::Migration[5.2]
  def change
    create_table :bookings do |t|
      t.string :name
      t.string :hotelName
      t.string :address
      t.datetime :check_in
      t.datetime :check_out
      t.string :comment
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
