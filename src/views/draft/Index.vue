<template>
  <div class="">
    <div class="app-header">
      <mu-appbar style="width: 100%;" color="primary" center>
        <mu-button icon slot="left" @click.prevent="goBack()">
          <mu-icon value="keyboard_arrow_left"></mu-icon>
        </mu-button>
        <p style="text-align: center;">草稿箱</p>
      </mu-appbar>
    </div>
    <div class="main" style="padding-top:0.5rem;">
      <div class="draft-list">
        <div class="grid-cell">
          <mu-list class="draft-list">
            <mu-list-item  :ripple="false" v-for="(value,index) in computedDrafts" :key="index">
              <mu-list-item-title>{{value.data.name}}</mu-list-item-title>
              <mu-list-item-action>
                <router-link :to="'/drafts/'+value.id+'/show'"> <mu-icon value="info"></mu-icon></router-link>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions,mapGetters } from 'vuex';
  import {post,get} from '../../utils/http'
  export default {
    name: 'draft',
    components:{
    },
    data () {
      return {
        drafts:[]
      }
    },
    computed:{
      ...mapGetters([
        'user'
      ]),
      computedDrafts(){
          let drafts=this.drafts
          drafts.forEach(function (value) {
              value.data=JSON.parse(value.data)
          });
          return drafts;
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.getUserDrafts();
      })
    },
    methods: {
      goBack(){
        this.$router.push({path:'/'})
      },
      getUserDrafts(){
        let _this=this;
        let user=_this.user;
        get('users/'+user.id+'/drafts').then(function (response) {
          _this.drafts=response.data.data;
        }).catch(function (error) {
          alert(JSON.stringify(error));
        });
      }
    }
  }
</script>
<style lang="scss">
  .draft-list{
    border-radius: 2px;
    padding: 0.5rem;
    margin: 0.5rem 0;
    background: rgba(255, 255, 255, 0.8);
      li{
        border:1px solid #dddddd ;margin: 0.5rem;
        .mu-icon{
            color:#47D98F;
        }
    }
  }
</style>
