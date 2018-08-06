<template>
    <div>
        <div class="app-header">
            <mu-appbar style="width: 100%;" color="primary">
                <mu-button icon slot="left" @click.prevent="goBack()">
                    <mu-icon value="keyboard_arrow_left"></mu-icon>
                </mu-button>
                客户登记
            </mu-appbar>
        </div>
        <div class="app-main">
            <div>
                <sale-form :field="field"  @formData="formData"></sale-form>
            </div>
            <div style="display: flex;justify-content: center;background-color: #ffffff;position: fixed;bottom: 0;width: 100%;">
                <mu-button color="primary" @click="saveDraft()">保存草稿</mu-button>
                <mu-button color="secondary" @click="saveSaleInfo()">直接提交</mu-button>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import { mapActions,mapGetters } from 'vuex';
  import {post} from '../../utils/http';
  import SaleForm from '../sale/SaleForm.vue'
export default {
  name: 'customerCreate',
  components:{
    SaleForm
  },
  data () {
    return {
        field:{
          name:'',
          phone:'',
          address:'',
          lng:'',
          lat:'',
          orientation:'',
          areaid:'',
          businessLicense: '',
          idcardPos: '',
          idcardNega: '',
          storePhoto: '',
          applicationForm: '',
          manInStore: '',
          storeInPhoto: '',
          perimeter: '',
          otherImg: '',
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
  methods: {
    saveSaleInfo(){
      let _this=this
      post('sales',_this.form).then(function (response) {
        _this.$toast.success('客户登记成功，等待审核，跳转到个人中心');
        _this.$router.push({name:'Person'})
      }).catch(function (error) {
        _this.$toast.fail('登记失败，请确认信息项是否已经填');
      });
    },
    saveDraft(){
      let _this=this;
      post('drafts',_this.form).then(function (response) {
        _this.$toast.success('草稿保存成功，跳转到草稿箱');
        _this.$router.push({name:'Draft'})
      }).catch(function (error) {
        console.log('上传失败')
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
