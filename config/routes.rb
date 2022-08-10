Rails.application.routes.draw do
  root 'home#index'

  namespace 'api' do
    resources :card_sets
  end

  get '*path', to: 'home#index'
end
