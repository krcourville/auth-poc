## Getting Started

```bash
# Run each in a new terminal

# start js-client
cd js-client
npm install
npm run dev

# create `js-client/src/.env based on
# `js-client/src/.env-example

# start rails-api
cd rails-api
rvm use
cd api
bundle install

# add credentials config
# Refer to /rails-api/api/config/credentials.example.yml
# References:
# - https://guides.rubyonrails.org/security.html#custom-credentials
# - https://auth0.com/docs/quickstart/backend/rails

bundle exec rails s -p 3030

```

## References

[Requested scopes versus granted scopes](https://auth0.com/docs/get-started/apis/scopes#requested-scopes-versus-granted-scopes)
[OIDC Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
