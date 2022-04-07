# frozen_string_literal: true
require 'net/http'
require 'uri'

class JsonWebToken
  def verify(token)
    JWT.decode(token, nil,
               true, # Verify the signature of this token
               algorithm: 'RS256',
               iss: "https://#{domain}/",
               verify_iss: true,
               aud: audience,
               verify_aud: true) do |header|
      jwks_hash[header['kid']]
    end
  end

  def jwks_hash
    jwks_raw = Net::HTTP.get URI("https://#{domain}/.well-known/jwks.json")
    jwks_keys = Array(JSON.parse(jwks_raw)['keys'])
    Hash[
      jwks_keys
      .map do |k|
        [
          k['kid'],
          OpenSSL::X509::Certificate.new(
            Base64.decode64(k['x5c'].first)
          ).public_key
        ]
      end
    ]
  end

  private

  def domain
    Rails.application.credentials.auth0.domain!
  end

  def audience
    Rails.application.credentials.auth0.audience!
  end
end