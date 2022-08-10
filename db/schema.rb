# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_08_10_020758) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "card_blocks", force: :cascade do |t|
    t.bigint "card_set_id"
    t.integer "block"
    t.string "name"
    t.string "affiliation"
    t.string "side"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["card_set_id"], name: "index_card_blocks_on_card_set_id"
  end

  create_table "card_sets", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_custom", default: false
    t.integer "release_order"
  end

  create_table "cards", force: :cascade do |t|
    t.bigint "card_block_id"
    t.string "name"
    t.integer "cost"
    t.string "card_type"
    t.integer "force"
    t.string "combat_icons"
    t.string "traits"
    t.integer "damage_capacity"
    t.integer "resources"
    t.integer "edge_priority"
    t.text "text"
    t.text "flavor"
    t.string "side"
    t.string "affiliation"
    t.integer "block"
    t.integer "block_number"
    t.integer "number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["card_block_id"], name: "index_cards_on_card_block_id"
    t.index ["name"], name: "index_cards_on_name"
  end

  add_foreign_key "card_blocks", "card_sets"
  add_foreign_key "cards", "card_blocks"
end
