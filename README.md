## Expected Auth0 Configuration

Sign up for a free Auth0 Account (no credit card required)

1. Add an Application for `js-client` with params of:
   - Application Type = `Single Page Application`
   - Allowed Callback URLs, Allowed Logout URLs, Allowed Web Origins = `http://localhost:3000`
2. Add an API for `rails-api` with params of:
   - Name: rails-api
   - Idenitier: `http://rails-api`

## Getting Started via Docker

```sh
docker-compose up

# or, if a docker image needs rebuilding...
docker-compose up --build

```

### Urls

- [js-client](http://localhost:3000/)
- [rails-api](http://localhost:3030/)

## Getting Started without Docker

### rails-api

> Tested with ruby 3.1

1. Add credentials config
   - Refer to `/rails-api/api/config/credentials.example.yml`
   - See also:
     - https://guides.rubyonrails.org/security.html#custom-credentials
     - https://auth0.com/docs/quickstart/backend/rails
2. Install packages
   ```sh
   cd rails-api
   rvm use
   cd api
   bundle install
   ```
3. Start the api
   ```
   bundle exec rails s -p 3030
   ```

### js-client

> Tested with nodejs v17.8.0

```sh
cd js-client
npm install
npm run dev
```

## References

- [Requested scopes versus granted scopes](https://auth0.com/docs/get-started/apis/scopes#requested-scopes-versus-granted-scopes)
- [OIDC Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
- [Working with docker bind mounts and node_modules](https://burnedikt.com/dockerized-node-development-and-mounting-node-volumes/)
