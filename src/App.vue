<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  mounted(){
   /* let _this=this
    const config = {
      agentId: data.agentId || '',
      corpId: data.corpId || '',
      timeStamp: data.timeStamp || '',
      nonceStr: data.nonceStr || '',
      signature: data.signature || '',
      jsApiList: jsApiList || []
    };
    _this.$dd.config(config);*/
  }
}
</script>

<style lang="scss">
    @import '~bulma';
    body{
        font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
        background-color: rgba(242, 242, 242, 1);
    }
    .box{
        padding: 0.5rem 0.5rem;border-radius: 3px;box-shadow:3px;
    }
    .header{
        position: fixed;
        background: #0091DB;
        width: 100%;
        height: 52px;
        align-items: center;
        display:flex;
    .header-title{
        color: #ffffff;
        font-weight: 700;
        width: 100%;
        display: flex;
        font-size: 20px;
        justify-content: center;
    }
    }
    .main{
        min-height:calc(100vh - 52px);
        padding-top: 52px;
    }
    .footer{
        position: fixed;
        bottom: 0;
        width: 100%;
        padding:0;
        background: #0091DB;
        height:55px;
        display: flex;
        align-items: center;

    }
</style>
