/**
 * Created by 19734 on 2018/6/6.
 */
import auth_config from '../../../config/auth'
const state={
  auth:localStorage.hasOwnProperty('token') && localStorage.getItem('token'),
  passport:auth_config.passport,
  user:localStorage.hasOwnProperty('user') ? JSON.parse(localStorage.getItem('user')):{},
};
const mutations={
  setAuth: (state, value) => state.auth = value,
  setUser: (state, value) => state.user = value,
};
const actions={
  login({ commit }, token) {
    commit('setAuth', true);
    localStorage.setItem('token', token)
  },
  logout({ commit }, token){
    commit('setAuth', false);
    localStorage.removeItem('token', token)
  },
  setUser({ commit },user){
    commit('setUser', JSON.parse(user));
    localStorage.setItem('user', user);
  }
};
const getters={
  passport:state => state.passport,
  auth:state => state.auth,
  user:state=>state.user
};
export default {
  state,
  mutations,
  actions,
  getters
}
