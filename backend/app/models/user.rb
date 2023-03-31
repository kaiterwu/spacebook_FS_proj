# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true

  before_validation :ensure_session_token

  def self.find_by_email(email,password)
      user = User.find_by(email:email)
    
    if user
      return user if user.authenticate(password)
    else 
      return nil 
    end 

    
  end 

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.update!({session_token: self.session_token})
    self.session_token
  end 

  private
  def generate_unique_session_token
    token = SecureRandom::urlsafe_base64 
        while User.exists?(session_token:token )
            token = SecureRandom::urlsafe_base64 
        end 
        token

  end 

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end 
end

