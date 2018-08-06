<template>
  <div>
    <div class="app-header">
      <mu-appbar style="width: 100%;" color="primary">
        <mu-button icon slot="left" @click.prevent="goBack()">
          <mu-icon value="keyboard_arrow_left"></mu-icon>
        </mu-button>
        草稿详情
      </mu-appbar>
    </div>
    <div class="app-main">
      <div>
        <sale-form :field="field"  @formData="formData"></sale-form>
      </div>
      <div style="display: flex;justify-content: center;background-color: #ffffff;position: fixed;bottom: 0;width: 100%;">
        <mu-button color="primary" @click="updateDraft()">更新草稿</mu-button>
        <mu-button color="pink500" @click="saveSaleInfo()">登记客户</mu-button>
        <mu-button color="red500" @click="deleteDraft()">删除草稿</mu-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions,mapGetters } from 'vuex';
  import {post,get,patch,deleteHttp} from '../../utils/http'
  import SaleForm from '../sale/SaleForm.vue'
  export default {
    name: 'customerCreate',
    components:{
      SaleForm
    },
    data () {
      return {
        field:{
          name:'关伟',
          phone:'1',
          address:'1',
          lng:'1',
          lat:'1',
          orientation:'1',
          areaid:'1',
          businessLicense: '1',
          idcardPos: '1',
          idcardNega: '1',
          storePhoto: '1',
          applicationForm: '1',
          manInStore: '1',
          storeInPhoto: '1',
          perimeter: '1',
          otherImg: '1',
        },
        form:{},
      }
    },
    computed:{
      ...mapGetters([
        'config'
      ])
    },
    created() {

    },
    mounted(){
      this.$nextTick(function () {
        this.getDraftInfo();
      })
    },
    methods: {
      getDraftInfo(){
        let _this=this
        let draft_id=_this.$route.params.id;
        get('drafts/'+draft_id+'/edit').then(function (response) {
          _this.field=JSON.parse(response.data.data.data);
        }).catch(function (error) {
          console.log('请求失败')
        });
      },
      updateDraft(){
        let _this=this
        let draft_id=_this.$route.params.id;
        patch('drafts/'+draft_id,_this.form).then(function (response) {
          _this.$toast.success('草稿更新成功，跳转到草稿箱');
          _this.$router.push({name:'Draft'})
        }).catch(function (error) {
          console.log(13231)
        });
      },
      saveSaleInfo(){
        let _this=this
        post('sales',_this.form).then(function (response) {
          deleteHttp('drafts/'+draft_id).then(function (response) {
            _this.$toast.success('客户登记成功，等待审核，草稿已失效,跳转到草稿箱');
            _this.$router.push({name:'Draft'})
          });
        }).catch(function (error) {
           _this.$toast.fail('登记失败，请确认信息项是否已经填');
        });
      },
      deleteDraft(){
        let _this=this;
        let draft_id=_this.$route.params.id;
        deleteHttp('drafts/'+draft_id).then(function (response) {
          _this.$toast.success('草稿删除成功，跳转到草稿箱');
          _this.$router.push({name:'Draft'})
        });
      },
      formData(formData){
        this.form=formData
      },
      goBack(){
        this.$router.push({path:'/'})
      },
    }
  }
</script>
<style lang="scss">

</style>

