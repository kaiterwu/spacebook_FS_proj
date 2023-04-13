class Api::LikesController < ApplicationController

    def create 
        @like = Like.new(like_params)
        if @like.save
            render :show
        else 
            render json: {errors:@like.errors.full_messages}, status:422
        end 
    end 

    def show 
        @like = Like.find(params[:id])
        render :show 
    end 

    def index 
        @likes = Like.all
        render :index 
    end 

    def destroy 
        @like = Like.find(params[:id])
        @like.destroy
        head :no_content 
    end 

    private
    def like_params
        params.require(:like).permit(:id,:user_id,:likeable_type,:likeable_id)
    end 
end 