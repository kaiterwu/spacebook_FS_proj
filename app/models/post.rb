# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  user_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord
    validates :body,:user_id,presence: true 
    belongs_to :user
    has_many :comments, dependent: :destroy 
    has_many :likes, as: :likeable, dependent: :destroy
    

    has_one_attached :photo
end
