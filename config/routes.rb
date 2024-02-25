Rails.application.routes.draw do
  root 'home#index'

  post 'login', to: 'authentication#login'

  namespace 'api' do
    resources :cards, only: [:show]
    resources :card_sets, only: [:index, :show]
    resources :decks, only: [:show]  # TODO - some kind of index based on search params 
    resources :search, only: [:create]
    resources :users, except: [:index]  # Avoid route showing all users
  end

  get '*path', to: 'home#index'
end
