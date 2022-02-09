const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  // TODO: Implement me!
  const retrieveCode = fetch('', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },  
      body: JSON.stringify(code)
};

const getGithubProfile = async (token) => {
  // TODO: Implement me!
};

module.exports = { exchangeCodeForToken, getGithubProfile };
