/* eslint-env node */

const SESSION_SECRET = process.env.GS_SESSION_SECRET || 'some nice key'

const REDIS_URL = process.env.GS_REDIS_URL || 'localhost'
const REDIS_PORT = process.env.GS_REDIS_PORT || '6379'

const APP_URL = process.env.GS_APP_URL || 'http://localhost:4000'
const GRAPHQL_URL = process.env.GS_GRAPHQL_URL || ''

const OAUTH_AUTORIZATION_URL = process.env.GS_OAUTH_AUTORIZATION_URL || ''
const OAUTH_TOKEN_URL = process.env.GS_OAUTH_TOKEN_URL || ''
const OAUTH_CLIENT_ID = process.env.GS_OAUTH_CLIENT_ID || ''
const OAUTH_CLIENT_SECRET = process.env.GS_OAUTH_CLIENT_SECRET || ''
const OAUTH_CALLBACK_URL = process.env.GS_OAUTH_CALLBACK_URL || `${APP_URL}/auth/callback`

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
