class CreateFriends < ActiveRecord::Migration[7.0]
  def change
    create_table :friends do |t|
      t.references :user,foreign_key:true,null:false,index:true 
      t.references :friend,index:true,null:false,foreign_key:{to_table: :users}
      t.timestamps
    end
    add_index :friends,[:user_id,:friend_id], unique: true 
  end
end
