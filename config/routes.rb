Rails.application.routes.draw do
  root 'home#index'

  post 'login', to: 'authentication#login'

  namespace 'api' do
    resources :affiliations, only: [:index]
    resources :cards, only: [:show]
    resources :card_sets, only: [:index, :show]
    resources :decks, only: [:show, :create, :update, :index]
    resources :search, only: [:create]
    resources :users, except: [:index]  # Avoid route showing all users

    #TODO - some kind of deck action based on search params

    namespace 'password' do
      post '/reset', to: 'password_resets#create'
      get '/reset/edit', to: 'password_resets#edit'
      patch '/reset/edit', to: 'password_resets#update'
    end
  end

  get '*path', to: 'home#index'
end
