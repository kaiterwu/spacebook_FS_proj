class Api::PostsController < ApplicationController

    def create 
        @post = Post.new(post_params)
        if @post.save
            render :show 
        else  
            render json: {errors:@post.errors.full_messages}, status:422
        end 
    end 

    def show 
        @post = Post.find(params[:id])
        render :show
    end 

    def index 
        @posts = Post.all 
        render :index 
    end 

    def update 
        @post = Post.find(params[:id])
        if @post.update(post_params)
            render :show 
        else 
            render json: {errors:@post.errors.full_messages}, status:422
        end 
    end 

    def user_posts 
        @user = User.find(params[:id])
        @posts = @user.posts 
        render :index

    end 

    def destroy
        @post = Post.find(params[:id])
        @post.destroy
        head :no_content # return header only
    end

    private

    def post_params
        params.require(:post).permit(:id,:body,:user_id,:photo)
    end
end
