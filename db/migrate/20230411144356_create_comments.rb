class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.references :user,foreign_key:true,null:false,index:true 
      t.references :post,foreign_key:true,null:false,index:true
      t.text :body,null:false 
      t.timestamps
    end
  end
end
