Rails.application.routes.draw do
  root 'home#index'

  get 'me', to: 'authentication#me'
  post 'login', to: 'authentication#login'
  delete 'logout', to: 'authentication#logout'

  namespace 'api' do
    get 'decks/mine', to: 'decks#my_decks'
    get 'decks/byFaction/mostRecent', to: 'decks#most_recent_decks_by_faction'

    resources :affiliations, only: [:index]
    resources :cards, only: [:show]
    resources :card_blocks, only: [:show]
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
