const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const UserService = require('../services/UserService.js');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res) => {
    // TODO: Kick-off the github oauth flow
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=user`
    );
  })
  .get('/login/callback', async (req, res) => {
    /*
      TODO:
     * get code
     * exchange code for token
     * get info from github about user with token
     * get existing user if there is one
     * if not, create one
     * create jwt
     * set cookie and redirect
     */
    const { code } = req.query;
    const token = await exchangeCodeForToken(code);
    const userGitHubProfile = await getGithubProfile(token);
    const signedUser = await UserService.createSignedUser(userGitHubProfile);
    res.cookie(process.env.COOKIE_NAME, signedUser, {
      httpOnly: true,
      maxAge: ONE_DAY_IN_MS,
    });
    res.redirect('/api/v1/github/dashboard');
  })
  .get('/dashboard', authenticate, async (req, res) => {
    // require req.user
    // get data about user and send it as json
    res.json(req.user);
  })
  .delete('/sessions', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully!' });
  });
