/* eslint-env node */
/* eslint-disable no-console */
require('es6-promise').polyfill()
require('isomorphic-fetch')
const express = require('express')
const app = express()
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const path = require('path')
const passport = require('passport')
const Strategy = require('passport-oauth2').Strategy
const bodyParser = require('body-parser')
const fs = require('fs')
const config = require('./config')

/*
  AUTH
*/

function getSessionConfig() {
  let sessionInfo = {
    store: new RedisStore({
      host: config.REDIS_URL,
      port: config.REDIS_PORT,
    }),
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
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

passport.use(new Strategy(
  {
    authorizationURL: config.OAUTH_AUTORIZATION_URL,
    tokenURL: config.OAUTH_TOKEN_URL,
    clientID: config.OAUTH_CLIENT_ID,
    clientSecret: config.OAUTH_CLIENT_SECRET,
    callbackURL: config.OAUTH_CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    const user = {
      accessToken,
      refreshToken,
    }
    done(null, user)
  }
))

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
    return response.text()
  }).then(function (responseBody) {
    try {
      res.send(JSON.parse(responseBody))
    } catch (error) {
      res.send(error)
    }
  })
})

/*
  INDEX
*/

app.use('/static', express.static('static'))

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
