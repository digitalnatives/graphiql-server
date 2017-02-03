# GraphiQL Server [![Build Status](https://travis-ci.org/digitalnatives/graphiql-server.svg?branch=master)](https://travis-ci.org/digitalnatives/graphiql-server)

A simple server to have a GraphiQL UI playground for your API, it handles authentication and proxies all API calls (avoiding CORS)

![logged-in](https://cloud.githubusercontent.com/assets/4459232/22155207/f1a34124-df2e-11e6-95c7-dc99fade1b4d.png)
![logged-out](https://cloud.githubusercontent.com/assets/4459232/22155208/f1a36226-df2e-11e6-8267-514fba6a1866.png)


## Deploy

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

We make it easy to deploy as a free Heroku app.

Just press the button above and fill in the following environment variables:

__GS_APP_URL__: https://`<heroku-app-name>`.herokuapp.com

The `<heroku-app-name>` is the name that you choose for your app on Heroku.

This will be the base Url for the callback on the OAuth2 auth flow.

If you want to use your own domain, you can add it here or change it latter on app settings tab.

__GS_SESSION_SECRET__: This is the secret used to sign the session ID cookie, used by [express-session](https://github.com/expressjs/session/#secret).

__GS_GRAPHQL_URL__: Your GraphQL endpoint.

__GS_OAUTH2_AUTHORIZATION_URL__: Your OAuth2 authorization endpoint.

__GS_OAUTH2_TOKEN_URL__: Your OAuth2 token endpoint.

__GS_OAUTH2_CLIENT_ID__: Your OAuth2 client ID.

__GS_OAUTH2_CLIENT_SECRET__: Your OAuth2 client secret.


## Running locally

> For both methods you need to have the environment variables configured, see the `.envrc.sample` file for more info.

### With Node

Install [Node](https://nodejs.org) and run:

```bash
npm install
npm start
```

### With Docker

Install [Docker](https://www.docker.com/) and run:

```bash
docker-compose up app
# the first time it can take some time depending on your internet connection
```


## Features

- Supports only OAuth2 authentication flow now. (We need your help to make it better and add more :)
- Proxy all the GraphQL API calls through the server, this way the tokens only live on the server side and it's possible to use API's without CORS enabled.


## To do's

- Add support for others authentication methods.
- Any idea? [Open an issue](https://github.com/digitalnatives/graphiql-server/issues/new) and let's talk :)


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## History

See [Releases](https://github.com/digitalnatives/graphiql-server/releases) for detailed changelog.


## License

[MIT License](http://digitalnatives.mit-license.org/) © Digital Natives
