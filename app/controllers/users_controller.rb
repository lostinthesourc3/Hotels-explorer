class UsersController < ApplicationController
    def index
        users = User.all 
        render json: users
    end

    def new 
        user = User.new
    end

    def create 
        user = User.new(user_params)

        if user.save 
            render json: user
        else 
            render json: {message: 'invalid', errors: user.errors.full_messages}, status: 406
        end

    end

    private

    def user_params
        params.require(:user).permit(:name)
    end
end
