import store from '../store';

export const setupRefreshTokenPlugin = () => {
  const checkAndRefreshToken = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      try {
        await store.dispatch(
          'auth/refreshAccessToken',
          accessToken,
          refreshToken
        );
      } catch (error) {
        console.error('Token yenileme hatası:', error);
        store.dispatch('auth/logout');
      }
    }
  };
  checkAndRefreshToken();
};
