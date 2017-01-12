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
const config = require('./config')

/*
  AUTH
*/

function getSessionConfig() {
  let sessionInfo = {
    store: new RedisStore({
      host: 'localhost',
      port: 6379,
    }),
    secret: 'some nice key',
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
  config.OAuth2StrategyConfig,
  (accessToken, refreshToken, profile, done) => {
    const user = {
      accessToken,
      refreshToken,
    }
    done(null, user)
  }
))

app.get('/auth', passport.authenticate('oauth2'))

app.get('/auth/callback',
  passport.authenticate('oauth2', {failureRedirect: '/'}),
  (req, res) => {
    res.redirect('/')
  }
)

/*
  PROXY
*/

app.post('/proxy/graphql', function (req, res) {
  const passportSession = req.session.passport
  if (!passportSession || !passportSession.user) {
    res.status(401).send('You need to be logged in!')
    return
  }

  fetch(config.GRAPHQL.URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${passportSession.user.accessToken}`,
    },
    body: JSON.stringify(req.body),
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

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})
