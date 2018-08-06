<template>
    <div>
        <div>
            <img :src="(value != '' && value !== null) ? value : defaultImg"  :alt="name" @click="openCamera()" style="width: 60%;height: 30%;">
            <label class="label">{{label}}</label>
        </div>
        <input  id="iphoneOpenCameraInput" v-show="false" type="file" accept="image/*" @change="showImg()" value="">
        <canvas id='canvas' v-show="false"></canvas>
    </div>
</template>
<script>
    import {get,post} from '../../../../utils/http'
    export default {
        props: {
            name: {
                type: String,
                default: 'fieldName'
            },
            label: {
                type: String,
                default: 'fieldName'
            },
            value: [String, Number],
        },
        data(){
            return {
                defaultImg: '/images/default.png',
                currentValue:this.value,
                handelImgId: '',
            }
        },
        methods: {
            setCurrentValue(value) {
                if (value === this.currentValue) return;
                this.currentValue = value;
            },
            handInput(){
                const value = event.target.value;
                this.$emit('input', value);
                this.setCurrentValue(value);
            },
            openCamera (imgId) {   // 手动点击选照片
                let _this = this
                _this.handelImgId = imgId
                document.getElementById('iphoneOpenCameraInput').click()
            },
            showImg () {
                let _this = this
                let fileHead = document.getElementById('iphoneOpenCameraInput')
                let picture = fileHead.value
                if (!picture.match(/.jpg|.gif|.png|.bmp/i)) {
                    console.log('error','格式错误，请重新选择')
                }
                _this.saveIOSANDChromePhoto(fileHead.files[0])
                !1
            },
            // 处理选中/拍照的照片
            saveIOSANDChromePhoto (file) {
                let _this = this
                // 判断浏览器是否支持FileReader接口
                if (typeof FileReader === undefined) {
                    console.log('你的浏览器不支持FileReader接口！')
                }
                if (!/image\/\w+/.test(file.type)) {
                    console.log('看清楚，这个需要照片')
                }
                let reader = new FileReader()
                // 将文件以Data URL形式读入页面
                reader.onload = function (event) {
                    let content = event.target.result
                    // 压缩处理
                    let canvas = document.getElementById('canvas')
                    canvas.getContext('2d')
                    let img = new Image()
                    img.onload = function () {
                        canvas.width = this.width
                        canvas.height = this.height
                        let context = canvas.getContext('2d')
                        context.drawImage(this, 0, 0, this.width, this.height)
                        let base64 = canvas.toDataURL('image/jpeg')
                        _this.uploadImgFunction(base64)
                    }
                    img.src = content
                    // 压缩处理结束
                }
                reader.readAsDataURL(file)
            },
            uploadImgFunction (image) {
                let _this = this

                post('saleImgUpload',{file:image}).then(function (response) {
                    if (response.status !== 200) {
                        console.log('error','网络错误，请检查网络')
                        return false
                    }
                    if(response.data.error){
                        console.log(response.data.error)
                        return false
                    }
                    if(response.status === 200){
                        let pic_url = ''
                        pic_url = response.data.path
                        _this.$emit('input', pic_url);
                        _this.setCurrentValue(pic_url);
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        },
        watch: {
            value(val) {
                this.setCurrentValue(val);
            }
        }
    }
</script>
