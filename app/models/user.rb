class User < ApplicationRecord
    has_secure_password
    has_many :convos_a, class_name: "Conversation", foreign_key: "user_a_id"
    has_many :user_bs, through: :convos_a, source: :user_b

    has_many :convos_b, class_name: "Conversation", foreign_key: "user_b_id"
    has_many :user_as, through: :convos_b, source: :user_a

    has_many :messages

    validates :username, presence: true, uniqueness: true
    validates :profile_pic, presence: true

end
