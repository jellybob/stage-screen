# frozen_string_literal: true

class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.string :headline
      t.text :body
      t.boolean :active, default: true

      t.timestamps
    end
  end
end
