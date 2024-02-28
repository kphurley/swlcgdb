Rails.application.routes.draw do
  root 'home#index'

  post 'login', to: 'authentication#login'

  namespace 'api' do
    resources :cards, only: [:show]
    resources :card_sets, only: [:index, :show]
    resources :decks, only: [:show, :create, :update]  # TODO - some kind of index action based on search params
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
