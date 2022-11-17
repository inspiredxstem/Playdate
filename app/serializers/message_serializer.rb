class MessageSerializer < ActiveModel::Serializer
  attributes :id, :msgbody, :read, :user_id, :conversation_id
  # , :current_user_profile_pic, :current_user_username
end
