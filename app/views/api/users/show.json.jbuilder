json.user do
    json.extract! @user, :id, :email, :first_name,:last_name,:birthday,:gender,:about_me, :created_at, :updated_at
    json.avatar @user.avatar.attached? ? @user.avatar.url : nil
    json.cover @user.cover.attached? ? @user.cover.url : nil
    json.friends do
      json.array! @user.friends.ids
    end
  end
