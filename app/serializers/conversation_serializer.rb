class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :user_a_id, :user_b_id

  belongs_to :user_a
  belongs_to :user_b
  has_many :messages
end
