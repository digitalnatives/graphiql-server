const SESSION_SECRET = 'some nice key'

const REDIS_URL = 'localhost'
const REDIS_PORT = '6379'

const APP_URL = 'http://localhost:4000'
const GRAPHQL_URL = ''

const OAUTH_BASE_URL = ''
const OAUTH_AUTORIZATION_URL = `${OAUTH_BASE_URL}/oauth/authorize`
const OAUTH_TOKEN_URL = `${OAUTH_BASE_URL}/oauth/token`
const OAUTH_CLIENT_ID = ''
const OAUTH_CLIENT_SECRET = ''
const OAUTH_CALLBACK_URL = `${APP_URL}/auth/callback`

module.exports = {
  SESSION_SECRET,
  REDIS_URL,
  REDIS_PORT,
  GRAPHQL_URL,
  OAUTH_AUTORIZATION_URL,
  OAUTH_TOKEN_URL,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_CALLBACK_URL,
}
