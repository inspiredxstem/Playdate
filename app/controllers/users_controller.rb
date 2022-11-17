class UsersController < ApplicationController
    before_action :authorize, only:[:me]
    # Will remove :index and :me skips later, just for testing
    
    def index
        users = User.all_except(current_user)
        render json: users
        # Going to add pet_params to this later
    end
    
    def create
        user = User.create!(user_params)
        @token = encode_token(user_id: user.id)
        render json: {user: UserSerializer.new(user), token: @token}, status: :created
    end

    def login
        @user = User.find_by!(username: login_params[:username])
        if @user&.authenticate(login_params[:password])
            @token = encode_token(user_id: @user.id)
            render json: { user: UserSerializer.new(@user), token: @token}, status: :accepted
        else
            render json: { error: "Incorrect password" }, status: :unauthorized
        end
    end

    def me
        # @user = User.find_by!()
        render json: current_user, status: :ok
    end


    private

    def user_params
        params.permit(:username, :password, :bio, :name, :age, :animal, :gender, :profile_pic)
    end

    def login_params
        params.permit(:username, :password)
    end

    def pet_params
        params.permit(:bio, :name, :age, :animal, :gender, :profile_pic)
    end

end
