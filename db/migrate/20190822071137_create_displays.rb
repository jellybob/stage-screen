# frozen_string_literal: true

class CreateDisplays < ActiveRecord::Migration[5.2]
  def change
    create_table :displays do |t|
      t.string :display_id, null: false, length: 6
      t.datetime :last_seen_at
      t.timestamps
    end
  end
end
