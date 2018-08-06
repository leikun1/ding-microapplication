<template>
    <div class="field">
        <div class="control">
            <!--<input  type="hidden" :name="name" :value="value">-->
            <img :src="(value != '' && value !== null) ? value : defaultImg"  :alt="name" @click="openCamera()" style="height:100%;width:100%;">
        </div>
    </div>
</template>
<script>
  import {post} from '../../../../utils/http'
  export default {
    name: 'inputComponent',
    components: {
    },
    props: {
      name: {
        type: String,
        default: 'fieldName'
      },
      value: [String, Number],
    },
    data(){
      return {
        defaultImg: 'https://orangecredit.oss-cn-hangzhou.aliyuncs.com/templet/dianjipaizhao.png',
        currentValue:this.value
      }
    },
    mounted () {
      this.$nextTick(function () {

      })
    },
    computed:{

    },
    methods: {
      setCurrentValue(value) {
        if (value === this.currentValue) return;
        this.currentValue = value;
        this.$emit('input', value);
      },
      openCamera: function() {   // 调用企业微信 打开摄像头
        let _this=this
        _this.$dd.ready(function () {
          _this.$dd.biz.util.uploadImageFromCamera({
            compression: true,//(是否压缩，默认为true压缩)
            quality: 50, // 图片压缩质量,
            resize: 50, // 图片缩放率
            stickers: {   // 水印信息
              time: "08:35",
              dateWeather: "2016.05.06 周六·晴转多云 16℃",
              username: "王晓",
              address: "西湖·杭州"
            },
            onSuccess : function(result) {
              _this.setCurrentValue(result)
            },
            onFail : function(err) {
              alert(JSON.stringify(err));
            }
          });
        });
      },
      uploadHead(imgPath) {
        let _this=this
        let image = new Image();
        image.src = imgPath;
        image.onload = function() {
          alert(JSON.stringify(_this.getBase64Image(image)));
          post('sale/images/upload',{imageBase64:_this.getBase64Image(image)}).then(function (response) {
            _this.setCurrentValue(response.data.imageUrl)
          }).catch(function (error) {

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
    },
    watch: {
      value(val) {
        this.setCurrentValue(val);
      }
    }
  }
</script>
