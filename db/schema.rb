# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_22_115438) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "contents", force: :cascade do |t|
    t.string "content_type"
    t.string "url"
    t.string "contributed_by"
    t.string "tags", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "displays", force: :cascade do |t|
    t.string "display_id", null: false
    t.datetime "last_seen_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.boolean "connected", default: false
    t.string "view_mode", default: "setup"
    t.boolean "show_status", default: true
    t.string "location"
  end

end
