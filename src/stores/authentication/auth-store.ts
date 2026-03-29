import { api } from '@/boot/axios';
import { defineStore } from 'pinia';
import { Cookies } from 'quasar';
import { useAppStore } from '../app/app-store';
import type { SignInRequestDto, SignInResponseDto, SignUpRequestDto } from './auth';
import type { DefaultResponse } from '@/types/response';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    authenticated: false,
    expiredAt: new Date(),
    comingSoonDialog: 0,
  }),
  getters: {
    getComingSoonDialog: (state) => state.comingSoonDialog,
    getToken: (state) => state.token,
    isAuthenticated: (state) => state.authenticated,
  },
  actions: {
    getCookies() {
      return Cookies;
    },
    getTokenName(): string {
      const { getTokenNameByAppType } = useAppStore();
      return getTokenNameByAppType;
    },
    authenticationTokenFromCookie(): boolean {
      const token = this.getCookies().get(this.getTokenName());
      if (token) {
        this.token = token;
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      return this.authenticated;
    },
    getTokenFromCookie(): string {
      const token = this.getCookies().get(this.getTokenName());
      if (token) {
        this.token = token;
        this.authenticated = true;
      }
      return this.token;
    },
    removeToken() {
      this.getCookies().remove(this.getTokenName(), { path: '/' });
      this.token = '';
      this.authenticated = false;
    },
    setToken(token: string) {
      const dateExpired = new Date(this.expiredAt);
      Cookies.set(this.getTokenName(), token, {
        path: '/',
        expires: dateExpired,
      });
      this.authenticated = true;
    },
    signOut() {
      this.removeToken();
      const { getDefaultRoute } = useAppStore();
      void this.router.replace(getDefaultRoute);
    },
    signInSuccess(data: SignInResponseDto) {
      this.token = data.token;
      this.expiredAt = data.expiredAt;
      this.setToken(this.token);
    },
    async signIn(params: SignInRequestDto) {
      // need to be check, should not use /api-admin
      const { getPrefixApiUrl } = useAppStore();
      return api
        .post<DefaultResponse<SignInResponseDto>>(getPrefixApiUrl('auth/sign-in'), params)
        .then((response) => {
          this.signInSuccess(response.data);
          return response.data;
        });
    },
    async signUp(params: SignUpRequestDto) {
      const { getPrefixApiUrl } = useAppStore();
      return api.post(getPrefixApiUrl('auth/sign-up'), params).then((data) => {
        return data;
      });
    },
    showComingSoonDialog() {
      this.comingSoonDialog += 1;
    },
  },
});
