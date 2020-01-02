# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_01_02_142942) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "devices", force: :cascade do |t|
    t.string "setup_key"
    t.string "name"
    t.string "location"
    t.string "view"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["setup_key"], name: "index_devices_on_setup_key", unique: true
  end

  create_table "events", force: :cascade do |t|
    t.string "external_id"
    t.string "source"
    t.datetime "starts_at"
    t.datetime "ends_at"
    t.string "cost"
    t.string "equipment"
    t.string "slug"
    t.string "venue"
    t.string "title"
    t.text "description"
    t.string "type"
    t.string "link"
    t.string "map_link"
    t.string "speaker"
    t.string "age_range"
    t.string "latitude"
    t.string "longitude"
    t.json "source_document"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["ends_at"], name: "index_events_on_ends_at"
    t.index ["external_id"], name: "index_events_on_external_id", unique: true
    t.index ["starts_at"], name: "index_events_on_starts_at"
    t.index ["venue"], name: "index_events_on_venue"
  end

  create_table "news_items", force: :cascade do |t|
    t.string "headline"
    t.text "body"
    t.datetime "visible_from"
    t.datetime "visible_until"
    t.boolean "approved"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
