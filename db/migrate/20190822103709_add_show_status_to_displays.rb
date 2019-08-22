# frozen_string_literal: true

class AddShowStatusToDisplays < ActiveRecord::Migration[5.2]
  def change
    add_column :displays, :show_status, :boolean, default: true, allow_null: false
  end
end
