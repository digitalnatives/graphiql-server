const APP_URL = 'http://localhost:4000'
const OAUTH_URL = ''
const OAUTH_ID = ''
const OAUTH_SECRET = ''

const OAuth2StrategyConfig = {
  authorizationURL: `${OAUTH_URL}/oauth/authorize`,
  tokenURL: `${OAUTH_URL}/oauth/token`,
  clientID: OAUTH_ID,
  clientSecret: OAUTH_SECRET,
  callbackURL: `${APP_URL}/auth/callback`
}

const GRAPHQL_URL = ''

module.exports = {
  OAuth2StrategyConfig,
  GRAPHQL_URL,
}
