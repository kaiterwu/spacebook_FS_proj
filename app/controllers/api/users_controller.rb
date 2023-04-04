class Api::UsersController < ApplicationController
  before_action :require_logged_out, only:[:create]
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)
    # byebug
    if @user.save 
      login!(@user)
      render :show
    else  
      render json: { errors:@user.errors.full_messages}, status:422 
    end 
  end

  def show 
    @user = User.find(params[:id])
    render :show
  end 

  def index
    @users = User.all 
    render :index 
  end 

  private

  def user_params
    params.require(:user).permit(:first_name,:last_name,:email,:password,:gender,:birthday,:about_me)
  end

end


