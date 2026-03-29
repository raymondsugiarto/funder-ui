import {
  AppType,
  appTypeAccessTokens,
  appTypeDefaultRoutes,
  appTypePrefixApiUrl,
} from '@/router/app-type';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    appType: AppType.ADMIN,
  }),
  getters: {
    getTokenNameByAppType: (state) => appTypeAccessTokens[state.appType],
    getDefaultRoute: (state) => appTypeDefaultRoutes[state.appType],
    getPrefixApiUrl: (state) => (url: string) => `${appTypePrefixApiUrl[state.appType]}${url}`,
  },
  actions: {
    setAppType(appType: AppType) {
      this.appType = appType;
    },
  },
});
