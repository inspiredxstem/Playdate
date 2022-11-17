class CreateMessages < ActiveRecord::Migration[7.0]

  def change
    create_table :messages do |t|
      t.text :msgbody
      t.integer :conversation_id
      t.integer :user_id
      t.integer :read

      t.timestamps
    end
  end
end
