# == Schema Information
#
# Table name: friendships
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  friend_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Friendship < ApplicationRecord
    validates :user_id,:friend_id,presence: true 
    validates_uniqueness_of :user_id, :scope => [:friend_id]
    validate :cannot_add_self
    belongs_to :user 
    belongs_to :friend, class_name: 'User'

    def cannot_add_self
        errors.add(:friend_id, 'You cannot add yourself as a friend.') if user_id == friend_id
    end 


end
