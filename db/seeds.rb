# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


user1 = User.create(username: "steven1", password: "helloworld", name: "Steven", bio: "Woof. I am dog.", age:
9, animal: "Dog", gender: "Male", profile_pic: "https://s36700.pcdn.co/wp-content/uploads/2019/11/Golden-Puppy_get
ty82781924-399x600.png")

user2 = User.create(username: "scout1", password: "helloworld", name: "Scout", bio: "Bark. I am a good dog.", age:
6, animal: "Dog", gender: "Female", profile_pic: "https://s36700.pcdn.co/wp-content/uploads/2015/05/shutterstock_219143260-600x400.jpg.optimal.jpg")