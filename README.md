## Demonstrates

1. JS client authentication flow
2. Traditional/SSR web client authentication flow
3. Rails api/backend
4. Java Spring client
5. Api security based on
   - anonymous access
   - authentication only
   - required scope
   - required permission

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
- [java-client](http://localhost:8080)

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

1. Add Auth0 environment variables
   - create `js-client/.env` based on `js-client/.env.example`
2. Start the app
   ```sh
   cd js-client
   npm install
   npm run dev
   ```

### java-client

> Tested with: java 11.0.14.1; Gradle 7.4.2

1. Create `java-client/src/main/resources/application.yaml` based upon `java-client/src/main/resources/application.example.yaml`
2. Start the app
   ```sh
   cd java-client
   export SPRING_PROFILES_ACTIVE=dev gradle clean bootRun
   gradle bootRun
   ```

## Tasks

### rails-api: adding a secured route

1. Define a controller and action
2. Map route in `routes.rb`
3. Map security in `secured.rb`

> WARNING: PRODUCTION CONCERNS

- MAINTENANCE: Would it be better to define security mappings elsewhere or use decorators on the action?
- SECURITY: To avoid accidental exposure, make `anonymous` access an explicit opt-in configuration. Otherwise, route is dissallowed

### java-client: adding a secured page

1. Define a controller and template
2. Map security in `SecurityConfig.java` (all pages require authentication by default)

### js-client: adding secured route/ux

This scenario is currently not demo'd. However, some thoughts to consider:

- The auth0 client provides a nice store for state based on authentication status
- All api interactions should be handling errors and displaying
  appropriate messaging to help with troubleshooting without over-exposing the application or api: "Oops! You are missing the following permission: read:stuff"
- How to handle display of features based on permissions? Expose an api endpoint and query at startup?
- User Impersonation: this is a tricky topic. It seems Auth0 used to support direct user impersonation but then removed this feature
  since it was prone to being abused. Basically, doing so could result in a support staff writing (whether purposely or not) under the identity
  of the impersonated user. Depending on the scenario, it may be
  more ideal allow support personnel temporary and/or restricted access to user data. And any change audits made should be reflect the support person vs the end user.
  More info: https://community.auth0.com/t/auth0-user-impersonation/81821/2
  > This is a complex question. Our recommendation is a “companion app” or a side-by-side app. This is a separate app or a mode in the existing app that lets your admin view the user info.
  > Impersonation is a security risk. When user info is viewed or modified, any log messages should clearly indicate WHO viewed or modified the info. If it is the user, that is straightforward. But if it is the admin, or a support person, that ALSO must be indicated. With plain impersonation, you don’t get the distinction that lets you know that someone else modified the data.

## References

- [auth0 docs](https://auth0.com/docs)
- [Set Up Multiple Environment](https://auth0.com/docs/get-started/auth0-overview/create-tenants/set-up-multiple-environments)
- [Access tokens with multiple audiences](https://community.auth0.com/t/access-tokens-with-multiple-audiences/9911)
- [Configure Logical API for Multiple APIs](https://auth0.com/docs/get-started/apis/set-logical-api)
- [Ruby On Rails API: Authorization](https://auth0.com/docs/quickstart/backend/rails)
- [Requested scopes versus granted scopes](https://auth0.com/docs/get-started/apis/scopes#requested-scopes-versus-granted-scopes)
- [OIDC Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
- [Which OAuth 2.0 Flow Should I Use?](https://auth0.com/docs/get-started/authentication-and-authorization-flow/which-oauth-2-0-flow-should-i-use)
- [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow-with-proof-key-for-code-exchange-pkce): OAuth 2.0 Flow for web and mobile clients (addresses concerns for clients that cannot securely store Client Secret)
- [Working with docker bind mounts and node_modules](https://burnedikt.com/dockerized-node-development-and-mounting-node-volumes/)
