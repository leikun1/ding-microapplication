<template>
  <div>
    <div class="app-header">
      <mu-appbar style="width: 100%;" color="primary" center>
        <p style="text-align: center;">客户管理</p>
      </mu-appbar>
    </div>
    <div class="app-main" >
      <mu-container>
        <mu-row>
          <mu-col span="6" gutter>
            <div class="" style="display: flex;justify-content: center;align-items: center;padding: 1rem;">
              <mu-paper class="sale-list" :z-depth="2">
                <router-link to="/sale/list">
                  <div class="" style="display: flex;justify-content: center;align-items: center;">
                         <span style="width: 1.5rem;height: 1.5rem;display: inline-flex;">
                              <img src="../../assets/images/user_add.svg" alt="" style="width: 100%;height: 100%;">
                         </span>
                  </div>
                  <div class="" style="display: flex;justify-content: center;align-items: center;margin-top: 0.5rem;">
                    <span style="color: #0a0a0a;">客户列表</span>
                  </div>
                </router-link>
              </mu-paper>
            </div>
          </mu-col>
          <mu-col span="6" gutter>
            <div class="" style="display: flex;justify-content: center;align-items: center;padding: 1rem;">
              <mu-paper class="sale-list" :z-depth="2">
                <router-link to="/sale/create">
                  ...
                </router-link>
              </mu-paper>
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
  import BottomBar from '../layouts/BottomBar.vue'
  import { mapActions,mapGetters } from 'vuex';
  export default {
    name: 'customer',
    components:{
      BottomBar
    },
    data () {
      return {
        active:'Customer'
      }
    },
    created() {

    },
    mounted(){

    },
    methods: {
      plusReady() {
        let cw = plus.webview.currentWebview()
      },
      camera(){
        let cmr = plus.camera.getCamera();
        let res = cmr.supportedImageResolutions[0];
        let fmt = cmr.supportedImageFormats[0];
        console.log("Resolution: "+res+", Format: "+fmt);
        cmr.captureImage( function( path ){
            alert( "Capture image success: " + path );
          },
          function( error ) {
            alert( "Capture image failed: " + error.message );
          },
          {resolution:res,format:fmt}
        );
      }
    }
  }
</script>
<style lang="scss">
  .sale-list{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 9rem;
    height: 9rem;
    padding: 1rem;
  }
</style>
