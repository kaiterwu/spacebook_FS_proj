# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
    require "open-uri"

    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    puts "Creating posts..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      email: 'test@test.com', 
      password: 'password',
      first_name: 'Kai',
      last_name: 'Wu',
      birthday: Date.parse('01-01-2001'),
      gender: 'Male',
      about_me:Faker::JapaneseMedia::StudioGhibli.quote+ "\n" + Faker::JapaneseMedia::StudioGhibli.quote
    )

    User.create!(
      email: 'test1@test.com',
      password: 'password',
      first_name: 'Mercurial',
      last_name: 'Mia',
      birthday:Date.today-rand(4745..36500),
      gender:'Female',
      about_me:Faker::JapaneseMedia::StudioGhibli.quote+ "\n" + Faker::JapaneseMedia::StudioGhibli.quote
    )

    User.create!(
      email: 'test2@test.com',
      password: 'password',
      first_name: 'Venus',
      last_name: 'Gali',
      birthday:Date.today-rand(4745..36500),
      gender:'Female',
      about_me:Faker::JapaneseMedia::StudioGhibli.quote+ "\n" + Faker::JapaneseMedia::StudioGhibli.quote
    )

    User.create!(
      email: 'test3@test.com',
      password: 'password',
      first_name: 'Terra',
      last_name: 'Stone',
      birthday:Date.today-rand(4745..36500),
      gender:'Male',
      about_me:Faker::JapaneseMedia::StudioGhibli.quote+ "\n" + Faker::JapaneseMedia::StudioGhibli.quote
    )

    User.create!(
      email: 'test4@test.com',
      password: 'password',
      first_name: 'Mara',
      last_name: 'Rouge',
      birthday:Date.today-rand(4745..36500),
      gender:'Custom',
      about_me: Faker::Quote.fortune_cookie + Faker::Quote.fortune_cookie
    )

    User.create!(
      email: 'test5@test.com',
      password: 'password',
      first_name: 'Jupiter',
      last_name: 'Zephyr',
      birthday:Date.today-rand(4745..36500),
      gender:'Custom',
      about_me: Faker::Quote.fortune_cookie + Faker::Quote.fortune_cookie
    )

    User.create!(
      email: 'test6@test.com',
      password: 'password',
      first_name: 'Saturni',
      last_name: 'Gala',
      birthday:Date.today-rand(4745..36500),
      gender:'Male',
      about_me:Faker::JapaneseMedia::StudioGhibli.quote+ "\n" + Faker::JapaneseMedia::StudioGhibli.quote
    )

    User.create!(
      email: 'test7@test.com',
      password: 'password',
      first_name: 'Urus',
      last_name: 'Nara',
      birthday:Date.today-rand(4745..36500),
      gender:'Female',
      about_me:Faker::JapaneseMedia::StudioGhibli.quote+ "\n" + Faker::JapaneseMedia::StudioGhibli.quote
    )

    User.create!(
      email: 'test8@test.com',
      password: 'password',
      first_name: 'Neppy',
      last_name: 'Tune',
      birthday:Date.today-rand(4745..36500),
      gender:'Male',
      about_me: Faker::Quote.fortune_cookie + Faker::Quote.fortune_cookie
    )

    User.create!(
      email:'test9@test.com',
      password:'password',
      first_name: 'Plu',
      last_name: 'Do',
      birthday:Date.today-rand(4745..36500),
      gender:'Male',
      about_me: Faker::Quote.fortune_cookie + Faker::Quote.fortune_cookie
    )

    User.first(10).each_with_index do |user,i|
      user.avatar.attach(
        io:URI.open("https://spacebook23-seeds.s3.amazonaws.com/avatar_pictures/avatar_#{i+1}.jpg"),
        filename: "avatar_#{i+1}.jpg"
      )
    end

    User.first(10).each_with_index do |user,i|
      user.cover.attach(
        io:URI.open("https://spacebook23-seeds.s3.amazonaws.com/cover_pictures+/cover_#{i+1}.jpg"),
        filename: "cover_#{i+1}.jpg"
      )
    end


    
    
    # 10.times do 
    #   name = Faker::Space.unique()
    #   User.create!({
    #     email: Faker::Internet.unique.email(name:name),
    #     password: 'password',
    #     first_name: Faker::Name.first_name,
    #     last_name:Faker::Space.planet,
    #     birthday:Date.today-rand(4745..36500),
    #     gender: ['Male','Female','Custom'].sample,
    #     about_me: Faker::Quote.fortune_cookie + Faker::Quote.fortune_cookie
    #   }) 
    # end

    10.times do 
      Post.create!({
        body:Faker::JapaneseMedia::OnePiece.unique.quote,
        user_id: 1
      })
    end

    10.times do 
      Post.create!({
      body: Faker::Movies::LordOfTheRings.unique.quote,
      user_id: rand(2..10)
      })
    end 

    10.times do 
      Post.create!({
      body: Faker::Quote.fortune_cookie,
      user_id: rand(2..10)
      })
    end 

    10.times do 
      Post.create!({
      body: Faker::Quote.unique.famous_last_words,
      user_id: rand(2..10)
      })
    end 

    Post.all.each_with_index do |post,i|
      post.photo.attach(
        io:URI.open("https://spacebook23-seeds.s3.amazonaws.com/random_pics/rand_#{i+1}.jpg"),
        filename: "rand_#{i}"
      )
    end 

    
  
    puts "Done!"
