# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150805093308) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "albums", force: :cascade do |t|
    t.integer  "bubble_id"
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "albums", ["bubble_id"], name: "index_albums_on_bubble_id", using: :btree

  create_table "api_keys", force: :cascade do |t|
    t.string   "access_token", null: false
    t.integer  "user_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "bubble_interests", force: :cascade do |t|
    t.integer  "bubble_id"
    t.integer  "interest_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "bubble_interests", ["bubble_id"], name: "index_bubble_interests_on_bubble_id", using: :btree
  add_index "bubble_interests", ["interest_id"], name: "index_bubble_interests_on_interest_id", using: :btree

  create_table "bubble_invitations", force: :cascade do |t|
    t.integer  "bubble_id"
    t.integer  "new_member_id"
    t.integer  "moderator_id"
    t.string   "token"
    t.integer  "status"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "bubble_invitations", ["bubble_id"], name: "index_bubble_invitations_on_bubble_id", using: :btree

  create_table "bubble_members", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "bubble_id"
    t.integer  "user_role",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "radius"
  end

  add_index "bubble_members", ["bubble_id"], name: "index_bubble_members_on_bubble_id", using: :btree
  add_index "bubble_members", ["user_id"], name: "index_bubble_members_on_user_id", using: :btree

  create_table "bubbles", force: :cascade do |t|
    t.string   "name"
    t.integer  "kind",       null: false
    t.boolean  "invitable"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "identities", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "provider"
    t.string   "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "identities", ["user_id"], name: "index_identities_on_user_id", using: :btree

  create_table "interests", force: :cascade do |t|
    t.string   "name"
    t.string   "display_as"
    t.integer  "counter",    default: 0, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "interests", ["name"], name: "index_interests_on_name", using: :btree

  create_table "media", force: :cascade do |t|
    t.integer  "bubble_id"
    t.integer  "user_id"
    t.string   "title"
    t.integer  "kind"
    t.string   "attachment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "album_id"
  end

  add_index "media", ["album_id"], name: "index_media_on_album_id", using: :btree
  add_index "media", ["bubble_id"], name: "index_media_on_bubble_id", using: :btree
  add_index "media", ["user_id"], name: "index_media_on_user_id", using: :btree

  create_table "user_interests", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "interest_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "user_interests", ["interest_id"], name: "index_user_interests_on_interest_id", using: :btree
  add_index "user_interests", ["user_id"], name: "index_user_interests_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "username"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "first_name"
    t.integer  "gender"
    t.string   "zip_code"
    t.string   "phone"
    t.date     "birthday"
    t.string   "avatar"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "albums", "bubbles"
  add_foreign_key "bubble_interests", "bubbles"
  add_foreign_key "bubble_interests", "interests"
  add_foreign_key "bubble_invitations", "bubbles"
  add_foreign_key "bubble_members", "bubbles"
  add_foreign_key "bubble_members", "users"
  add_foreign_key "identities", "users"
  add_foreign_key "media", "bubbles"
  add_foreign_key "media", "users"
  add_foreign_key "user_interests", "interests"
  add_foreign_key "user_interests", "users"
end
