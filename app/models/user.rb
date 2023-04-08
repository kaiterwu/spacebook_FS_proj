# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  birthday        :date             not null
#  gender          :string           not null
#  about_me        :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  validates :first_name,:last_name, length:{in: 1..255}
  #Instead of date  validation in backend, restrict drop down options on date? 
  validates :gender ,inclusion:{in: ['Male','Female','Custom'],message: ': please choose one of the provided options'}

  before_validation :ensure_session_token

  has_one_attached :avatar
  has_one_attached :cover

  has_many :posts

  def self.find_by_email(email,password)
    if URI::MailTo::EMAIL_REGEXP.match?(email)
      user = User.find_by(email:email)
    end 
    
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
