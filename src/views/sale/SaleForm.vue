<template>
    <div>
        <mu-tabs :value.sync="active" >
            <mu-tab>基础信息</mu-tab>
            <mu-tab>照片信息</mu-tab>
        </mu-tabs>
        <div class="base" v-if="active === 0" style="margin-top: 1rem;">
            <van-cell-group>
                <van-field v-model="form.name" label="客户姓名" placeholder="请输入客户姓名" />
            </van-cell-group>
            <van-cell-group>
                <van-field v-model="form.phone" label="联系电话" placeholder="请输入客户联系电话" />
            </van-cell-group>
            <van-cell-group>
                <van-field v-model="area" label="当前区域" placeholder="请选择区域" disabled icon="arrow" @click-icon="selectArea()" />
            </van-cell-group>
            <van-popup v-model="show" position="bottom" :overlay="true">
                <van-picker
                        show-toolbar
                        :columns="columns"
                        @confirm="show = false"
                        @cancel="show = false"
                        @change="onChange"
                />
            </van-popup>
            <van-cell-group>
                <van-field
                        center
                        v-model="location_address"
                        label="经营位置"
                        placeholder="点击获取定位地址"
                        disabled
                >
                    <van-button slot="button" size="small" type="primary" @click="getLocation()">获取</van-button>
                </van-field>
            </van-cell-group>
            <van-cell-group>
                <van-field
                        v-model="form.address"
                        label="经营地址"
                        type="textarea"
                        placeholder="请输入经营地址"
                        rows="4"
                        autosize
                />
            </van-cell-group>
        </div>
        <div class="" v-if="active === 1" style="margin-top: 1rem;height: 100%;overflow-y: auto;">
            <van-cell-group v-for="(value,index) in imgList" :key="index">
                <p style="padding: 0.2rem;display: flex;align-items: center;">{{value.title}}</p>
                <hr>
                <van-row>
                    <van-col span="12">
                        <div style="display: flex;justify-content: center;">
                          <span class="fh-img-span">
                                <img class="fh-img-img" slot="icon" :src="value.src" style="width:130px;height:100px;">
                            </span>
                        </div>
                    </van-col>
                    <van-col span="12">
                        <div style="display: flex;justify-content: center;">
                           <!--<span class="fh-img-span" @click="clickCheckImg(value.field)">
                                 <img class="fh-img-img" slot="icon" :src="form[value.field] || defaultImg" style="width:130px;height:100px;">
                            </span>-->
                            <div style="width:130px;height:100px;"> <camera v-model="form[value.field]"></camera></div>
                        </div>
                    </van-col>

                </van-row>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import { mapActions,mapGetters } from 'vuex';
  import {get,post} from '../../utils/http';
  import Camera from '../../components/from/field/camera/Camera.vue';
