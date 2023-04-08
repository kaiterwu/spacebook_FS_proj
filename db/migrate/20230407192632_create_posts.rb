class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.text :body,null:false 
      t.references :user, foreign_key: true, null:false, index:true
      t.timestamps
    end
  end
end
