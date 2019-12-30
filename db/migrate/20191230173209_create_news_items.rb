class CreateNewsItems < ActiveRecord::Migration[6.0]
  def change
    create_table :news_items do |t|
      t.string :headline
      t.text :body
      t.datetime :visible_from
      t.datetime :visible_until
      t.boolean :approved

      t.timestamps
    end
  end
end
