export default {
  token(state) {
    return state.token;
  },
  userId(state) {
    return state.userId;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
