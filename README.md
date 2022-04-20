## Expected Auth0 Configuration

Sign up for a free Auth0 Account (no credit card required)

1. Add an Application for `js-client` with params of:
   - Application Type = `Single Page Application`
   - Allowed Callback URLs, Allowed Logout URLs, Allowed Web Origins = `http://localhost:3000`
2. Add an API for `rails-api` with params of:
   - Name: rails-api
   - Idenitier: `http://rails-api`
   - RBAC Settings: `Enable RBAC` is enabled and `Add Permissions in the Access Token` is enabled
   - In rails-api `Permissions` tab, add a Permission of `read:private-scoped`
3. In User Managment | Roles
   - Add a role of `rails-api-reader`; grant it access to `rails-api` | `read-private-scoped`
   - Add a user to role `rails-api-reader`

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

## Tasks

### rails-api: adding a secured route

1. Define a controller and action
2. Map route in `routes.rb`
3. Map security in `secured.rb`

PRODUCTION CONCERNS

- MAINTENANCE: Would it be better to define security mappings elsewhere or use decorators on the action?
- SECURITY: To avoid accidental exposure, make `anonymous` access an explicit opt-in configuration. Otherwise, route is dissallowed

## References

- [auth0 docs](https://auth0.com/docs)
- [Access tokens with multiple audiences](https://community.auth0.com/t/access-tokens-with-multiple-audiences/9911)
- [Configure Logical API for Multiple APIs](https://auth0.com/docs/get-started/apis/set-logical-api)
- [Ruby On Rails API: Authorization](https://auth0.com/docs/quickstart/backend/rails)
- [Requested scopes versus granted scopes](https://auth0.com/docs/get-started/apis/scopes#requested-scopes-versus-granted-scopes)
- [OIDC Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
- [Which OAuth 2.0 Flow Should I Use?](https://auth0.com/docs/get-started/authentication-and-authorization-flow/which-oauth-2-0-flow-should-i-use)
- [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow-with-proof-key-for-code-exchange-pkce): OAuth 2.0 Flow for web and mobile clients (addresses concerns for clients that cannot securely store Client Secret)
- [Working with docker bind mounts and node_modules](https://burnedikt.com/dockerized-node-development-and-mounting-node-volumes/)
