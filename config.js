const APP_URL = ''
const OAUTH_URL = ''
const OAUTH_ID = ''
const OAUTH_SECRET = ''
const OAuth2StrategyConfig = {
  authorizationURL: `${OAUTH_URL}/oauth/authorize`,
  tokenURL: `${OAUTH_URL}/oauth/token`,
  clientID: OAUTH_ID,
  clientSecret: OAUTH_SECRET,
  callbackURL: `${APP_URL}/callback`
}

const GRAPHQL = {
  URL: '',
  QUERY: `{

  }`,
  TOKEN: ''
}

module.exports = {
  APP_URL,
  OAUTH_URL,
  OAUTH_ID,
  OAUTH_SECRET,
  OAuth2StrategyConfig,
  GRAPHQL,
}


