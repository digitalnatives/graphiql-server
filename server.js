/* eslint-env node */
/* eslint-disable no-console */
require('es6-promise').polyfill()
require('isomorphic-fetch')
const express = require('express')
const app = express()
const path = require('path')
const passport = require('passport')
const Strategy = require('passport-oauth2').Strategy
const config = require('./config')

/*
  AUTH
*/

app.use(passport.initialize())

passport.use(new Strategy(
  config.OAuth2StrategyConfig,
  (accessToken, refreshToken, profile, done) => {

    console.log('accessToken', accessToken) // eslint-disable-line
    console.log('refreshToken', refreshToken) // eslint-disable-line
    console.log('profile', profile) // eslint-disable-line

    done(null, {})
  }
))

app.get('/auth', passport.authenticate('oauth2', {session: false}))

app.get('/auth/callback',
  passport.authenticate('oauth2', {session: false, failureRedirect: '/'}),
  (req, res) => {
    res.redirect('/')
  }
)

/*
  PROXY
*/



app.get('/proxy/graphql', function (req, res) {
  fetch(config.GRAPHQL.URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': config.GRAPHQL.TOKEN,
    },
    body: JSON.stringify({
      query: config.GRAPHQL.QUERY
    }),
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

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})
