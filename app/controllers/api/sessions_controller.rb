class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destroy];
  before_action :require_logged_out, only: [:create];

  def show
    
    if current_user 
      @user = current_user
      render 'api/users/show'
    else 
      render json: {user: nil}
    end 
  end

  def create
    @user = User.find_by_email(params[:email],
      params[:password])

    if @user 
      login!(@user)
      render 'api/users/show'
    else 
      render json: { errors: ['The provided credentials were invalid.']},status: :unauthorized
    end 
  end

  def destroy
    if current_user 
      logout!
      render json: {message: 'success'}
    end 
  end
end
