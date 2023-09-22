export enum AuthStatus {
  Loading,
  Error,
  SignedIn,
  SignedOut,
}

export enum AuthType {
  SignUp = 'signup',
  Login = 'login',
  Reauthorize = 'reauthorize',
  Link = 'link',
  Signature = 'signature',
}

export enum AuthProviderType {
  Google = 'google.com',
  LinkedIn = 'linkedin.com',
}

export enum AuthError {
  OauthFlowCancelled = 'OAUTH_FLOW_CANCELLED',
  InsufficientScopes = 'INSUFFICIENT_SCOPES',
  UserNotFound = 'USER_NOT_FOUND',
  CsrfCheckFailed = 'INVALID_CSRF_TOKEN',
  ConnectionInUSe = 'CONNECTION_IN_USE',
}

export const KnownAuthError = new Set([
  AuthError.OauthFlowCancelled,
  AuthError.InsufficientScopes,
]);

export enum Role {
  Admin = 'Admin',
  User = 'User',
}

export enum ParamKey {
  CustomToken = 'customToken',
  Error = 'error',
  LoginHint = 'loginHint',
}
