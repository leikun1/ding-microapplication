/**
 * Created by 19734 on 2018/7/30.
 */
import config from '../../config/ding'
import axios from 'axios';
const user={
  getUserId(code){
    return new Promise(function(resolve, reject){
      axios.get(config.apiUrl+'users/userId/'+code).then(function(response){
        resolve(response);
      }).catch(function(error){
        reject(error);
      });
    });
  },
  getUserInfo(userId){
    return new Promise(function(resolve, reject){
      axios.get(config.apiUrl+'users/'+userId).then(function(response){
        resolve(response);
      }).catch(function(error){
        reject(error);
      });
    });
  }
}
export default user