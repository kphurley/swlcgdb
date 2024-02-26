Rails.application.routes.draw do
  get 'password_resets/new'
  get 'password_resets/create'
  get 'password_resets/edit'
  get 'password_resets/update'
  root 'home#index'

  post 'login', to: 'authentication#login'

  namespace 'api' do
    resources :cards, only: [:show]
    resources :card_sets, only: [:index, :show]
    resources :decks, only: [:show]  # TODO - some kind of index based on search params 
    resources :search, only: [:create]
    resources :users, except: [:index]  # Avoid route showing all users

    namespace 'password' do
      post '/reset', to: 'password_resets#create'
      get '/reset/edit', to: 'password_resets#edit'
      patch '/reset/edit', to: 'password_resets#update'
    end
  end

  get '*path', to: 'home#index'
end
