/**
 * Created by 19734 on 2018/7/30.
 */
import app from './app'
export default {
  config:{
    agentId: '', // 服务端传来的congfig信息
    corpId: 'ding4211d9fcc33bd1dc35c2f4657eb6378f',
    timeStamp: '',
    nonceStr: '',
    signature: '',
    jsApiList: [ // 所有需要使用到的jsApi需要在config的时候进行注册，写在这里。
      'runtime.info',
      'biz.user.get',
      'biz.contact.choose',
      'biz.telephone.call',
      'biz.ding.post']
  },
  apiUrl:app.apiUrl+'/ding/',
}

