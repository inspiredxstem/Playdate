class User < ApplicationRecord
    has_secure_password
    has_many :convos_a, class_name: "Conversation", foreign_key: "user_a_id"
    has_many :user_bs, through: :convos_a, source: :user_b

    has_many :convos_b, class_name: "Conversation", foreign_key: "user_b_id"
    has_many :user_as, through: :convos_b, source: :user_a

    has_many :messages

    validates :username, presence: true, uniqueness: true
    validates :profile_pic, presence: true

    def self.all_except(user)
        where.not(id: user)
    end

    def get_conversations
        conversations = []

        self.convos_a.each do |convo|
            info = {
                convo: convo,
                user_a_username: User.find(convo.user_a_id).username,
                user_b_username: User.find(convo.user_b_id).username,
                unread_messages: convo.messages.where(read: 0)
            }
            conversations << info
        end
        
        self.convos_b.each do |convo|
            info = {
                convo: convo,
                user_a_username: User.find(convo.user_a_id).username,
                user_b_username: User.find(convo.user_b_id).username
            }
            conversations << info
        end

        conversations
    end
end
