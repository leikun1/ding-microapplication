/**
 * Created by 19734 on 2018/7/30.
 */
import axios from 'axios';
export default {
  jsApiOAuth(api,jsApiList){
    return new Promise(function(resolve,reject){
      axios.get(api).then(function(response){
        const data = response.data.data;
        const config = {
          agentId: data.agentId || '',
          corpId: data.corpId || '',
          timeStamp: data.timeStamp || '',
          nonceStr: data.nonceStr || '',
          signature: data.signature || '',
          jsApiList: jsApiList || []
        };
        resolve(response);
      }).catch(function(error){
        reject({
          errcode: 100,
          errmsg: 'js api auth request bad',
          error: error
        });
        // alert('sign request error' + JSON.stringify(error));
      });
    });

  }
}