export default {
  name: 'customerCreate',
  components:{
    Camera
  },
  props: {
    field: {
      type: Object
    }
  },
  data () {
    return {
        location:'',
        location_address:'',
        active:0,
        area:'请选择区域',
        show:false,
        columns: ['', '宁波', '温州', '嘉兴', '湖州'],
        form:{},
        defaultImg: 'https://orangecredit.oss-cn-hangzhou.aliyuncs.com/templet/dianjipaizhao.png',  // 无图则显示默认图片
        imgList: [
        {
          src: 'https://orangecredit.oss-cn-hangzhou.aliyuncs.com/templet/yingyezhizhao.jpg',
          title: '营业执照',
          field: 'businessLicense'
        }, {
          src: 'https://orangecredit.oss-cn-hangzhou.aliyuncs.com/templet/shenfenzheng_zhen.jpg',
          title: '身份证正面',
          field: 'idcardPos'
        }, {
          src: 'https://orangecredit.oss-cn-hangzhou.aliyuncs.com/templet/shenfenzheng_fan.jpg',
          title: '身份证反面',
          field: 'idcardNega'
        }, {
          src: 'https://orangecredit.oss-cn-hangzhou.aliyuncs.com/templet/mentouzhao.jpg',
          title: '店铺门头照',
          field: 'storePhoto'
        }, {
          src: 'https://orangecredit.oss-cn-hangzhou.aliyuncs.com/templet/shenqingbiao.jpg',
          title: '申请表照片',
          field: 'applicationForm'
        }, {
          src: 'https://orangecredit.oss-cn-hangzhou.aliyuncs.com/templet/dianpuneizhaopian.jpg',
          title: '店铺内照片',
          field: 'manInStore'
        }, {
          src: 'https://orangecredit.oss-cn-hangzhou.aliyuncs.com/templet/kehuheying.JPG',
          title: '客户合影',
          field: 'storeInPhoto'
        }, {
          src: 'https://orangecredit.oss-cn-hangzhou.aliyuncs.com/templet/zhoubian.jpg',
          title: '周边照片',
          field: 'perimeter'
        }, {
          src: 'https://orangecredit.oss-cn-hangzhou.aliyuncs.com/templet/fujiazhaopian.png',
          title: '附加照片',
          field: 'otherImg'
        }
        ]  // 拍照信息列表
    }
  },
  computed:{
    ...mapGetters([
      'config'
    ])
  },
  created() {

  },
  mounted () {
    this.jsApiOauth();
    this.$nextTick(function () {
      this.form=this.field;
    })
  },
  methods: {
    jsApiOauth(){
      let _this=this;
      let jsApiList=['biz.util.uploadImageFromCamera']
      get('ding/jsApiOauth?url='+encodeURIComponent(location.href)).then(function (response) {
        const config = {
          agentId: response.data.data['gentId']|| '',
          corpId:response.data.data['corpId']|| '',
          timeStamp:response.data.data['timeStamp']|| '',
          nonceStr:response.data.data['nonceStr']||'',
          signature:response.data.data['signature']|| '',
          jsApiList: jsApiList || []
        };
        _this.$dd.config(config);
        _this.$dd.error(function(err) {
          alert('dd error: ' + JSON.stringify(err));
        });
      }).catch(function (error) {

      })
    },
    selectArea(){
      this.show=true;
    },
    onChange(picker, value, index){
      this.area=value;
    },
    getLocation(){
      plus.geolocation.getCurrentPosition( this.geoInfo, function ( e ) {
          alert("获取位置信息失败：请检查权限")
      });
    },
    geoInfo( position ) {
      this.location_address=position.addresses;
      this.form.lng=position.coords.longitude;
      this.form.lat=position.coords.latitude;
      this.form.orientation=position.addresses+'|'+position.coords.longitude+'|'+position.coords.latitude
    },
    clickCheckImg(value){
        let _this=this
    },
    uploadHead(imgPath,value) {
      let _this=this
      let image = new Image();
      image.src = imgPath;
      image.onload = function() {
        axios.post(_this.config.apiUrl+'api/sale/images/upload',{imageBase64:_this.getBase64Image(image)}).then(function (response) {
          _this.form[value]=response.data.imageUrl;
        }).catch(function (error) {
            console.log('图片上传失败');
        });
      }
    },
    getBase64Image(img) {
      let canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > 800) {
          height = Math.round(height *= 800 / width);
          width = 800;
        }
      } else {
        if (height > 800) {
          width = Math.round(width *= 800 / height);
          height = 800;
        }
      }
      canvas.width = width;   /*设置新的图片的宽度*/
      canvas.height = height; /*设置新的图片的长度*/
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height); /*绘图*/
      let dataURL = canvas.toDataURL("image/jpg", 0.8);
      return dataURL.replace("data:image/jpg;base64,", "");
    },
    setCurrentValue(val){
      this.$emit('formData',val);
    }
  },
  watch: {
    field: {
      handler: function (val) {
        this.form=val
      },
      deep: true
    },
    form: {
      handler: function (val) {
        this.setCurrentValue(val)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss">

</style>
