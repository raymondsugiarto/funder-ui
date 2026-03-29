export enum AppType {
  ADMIN = 'ADMIN',
}

const adminPublicMeta = { public: true, appType: AppType.ADMIN };
const adminPrivateMeta = { public: false, appType: AppType.ADMIN };

export const ADMIN_ACCESS_TOKEN = 'valas-admin-access-token';

const appTypeAccessTokens = {
  [AppType.ADMIN]: ADMIN_ACCESS_TOKEN,
};

const appTypeDefaultRoutes = {
  [AppType.ADMIN]: '/sign-in',
};

const appTypePrefixApiUrl = {
  [AppType.ADMIN]: '/api/',
};

export {
  adminPublicMeta,
  adminPrivateMeta,
  appTypeAccessTokens,
  appTypeDefaultRoutes,
  appTypePrefixApiUrl,
};
