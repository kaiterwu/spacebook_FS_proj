json.user do
    json.extract! @user, :id, :email, :first_name,:last_name,:birthday,:gender,:about_me, :created_at, :updated_at
  end
