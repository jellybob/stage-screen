# frozen_string_literal: true

class AddViewModeToDisplays < ActiveRecord::Migration[5.2]
  def change
    add_column :displays, :view_mode, :string, default: "setup", allow_null: false
  end
end
