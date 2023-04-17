export const oktaConfig = {
    clientId: '0oa887ngowUaQbNPs5d7',
    issuer: 'https://dev-57416535.okta.com/oauth2/default',
    redirectUri: 'https://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpCheck: true,
}