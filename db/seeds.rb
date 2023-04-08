# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
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
      first_name: 'Test',
      last_name: 'Wong',
      birthday: Date.parse('01-01-2001'),
      gender: 'Male',
      about_me:Faker::JapaneseMedia::StudioGhibli.quote+ "\n" + Faker::JapaneseMedia::StudioGhibli.quote

      
    )
  
    # More users
    10.times do 
      name = Faker::Space.unique()
      User.create!({
        email: Faker::Internet.unique.email(name:name),
        password: 'password',
        first_name: Faker::Name.first_name,
        last_name:Faker::Space.planet,
        birthday:Date.today-rand(4745..36500),
        gender: ['Male','Female','Custom'].sample,
        about_me: Faker::Quote.fortune_cookie + Faker::Quote.fortune_cookie
      }) 
    end

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

    
  
    puts "Done!"
  end