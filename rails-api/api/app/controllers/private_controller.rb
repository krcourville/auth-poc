# frozen_string_literal: true
class PrivateController < ActionController::API
    include Secured

    def private
      render json: { message: 'Hello from a private endpoint! You need to be authenticated to see this.' }
    end

    def private_scoped
      render json: { message: 'Hello from a private scope-endpoint! You need to be authenticated and have a scope of `access:private_scoped` to see this.' }
    end

    def private_permissionbased
      render json: { message: 'Hello from a private, permissioned-based endpoint!  You need to be authenticated and have a permission of `access:private_permissionbased` to see this.'}
    end
  end