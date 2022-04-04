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

# add secret config
# specify your preferred editor..
EDITOR="nano" bin/rails credentials:edit
# add auth0_domain
# auth0_domain: {YOUR_AUTH0_DOMAIN}

rails s -p 3030

```

## References

[Requested scopes versus granted scopes](https://auth0.com/docs/get-started/apis/scopes#requested-scopes-versus-granted-scopes)
[OIDC Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
