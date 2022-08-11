Rails.application.routes.draw do
  root 'home#index'

  namespace 'api' do
    resources :cards, only: [:show]
    resources :card_sets, only: [:index, :show]
  end

  get '*path', to: 'home#index'
end
