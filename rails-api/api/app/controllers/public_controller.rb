# frozen_string_literal: true
class PublicController < ActionController::API
    # this route doesn't need authorization
    def public
        render json: {
            message: "Hello from a public endpoint! You don't need to be authenticated to see this."
        }
    end
end