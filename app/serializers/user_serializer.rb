class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :name, :age, :animal, :gender, :profile_pic, :get_conversations
end
