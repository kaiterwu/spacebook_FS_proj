class Api::CommentsController < ApplicationController
    def create
        @comment = Comment.new(comment_params)
        if @comment.save
            render :show 
        else
            render json:{errors:@comment.errors.full_messages},status:422
        end 
    end 

    def show 
        @comment = Comment.find(params[:id])
        render :show 
    end 

    def index 
        @comments = Comment.all 
        render :index 
    end 

    def post_comments 
        @post = Post.find(params[:id])
        @comments = @post.comments 
        render :index 

    end 

    def update 
        @comment = Comment.find(params[:id])
        if @comment.update(comment_params)
            render:show 
        else 
            render json:{errors:@comment.errors.full_messages},status:422
        end
    end 

    def destroy 
        @comment = Comment.find(params[:id])
        @comment.destroy 
        head :no_content 
    end 

    private 

    def comment_params 
        params.require(:comment).permit(:id,:body,:user_id,:post_id)
    end 
end 