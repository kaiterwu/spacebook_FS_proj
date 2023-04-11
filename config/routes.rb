Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create,:show,:index,:update]
    resources :posts, only: [:create,:show,:index,:update,:destroy]
    resources :friendships, only:[:create]
    resources :comments, only:[:create,:index,:show,:update,:destroy]
    resource :session, only: [:show, :create, :destroy]

    get '/user-posts/:id', to: 'posts#user_posts', as: 'post_entries'
    get '/user-friends/:id', to: 'users#user_friends', as: 'user_friends'
    delete '/delete-friends/', to: 'friendships#destroy', as: 'destroy_friends'
  end

  post 'api/test', to: 'application#test'
  get '*path', to: "static_pages#frontend_index"
end
