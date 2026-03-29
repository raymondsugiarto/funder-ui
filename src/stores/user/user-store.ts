import { defineStore } from 'pinia';
import { UserDto } from './user';
import { api } from '@/boot/axios';
import { DefaultResponse } from '@/types/response';
import { useAppStore } from '../app/app-store';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as UserDto | null,
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    loadMyProfile() {
      const { getPrefixApiUrl } = useAppStore();
      api
        .get<DefaultResponse<UserDto>>(getPrefixApiUrl('me'))
        .then((response) => {
          const { data } = response;
          this.user = data;
        });
    },
  },
});
