Rails.application.routes.draw do
  root 'home#index'

  namespace 'api' do
    resources :card_sets, only: [:index, :show]
  end

  get '*path', to: 'home#index'
end
