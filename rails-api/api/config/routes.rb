Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get 'api/public' => 'public#public'
  get 'api/private' => 'private#private'
  get 'api/private-scoped' => 'private#private_scoped'
end
