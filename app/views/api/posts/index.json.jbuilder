@posts.each do |post|
    json.set! post.id do
        json.extract! post,:id,:user_id,:body
        json.photo post.photo.attached? ? post.photo.url : nil 
    end
end 