# frozen_string_literal: true

class AddNameToDisplays < ActiveRecord::Migration[5.2]
  def change
    add_column :displays, :name, :string
  end
end
