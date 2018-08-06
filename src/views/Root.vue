<template>
    <div class="">
        <div class="header">
            <mu-appbar style="width: 100%;" color="primary" center>
                <p style="text-align: center;">控制台</p>
            </mu-appbar>
        </div>
        <div class="main">
            <mu-container>
                <mu-row class="notice">
                    <mu-col span="12">
                        <div class="grid-cell">通知</div>
                    </mu-col>
                </mu-row>
                <mu-row class="dealt-list">
                    <mu-col span="12">
                        <div class="">
                            <div style="display: flex;align-items: center;">
                              <span style="width: 1rem;height: 1rem;display: inline-flex;">
                                       <img src="../assets/images/options.svg" alt="" style="width: 100%;height: 100%;">
                               </span>
                                <span style="margin-left: 0.5rem;">待办事项</span>
                            </div>
                            <hr>
                            <mu-row gutter>
                                <!-- <mu-col span="3">

                                     <div class="deal-list">
                                         <mu-badge :content="count.task.sale_j" circle color="#f44336"  class="draft-badge">
                                             <mu-paper class="draft-content" :z-depth="2" >
                                                 <a>
                                                     <div class="" style="display: flex;justify-content: center;align-items: center;margin-top: 0.5rem;">
                                                         <span style="color: #0a0a0a;">销售紧急</span>
                                                     </div>
                                                 </a>
                                             </mu-paper>
                                         </mu-badge>
                                     </div>
                                 </mu-col>-->
                                <mu-col span="3">
                                    <div class="deal-list">
                                        <mu-badge :content="count.task.sale_d" circle color="primary"  class="draft-badge">
                                            <mu-paper class="draft-content" :z-depth="2" >
                                                <router-link to="/tasks/sale">
                                                    <div class="" style="display: flex;justify-content: center;align-items: center;margin-top: 0.5rem;">
                                                        <span style="color: #0a0a0a;font-size: 14px;">销售待办</span>
                                                    </div>
                                                </router-link>
                                            </mu-paper>
                                        </mu-badge>
                                    </div>
                                </mu-col>
                                <!-- <mu-col span="3">
                                     <div class="deal-list">
                                         <mu-badge :content="count.task.review_j" circle color="#f44336"  class="draft-badge">
                                             <mu-paper class="draft-content" :z-depth="2" >
                                                 <a>
                                                     <div class="" style="display: flex;justify-content: center;align-items: center;margin-top: 0.5rem;">
                                                         <span style="color: #0a0a0a;">回访紧急</span>
                                                     </div>
                                                 </a>
                                             </mu-paper>
                                         </mu-badge>
                                     </div>
                                 </mu-col>-->
                                <mu-col span="3">
                                    <div class="deal-list">
                                        <mu-badge :content="count.task.review_d" circle color="primary"  class="draft-badge">
                                            <mu-paper class="draft-content" :z-depth="2" >
                                                <router-link to="/tasks/review">
                                                    <div class="" style="display: flex;justify-content: center;align-items: center;margin-top: 0.5rem;">
                                                        <span style="color: #0a0a0a;font-size: 14px;">回访待办</span>
                                                    </div>
                                                </router-link>
                                            </mu-paper>
                                        </mu-badge>
                                    </div>
                                </mu-col>
                            </mu-row>
                        </div>
                    </mu-col>
                </mu-row>
                <mu-row>
                    <mu-col span="12">
                        <div class="customer" style="margin: 1rem 0;">
                            <div style="display: flex;align-items: center;">
                              <span style="width: 1rem;height: 1rem;display: inline-flex;">
                                       <img src="../assets/images/add_user.svg" alt="" style="width: 100%;height: 100%;">
                               </span>
                                <span style="margin-left: 0.5rem;"> 客户登记</span>
                            </div>
                            <hr>
                            <mu-row gutter>
                                <mu-col span="6">
                                    <div class="draft">
                                        <mu-badge :content="count.draft" circle color="primary"  class="draft-badge">
                                            <mu-paper class="draft-content" :z-depth="2">
                                                <router-link to="/drafts">
                                                    <div class="" style="display: flex;justify-content: center;align-items: center;">
                                                       <span style="width: 1.5rem;height: 1.5rem;display: inline-flex;">
                                                            <img src="../assets/images/draft.svg" alt="" style="width: 100%;height: 100%;">
                                                       </span>
                                                    </div>
                                                    <div class="" style="display: flex;justify-content: center;align-items: center;margin-top: 0.5rem;">
                                                        <span style="color: #0a0a0a;">草稿</span>
                                                    </div>
                                                </router-link>
                                            </mu-paper>
                                        </mu-badge>
                                    </div>
                                </mu-col>
                                <mu-col span="6">
                                    <div class="" style="display: flex;justify-content: center;align-items: center;padding: 1rem;">
                                        <mu-paper class="create" :z-depth="2">
                                            <router-link to="/customers/create">
                                                <div class="" style="display: flex;justify-content: center;align-items: center;">
                                                   <span style="width: 1.5rem;height: 1.5rem;display: inline-flex;">
                                                        <img src="../assets/images/user_add.svg" alt="" style="width: 100%;height: 100%;">
                                                   </span>
                                                </div>
                                                <div class="" style="display: flex;justify-content: center;align-items: center;margin-top: 0.5rem;">
                                                    <span style="color: #0a0a0a;">新增登记</span>
                                                </div>
                                            </router-link>
                                        </mu-paper>
                                    </div>
                                </mu-col>
                            </mu-row>
                        </div>
                    </mu-col>
                </mu-row>
            </mu-container>
        </div>
        <footer class="footer">
            <bottom-bar></bottom-bar>
        </footer>
    </div>
