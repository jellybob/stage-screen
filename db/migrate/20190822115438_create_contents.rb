# frozen_string_literal: true

class CreateContents < ActiveRecord::Migration[5.2]
  def change
    create_table :contents do |t|
      t.string :content_type, allow_null: false
      t.string :url, allow_null: false
      t.string :contributed_by, allow_null: false
      t.string :tags, array: true, default: []

      t.timestamps
    end
  end
end
