class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.references :user,foreign_key:true,null:false,index:{unique:true}
      t.references :likeable, polymorphic: true, null: false,index:true
      t.timestamps
    end
  end
end