</template>
<script>
    import BottomBar from './layouts/BottomBar.vue'
    import {post,get} from '../utils/http';
    import { mapActions,mapGetters } from 'vuex';
    import app_config from '../config/app';
    import ding_config from '../config/ding';
    import DingUser from '../plugins/dingding/user';
    import axios from 'axios';
  export default {
    name: 'Root',
    components:{
      BottomBar
    },
    data () {
      return {
        ding_user_id:0,
        count:{
          task:{
            sale_j:'0',
            sale_d:'0',
            review_j:'0',
            review_d:'0',
          },
          draft:'0'
        }
      }
    },
    computed:{
      ...mapGetters([
        'auth','passport','user'
      ])
    },
    created() {
    },
    mounted(){
        let _this=this;
        if(!this.auth){
          _this.$dd.ready(function(){
            _this.$dd.runtime.permission.requestAuthCode({
              corpId: ding_config.config.corpId,
              onSuccess: function(result) {
                _this.getDingUserId(result.code)
              },
              onFail : function(err) {
                alert('code error'+JSON.stringify(err))
              }
            });
          });
          _this.$watch('ding_user_id',function(){
            _this.getDingUserInfo();
          });
        }
        _this.getRootData();
    },
    methods: {
        ...mapActions([
            'login','setUser'
        ]),
      getRootData(){
        let _this=this;
        get('home').then(function (response) {
            _this.count.task.sale_d=response.data.data['sale_task_count']+'';
            _this.count.task.review_d=response.data.data['review_task_count']+'';
            _this.count.draft=response.data.data['draft_count']+'';
            }).catch(function (error) {

            });
        },
        getDingUserId(code){
          let _this=this
          DingUser.getUserId(code).then(function (response) {
            _this.ding_user_id=response.data.data
          }).catch(function (error) {
            alert('userid error'+JSON.stringify(error))
          })
        },
        getDingUserInfo(){
          let _this=this
          DingUser.getUserInfo(_this.ding_user_id).then(function (response) {
            _this.login(response.data.data['passport_access_token']);
            _this.setUser(JSON.stringify(response.data.data['user_info']));
          }).catch(function (error) {
            alert('userInfo error'+JSON.stringify(error))
          })
        }

    }
  }
</script>
<style lang="scss">
    .notice{
        border-radius: 2px;
        padding: 0.5rem;
        margin: 0.5rem 0;
        background: rgba(255, 255, 255, 0.8);
    }
    .customer {
        border-radius: 2px;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.8);
    .draft{
        padding: 1rem;
    }
    .create{
        padding: 1rem;
    }
    }

    .dealt-list{
        border-radius: 2px;
        padding: 1rem;
        margin-top: 1rem;
        background: rgba(255, 255, 255, 0.8);
    }
    .task-list{
        background-color: #ffffff;
        padding: 1rem;
        border-radius: 5px;margin: 2px 0;
    .task-list-header{
        display: flex;justify-content: space-between;align-items: center;
    .task-list-header-title{
        display: flex;flex-wrap: wrap; font-weight: 600;
    }
    .task-list-header-buttons{
        margin-left: 10px; min-width: 110px;display: flex;justify-content: center;
    }
    }
    .task-list-content{
        padding: 0.5rem 0;
    }
    }
    .draft{
    .draft-content{
        width: 7rem;
        height: 7rem;
        padding: 1rem;
    }
    }
    .create{
        width: 7rem;
        height: 7rem;
        padding: 1rem;
    }
    .deal-list{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    .draft-content{
        width: 4rem;
        height: 4rem;
        padding: 0.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    }
</style>
