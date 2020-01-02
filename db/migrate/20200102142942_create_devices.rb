class CreateDevices < ActiveRecord::Migration[6.0]
  def change
    create_table :devices do |t|
      t.string :setup_key
      t.string :name
      t.string :location
      t.string :view

      t.timestamps
    end

    add_index :devices, :setup_key, unique: true
  end
end
