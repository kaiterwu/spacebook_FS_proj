class Api::FriendshipsController < ApplicationController
    def create 
        @friendship = Friendship.new(friendship_params)
        if @friendship.save
            render json:{'Success'},status:200
        else
            render json: {errors:@friendship.errors.full_messages}, status:422
        end
    end 

    def destroy 
    end 

    def friendship_params
        params.require(:friendship).permit(:id,:user_id,:friend_id)
    end


end 