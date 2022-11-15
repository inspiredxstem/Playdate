class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :name
      t.string :bio
      t.integer :age
      t.string :animal
      t.string :gender
      t.string :profile_pic

      t.timestamps
    end
  end
end
