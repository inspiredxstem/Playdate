class Message < ApplicationRecord
    belongs_to :user
    belongs_to :conversation

    def current_user_profile_pic
        self.user.profile_pic
    end

    def current_user_username
        self.user.username
    end
end
