@users.each do |user|
    json.set! user.id do 
        json.extract! user,:id,:email,:birthday,:gender,:first_name,:last_name,:about_me
        json.avatar user.avatar.attached? ? user.avatar.url : nil
        json.cover user.cover.attached? ? user.cover.url : nil
    end 
end 