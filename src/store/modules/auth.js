import axios from 'axios';
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

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('email', email);
    },
    LOGOUT(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('email');
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const response = await api.post('/oauth/token', {
          Email: 'homework@eva.guru',
          Password: 'Homeworkeva1**',
          GrantType: 'password',
          Scope: 'amazon_data',
          ClientId: 'C0001',
          ClientSecret: 'SECRET0001',
          RedirectUri: 'https://api.eva.guru',
        });

        console.log('reponse', response);
        console.log(response.data.Data.AccessToken);

        axios
          .post(
            'https://iapitest.eva.guru/user/user-information',
            {
              email: email,
            },
            {
              headers: {
                Authorization: `Bearer ${response.data.Data.AccessToken}`,
              },
            }
          )
          .then((responseUser) => {
            commit('SET_TOKENS', {
              accessToken: response.data.Data.AccessToken,
              refreshToken: response.data.Data.RefreshToken,
              email: responseUser.data.Data.user.email,
            });

            commit('SET_USER', responseUser.data.Data.user);
          });
      } catch (error) {
        console.error('Login failed', error);
      }
    },

    async refreshAccessToken({ commit, state }) {
      try {
        if (!state.refreshToken) return;

        const response = await axios.post(
          'https://iapitest.eva.guru/user/user-information',
          {
            refreshToken: state.refreshToken,
          }
        );

        commit('SET_TOKENS', {
          accessToken: response.data.Data.accessToken,
          refreshToken: state.refreshToken, // Refresh token değişmiyor genelde
        });
      } catch (error) {
        commit('LOGOUT');
      }
    },

    logout({ commit }) {
      commit('LOGOUT');
    },
  },
};
