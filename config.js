const SESSION_SECRET = process.env.GS_SESSION_SECRET || 'some nice key'

const REDIS_SOCKET = (() => {
  // used by docker-compose
  if (process.env.GS_REDIS_TCP_ADDR)
    return `redis://${process.env.GS_REDIS_TCP_ADDR}:6379`

  if (process.env.GS_REDIS_URL)
    return process.env.GS_REDIS_URL

  if (process.env.REDISCLOUD_URL)
    return process.env.REDISCLOUD_URL

  return 'redis://localhost:6379/0'
})()

const APP_PORT = process.env.PORT || 5000
const APP_URL = process.env.GS_APP_URL || `http://localhost:${APP_PORT}`
const GRAPHQL_URL = process.env.GS_GRAPHQL_URL || ''

const OAUTH2_AUTORIZATION_URL = process.env.GS_OAUTH2_AUTORIZATION_URL || '/some-url'
const OAUTH2_TOKEN_URL = process.env.GS_OAUTH2_TOKEN_URL || '/some-url'
const OAUTH2_CLIENT_ID = process.env.GS_OAUTH2_CLIENT_ID || 'a-token'
const OAUTH2_CLIENT_SECRET = process.env.GS_OAUTH2_CLIENT_SECRET || 'a-token'
const OAUTH2_CALLBACK_URL = `${APP_URL}/auth/callback`

module.exports = {
  SESSION_SECRET,
  REDIS_SOCKET,
  APP_PORT,
  GRAPHQL_URL,
  OAUTH2_AUTORIZATION_URL,
  OAUTH2_TOKEN_URL,
  OAUTH2_CLIENT_ID,
  OAUTH2_CLIENT_SECRET,
  OAUTH2_CALLBACK_URL,
}
