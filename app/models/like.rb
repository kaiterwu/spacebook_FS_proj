# == Schema Information
#
# Table name: likes
#
#  id            :bigint           not null, primary key
#  user_id       :bigint           not null
#  likeable_type :string           not null
#  likeable_id   :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Like < ApplicationRecord
    validates :user_id,:likeable_type,:likeable_id,presence: true 
    belongs_to :likeable, :polymorphic => true 
end
