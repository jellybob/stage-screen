class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :external_id
      t.string :source
      t.datetime :starts_at
      t.datetime :ends_at
      t.string :cost
      t.string :equipment
      t.string :slug
      t.string :venue
      t.string :title
      t.text :description
      t.string :type
      t.string :link
      t.string :map_link
      t.string :speaker
      t.string :age_range
      t.string :latitude
      t.string :longitude
      t.json :source_document

      t.timestamps
    end

    add_index :events, :external_id, unique: true
    add_index :events, :starts_at
    add_index :events, :ends_at
    add_index :events, :venue
  end
end
