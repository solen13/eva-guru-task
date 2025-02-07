import api from '../../plugins/axios';

export default {
  namespaced: true,
  state: {
    user: null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKENS(state, { accessToken, refreshToken, email }) {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      // Yedek olarak localStorage'a da kaydedelim
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('email', email);
    },
    LOGOUT(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;

      // localStorage'ı da temizle
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('email');
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const response = await api.post('/oauth/token', {
          Email: email,
          Password: password,
          GrantType: 'password',
          Scope: 'amazon_data',
          ClientId: 'C0001',
          ClientSecret: 'SECRET0001',
          RedirectUri: 'https://api.eva.guru',
        });

        if (!response.data.Data) {
          throw new Error('Token alınamadı');
        }

        // Token'ları kaydet
        commit('SET_TOKENS', {
          accessToken: response.data.Data.AccessToken,
          refreshToken: response.data.Data.RefreshToken,
          email: email,
        });

        // Kullanıcı bilgilerini al
        try {
          const userResponse = await api.post('/user/user-information', {
            email: email,
          });
          console.log(userResponse);

          if (userResponse.data.Data && userResponse.data.Data.user) {
            commit('SET_USER', userResponse.data.Data.user);
            return true;
          }
        } catch (userError) {
          console.error('Kullanıcı bilgileri alınamadı:', userError);
        }
        return false;
      } catch (error) {
        console.error('Login failed:', error);
        commit('LOGOUT');
        return false;
      }
    },

    async refreshAccessToken({ commit, state }) {
      try {
        const email = localStorage.getItem('email');
        const userResponse = await api.post('/user/user-information', {
          email: email,
        });

        if (userResponse.data.Data && userResponse.data.Data.user) {
          commit('SET_USER', userResponse.data.Data.user);
          return true;
        }
      } catch (userError) {
        console.error('Kullanıcı bilgileri alınamadı:', userError);
      }
    },

    async logout({ commit }) {
      await api.post('/user/logout', {});
      commit('LOGOUT');
    },
  },
};
