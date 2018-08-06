<template>
    <div class="box">
        <label class="label">{{label}}</label>
        <div>
            <div  v-for="(v,k) in img_arr" class="columns">
                <div class="column is-10" style="flex-wrap: wrap;height: 100px;">
                    <img :src="v"  :alt="name" @click="clickImg(k)" style="width: 100%;height: 100%;">
                </div>
            </div>
            <a class="button is-small is-info"  @click="openCamera()">上传图片</a>
        </div>
        <card-modal :visible="is_sure" title="确认删除？" @ok="click_sure" ok-text="确定"  cancel-text="取消" @close="close" @cancel="close">
        </card-modal>
    </div>
</template>
<script>
    import { Modal,CardModal } from '../../../modal'
    export default {
        name: 'inputComponent',
        components: {
            Modal,
            CardModal
        },
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
                currentValue:'',
                img_arr: [],
                is_sure:false,
                delete_id: ''
            }
        },
        mounted () {
            this.$nextTick(function () {
                //this.img_arr = this.value
                this.setCurrentValue(this.value)
            })
        },
        computed:{

        },
        methods: {
            setCurrentValue(value) {
                if(!value){
                    return false;
                }
                if(this.currentValue.length > 0){
                    this.currentValue = this.currentValue+','+value;
                }else{
                    this.currentValue=this.currentValue+value;
                }
                if(this.currentValue.length>0){
                    this.img_arr=this.currentValue.split(',');
                }
                this.$emit('input', this.currentValue);
            },
            handInput(){
                const value = event.target.value;
                this.$emit('input', value);
                this.setCurrentValue(value);
            },
            openCamera: function() {   // 调用企业微信 打开摄像头
                let _this = this
                window.wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        localIds = localIds.toString()
                        if(window.__wxjs_is_wkwebview){
                            window.wx.getLocalImgData({
                                localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                                success: function (res) {
                                    let localData = res.localData;
                                    localData = localData.replace('jgp', 'jpeg');
                                    // 发送请求，将图片通过本地方法发送至阿里服务器上
                                    let request = new XMLHttpRequest()
                                    request.open('POST', '/wechat/saleImgUpload', false) // 第三个参数 false 代表设置同步请求
                                    request.setRequestHeader('Accept', 'application/json');
                                    request.setRequestHeader('Content-Type', 'application/json');
                                    request.onreadystatechange  = function(){
                                        let returnText = request.responseText
                                        if( request.status === 200 ){
                                            _this.setCurrentValue((JSON.parse(returnText)).path)
                                        }
                                    }
                                    request.send(JSON.stringify({file: localData}))
                                },
                                fail:function(res){
                                    _this.tipError(res.errMsg);
                                }
                            })
                        }else{
                            window.wx.uploadImage({
                                localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    // 1、返回成功，表示图片已经在本地缓存上
                                    let serverId = res.serverId // 返回图片的服务器端ID
                                    // 2、发送请求，将图片通过本地方法发送至阿里服务器上
                                    let request = new XMLHttpRequest()
                                    request.open('POST', '/wechat/saleImgUpload', false) // 第三个参数 false 代表设置同步请求
                                    request.setRequestHeader('Accept', 'application/json');
                                    request.setRequestHeader('Content-Type', 'application/json');
                                    request.onreadystatechange  = function(){
                                        let returnText = request.responseText
                                        if( request.status === 200 ){
                                            _this.setCurrentValue((JSON.parse(returnText)).path)
                                        }
                                    }
                                    request.send(JSON.stringify({serverId: serverId}))
                                }
                            });
                        }
                    }
                })
            },
            clickImg(val){
                this.is_sure = 'is-active'
                this.delete_id = val
            },
            close(){
                this.is_sure = false
            },
            click_sure(){
                this.img_arr.splice(this.delete_id,1)
                if( this.img_arr.length === 0){
                    this.currentValue = ''
                }else{
                    this.currentValue = this.img_arr.join()
                }
                this.$emit('input', this.currentValue);
                this.is_sure = false
            }
        },
        watch: {

        }
    }
</script>
