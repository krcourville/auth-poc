# frozen_string_literal: true
module Secured
    extend ActiveSupport::Concern

    SCOPES = {
      '/api/private'    => nil,
      '/api/private-scoped' => ['access:private_scoped']
    }

    included do
      before_action :authenticate_request!
    end

    def initialize
      @jwt = JsonWebToken.new
    end

    private

    def authenticate_request!
      @auth_payload, @auth_header = auth_token

      print("@auth_payload=#{@auth_payload}\n\n")
      print("@auth_header=#{@auth_header}\n\n")

      render json: { errors: ['Insufficient scope'] }, status: :forbidden unless scope_included
    rescue JWT::VerificationError, JWT::DecodeError
      render json: { errors: ['Not Authenticated'] }, status: :unauthorized
    end

    def http_token
      if request.headers['Authorization'].present?
        request.headers['Authorization'].split(' ').last
      end
    end

    def auth_token
      @jwt.verify(http_token)
    end

    def scope_included
      # The intersection of the scopes included in the given JWT and the ones in the SCOPES hash needed to access
      # the PATH_INFO, should contain at least one element
      path_scope = SCOPES[request.env['PATH_INFO']]
      if path_scope == nil
        true
      else
        user_scope = String(@auth_payload['scope']).split(' ')
        intersect = user_scope & path_scope
        print("user_scope=#{user_scope}\n\n")
        print("path_scope=#{path_scope}\n\n")
        print("intersect=#{intersect}\n\n")

        intersect.any?
      end
    end
  end