import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      name: 'Guest User',
      isLoggedIn: false
    },
    notifications: []
  },
  getters: {
    userName: state => state.user.name,
    isLoggedIn: state => state.user.isLoggedIn,
    notifications: state => state.notifications
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    login(state) {
      state.user.isLoggedIn = true;
    },
    logout(state) {
      state.user.isLoggedIn = false;
      state.user.name = 'Guest User';
    },
    addNotification(state, notification) {
      state.notifications.push(notification);
    },
    clearNotifications(state) {
      state.notifications = [];
    }
  },
  actions: {
    login({ commit }, username) {
      // This would typically include API calls
      commit('setUser', { name: username, isLoggedIn: true });
    },
    logout({ commit }) {
      commit('logout');
    },
    notify({ commit }, message) {
      const notification = {
        id: Date.now(),
        message,
        timestamp: new Date()
      };
      commit('addNotification', notification);
    }
  },
  modules: {
    // For larger applications, you can organize the store into modules
  }
}) 