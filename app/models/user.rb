class User < ApplicationRecord
    has_secure_password
    has_many :chatrooms
    has_many :messages, through: :chatrooms

    validates :username, presence: true, uniqueness: true
    validates :profile_pic, presence: true

end
