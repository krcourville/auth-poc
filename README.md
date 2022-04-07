## Getting Started

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

[Requested scopes versus granted scopes](https://auth0.com/docs/get-started/apis/scopes#requested-scopes-versus-granted-scopes)
[OIDC Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
