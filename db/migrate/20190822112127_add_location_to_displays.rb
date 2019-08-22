# frozen_string_literal: true

class AddLocationToDisplays < ActiveRecord::Migration[5.2]
  def change
    add_column :displays, :location, :string
  end
end
