<template>
    <div class="file has-name">
        <label class="file-label">
            <input id="uploadFile" class="file-input" type="file" :name="name" value="" @change="updateFile()">
            <span class="file-cta">
      <span class="file-icon">
        <i class="fa fa-upload"></i>
      </span>
      <span class="file-label">
       {{label}}
      </span>
    </span>
            <span class="file-name">
     {{path}}
    </span>
        </label>
    </div>
</template>
<script>
    import {get,post} from '../../../../utils/http'
    export default {
        name: 'FileComponent',
        components: {
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
            type: {
                type: String,
                default: 'text'
            }
        },
        data(){
            return {
                currentValue:this.value,
                path:'...',
                format: ''
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
            },
            handInput(event){
                const value = event.target.value;
                console.log('val'+value)
                this.$emit('input', value);
                this.setCurrentValue(value);
            },
            updateFile(){
                let _this = this
                let fileHead = document.getElementById('uploadFile')
                let file  = fileHead.files[0]
                let fielName = file.name
                this.path = fileHead.value;
                // 判断浏览器是否支持FileReader接口
                if (typeof FileReader === undefined) {
                    console.log('你的浏览器不支持FileReader接口！')
                }
                let reader = new FileReader()
                // 将文件以Data URL形式读入页面
                reader.onload = function (event) {
                    let content = event.target.result
                    _this.uploadFileFunction(content)
                }
                var index=fielName.lastIndexOf(".");
                _this.format =fielName.substring(index+1,fielName.length);
                reader.readAsDataURL(file)
            },
            uploadFileFunction(val){
                let _this = this
                post('saleImgUpload',{file:val,fileFormat:_this.format}).then(function (response) {
                    if (response.data.status !== 200) {
                        _this.$message({
                            message: response.data.msg,
                            type: 'error'
                        });
                    }
                    if(response.data.status === 200){
                        let file_url = ''
                        _this.$message({
                            message: response.data.msg,
                            type: 'success'
                        });
                        file_url = response.data.data
                        _this.$emit('input', file_url);
                        _this.setCurrentValue(file_url);
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        watch: {
           value(val) {
                this.setCurrentValue(val);
            }
        }
    }
</script>