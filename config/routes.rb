Rails.application.routes.draw do
  post "/login", to: "users#login"
  get "/me", to: "users#me"
  post "/users", to: "users#create"
  get "/users", to: "users#index"

  # resources :users
  resources :messages, only: [:create, :update]
  resources :conversations, only: [:index, :show, :create]

  mount ActionCable.server => '/cable'
end
