class Message < ApplicationRecord
    belongs_to :user
    belongs_to :conversation

    def user_prof_pic
        self.user.profile_pic
    end

    def user_username
        self.user.username
    end
end
