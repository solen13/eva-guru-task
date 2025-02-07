import { createStore } from 'vuex';
import api from '../../plugins/axios';
export default {
  namespaced: true,
  state: {
    product: null,
    currency: null,
  },
  mutations: {
    SET_PRODUCTS(state, product) {
      state.product = product;
    },
    SET_PRODUCTS_CURRENCY(state, currency) {
      state.currency = currency;
    },
  },
  actions: {
    async productList({ commit, state }, days, sellerId) {
      try {
        const response = await api.post('/data/daily-sales-overview', {
          customDateData: null,
          day: days,
          excludeYoYData: true,
          marketplace: 'Amazon.com',
          requestStatus: 0,
          sellerId: 'A2SL13ERIMQO6E',
        });

        commit('SET_PRODUCTS', response.data.Data.item);
        commit('SET_PRODUCTS_CURRENCY', response.data.Data.Currency);
      } catch (error) {
        console.error('Login failed', error);
      }
    },
    async poductDetailList({ commit }) {},
  },
};
