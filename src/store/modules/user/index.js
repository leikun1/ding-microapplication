/**
 * Created by 19734 on 2018/6/6.
 */
import config_app from '../../../config/app'
const state={
  auth:localStorage.hasOwnProperty('token') && localStorage.getItem('token'),
  token:localStorage.getItem('token'),
  passport:config_app.passport,
  me:localStorage.hasOwnProperty('user') ? localStorage.getItem('user'):{},
};
const mutations={
  setAuth: (state, value) => state.auth = value,
  setMe: (state, value) => state.me = value,
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
    commit('setMe', user);
    localStorage.setItem('user', user);
  }
};
const getters={
  passport:state => state.passport,
  token:state => state.token,
  me:state=>state.me
};
export default {
  state,
  mutations,
  actions,
  getters
}
