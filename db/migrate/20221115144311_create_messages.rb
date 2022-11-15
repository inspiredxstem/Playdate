class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.text :body
      t.integer :conversation_id
      t.integer :user_id
      t.boolean :read

      t.timestamps
    end
  end
end
