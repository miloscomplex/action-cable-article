Rails.application.routes.draw do
  resources :rooms, only: [:index, :create, :show]
  #ActionCable
  mount ActionCable.server => '/cable'
end
