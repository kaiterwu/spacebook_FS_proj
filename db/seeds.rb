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
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      email: 'test@test.com', 
      password: 'password',
      first_name: 'test',
      last_name: 'me',
      birthday: Date.parse('01-01-2001'),
      gender: 'male'

      
    )
  
    # More users
    10.times do 
      name = Faker::Space.uniqueq
      User.create!({
        email: Faker::Internet.unique.email(name:name),
        password: 'password',
        first_name:name,
        last_name:'planet',
        birthday:Date.today-rand(4745..36500),
        gender: ['male','female','other'].sample
      }) 
    end
  
    puts "Done!"
  end