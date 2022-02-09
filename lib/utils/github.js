const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  // TODO: Implement me!
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const { access_token } = await tokenRes.json();

  return access_token;
};

const getGithubProfile = async (token) => {
  // TODO: Implement me!
  const fetchGithubProfileResp = await fetch('https://api.github.com/user', {
    headers: {
      accept: 'application/json',
      Authorization: `token ${token}`,
    },
  });

  return fetchGithubProfileResp.json();
};
module.exports = { exchangeCodeForToken, getGithubProfile };
