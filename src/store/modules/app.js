/**
 * Created by 19734 on 2018/6/6.
 */
export const ROUTER_ACTIVE = 'ROUTER_ACTIVE';
const state={
  config:{
    apiUrl:'http://testworkwx.utotu.cn/',
  }
};
const getters={
  config:state => state.config,
};

export default {
  state,
  getters,
  mutations,
  actions
}
