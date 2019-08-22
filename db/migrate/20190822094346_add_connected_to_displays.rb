# frozen_string_literal: true

class AddConnectedToDisplays < ActiveRecord::Migration[5.2]
  def change
    add_column :displays, :connected, :boolean, default: false, allow_null: false
  end
end
