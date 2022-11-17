class ConversationChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    puts "We are entering the subscribed"

    conversation = Conversation.find(params[:id])
    stream_for conversation
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
