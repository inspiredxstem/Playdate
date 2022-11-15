class ApplicationController < ActionController::API
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    before_action :authorize

    # takes payload as argument, in this case: the user.id
    def encode_token(payload)
        JWT.encode(payload, 'mySecret')
    end

    def decoded_token
        header = request.headers['Authorization']
        if header
            token = header.split(" ")[1]
            begin
                JWT.decode(token, 'mySecret', true, algorithm: 'HS256')
            rescue JWT::DecodeError
                nil
            end
        end
    end

    def current_user
        if decoded_token
            user_id = decoded_token[0]['user_id']
            @user = User.find_by(id: user_id)
        end
    end
    

    def authorize 
        render json: { error: 'Please log in' } , status: :unauthorized unless !!current_user
    end

    private

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found(invalid)
        render json: { error: "#{invalid.model} not found"}, status: :not_found
    end
end
