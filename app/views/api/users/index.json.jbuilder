@users.each do |user|
    json.set! user.id do 
        json.extract! user,:id,:email,:birthday,:gender,:first_name,:last_name,:about_me
    end 
end 