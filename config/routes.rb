Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post "/users", to: "users#create"
  get "/me", to: "users#me"
  post "/auth/login", to: "auth#login"
end
