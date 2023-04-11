class Api::FriendshipsController < ApplicationController
    def create 
        @friendship = Friendship.new(friendship_params)
        if @friendship.save
            @user = User.find_by(id: @friendship.user_id)
            @users = @user.friends 
            render '/api/users/index'
            # render json:{'Success'},status:200
        else
            render json: {errors:@friendship.errors.full_messages}, status:422
        end
    end 

    def destroy 
        @user = User.find_by(id:friendship_params[:user_id])
        @friendship_to_destroy = @user.friendships.where(friend_id: friendship_params[:friend_id])[0]
        # @friendship = Friendship.find(params[:id])
        if @friendship_to_destroy.destroy
            @users = @user.friends 
            render 'api/users/index'
        else 
            render json: {errors:@friendship.errors.full_messages}, status:422
        end 
       
    end 

    def friendship_params
        params.require(:friendship).permit(:id,:user_id,:friend_id)
    end


end 