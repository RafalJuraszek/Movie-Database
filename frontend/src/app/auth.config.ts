import {AuthConfig} from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {

  issuer: 'https://accounts.google.com',


  redirectUri: window.location.origin,
  clientId: '937719656412-9mg264ra4kgckfh2562rf0kbn1m038ls.apps.googleusercontent.com',

  dummyClientSecret: '3M8vJ6p0wli-60VRt48QCLom',
  responseType: 'code',
  strictDiscoveryDocumentValidation: false,
  scope: 'openid profile email',
  showDebugInformation: true
};
