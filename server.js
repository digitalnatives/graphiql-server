/* eslint-disable no-console */
require('es6-promise').polyfill()
require('isomorphic-fetch')
const express = require('express')
const app = express()
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const path = require('path')
const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2').Strategy
const bodyParser = require('body-parser')
const fs = require('fs')
const config = require('./config')

/*
  AUTH
*/

function getSessionConfig() {
  let sessionInfo = {
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }

  if (config.SESSION_STORE === config.SessionStoreType.REDIS) {
    sessionInfo.store = new RedisStore({
      socket: config.REDIS_SOCKET,
    })
  }

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    sessionInfo.cookie = {
      secure: true
    }
  }

  return sessionInfo
}

app.use(bodyParser.json())
app.use(session(getSessionConfig()))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

const oauth2Strategy = new OAuth2Strategy(
  {
    authorizationURL: config.OAUTH2_AUTORIZATION_URL,
    tokenURL: config.OAUTH2_TOKEN_URL,
    clientID: config.OAUTH2_CLIENT_ID,
    clientSecret: config.OAUTH2_CLIENT_SECRET,
    callbackURL: config.OAUTH2_CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    const user = {
      accessToken,
      refreshToken,
    }
    done(null, user)
  }
)

passport.use(oauth2Strategy)

app.get('/auth/log-in', passport.authenticate('oauth2'))

app.get('/auth/callback',
  passport.authenticate('oauth2', {failureRedirect: '/'}),
  (req, res) => {
    res.redirect('/')
  }
)

app.get('/auth/log-out', function(req, res) {
  if (isUserLoggedIn(req)) {
    req.session.destroy()
  }
  res.redirect('/')
})

app.get('/auth/refresh-token', function(req, res) {
  if (!isUserLoggedIn(req)) {
    res.redirect('/auth/log-in')
    return
  }

  oauth2Strategy._oauth2.getOAuthAccessToken(
    req.session.passport.user.refreshToken,
    { grant_type: 'refresh_token' },
    function(error, accessToken, refreshToken) {
      if (error) {
        res.redirect('/auth/log-out')
        return
      }

      req.session.passport.user.accessToken = accessToken
      req.session.passport.user.refreshToken = refreshToken
      res.redirect('/')
    }
  )
})

function isUserLoggedIn(req) {
  const passportSession = req.session.passport
  return passportSession && passportSession.user
}

/*
  PROXY
*/

app.post('/proxy/graphql', function (req, res) {
  if (!isUserLoggedIn(req)) {
    res.status(401).send('You need to be logged in!')
    return
  }

  const token = `Bearer ${req.session.passport.user.accessToken}`
  const query = JSON.stringify(req.body)

  fetch(config.GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: query,
  }).then(function (response) {
    const isUnauthorized = response.status === 401
    if (isUnauthorized && isUserLoggedIn(req)) {
      res.redirect('/auth/refresh-token')
      return
    }

    response.json()
      .then(jsonBody =>  res.send(jsonBody))
      .catch(error => res.send(error))
  })
})

/*
  INDEX
*/

app.get('/', function (req, res) {
  fs.readFile(path.join(__dirname, '/index.html'), function (err, content) {
    if (err)
      return res.send(err)

    content = content.toString()
      .replace('{{signedOutClass}}', isUserLoggedIn(req) ? 'signed-in' : 'signed-out')

    return res.send(content)
  })
})

app.use(function(req, res) {
  res.status(404).send('Page not found!')
})

app.listen(config.APP_PORT, function () {
  console.log(`Example app listening on port ${config.APP_PORT}!`)
})

// required to use the server on the tests
module.exports = app
