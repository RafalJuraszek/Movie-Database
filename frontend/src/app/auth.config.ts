import {AuthConfig} from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {

  issuer: 'https://accounts.google.com',


  redirectUri: window.location.origin,
  clientId: '937719656412-9mg264ra4kgckfh2562rf0kbn1m038ls.apps.googleusercontent.com',

  dummyClientSecret: 'L2ryYn8hFUwaymVa3a6mt8SG',
  responseType: 'code',
  strictDiscoveryDocumentValidation: false,
  scope: 'openid profile email',
  showDebugInformation: true
};
