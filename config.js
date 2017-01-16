/* eslint-env node */

const SESSION_SECRET = process.env.GS_SESSION_SECRET || 'some nice key'

const REDIS_SOCKET = process.env.GS_REDIS_SOCKET || 'redis://localhost:6379'

const APP_PORT = process.env.PORT || 5000
const APP_URL = process.env.GS_APP_URL || `http://localhost:${APP_PORT}`
const GRAPHQL_URL = process.env.GS_GRAPHQL_URL || ''

const OAUTH_AUTORIZATION_URL = process.env.GS_OAUTH_AUTORIZATION_URL || ''
const OAUTH_TOKEN_URL = process.env.GS_OAUTH_TOKEN_URL || ''
const OAUTH_CLIENT_ID = process.env.GS_OAUTH_CLIENT_ID || ''
const OAUTH_CLIENT_SECRET = process.env.GS_OAUTH_CLIENT_SECRET || ''
const OAUTH_CALLBACK_URL = `${APP_URL}/auth/callback`

module.exports = {
  SESSION_SECRET,
  REDIS_SOCKET,
  APP_PORT,
  GRAPHQL_URL,
  OAUTH_AUTORIZATION_URL,
  OAUTH_TOKEN_URL,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_CALLBACK_URL,
}
