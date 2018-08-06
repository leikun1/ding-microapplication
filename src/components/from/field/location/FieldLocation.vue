<template>
   <div class="field">
       <label class="label">{{label}}</label>
       <div class="field has-addons has-addons-left">
           <div class="control">
               <input  class="input" :type="type" :name="name" v-model="orientation" placeholder="点击定位" @input="handInput" aria-readonly="true" disabled>
           </div>
           <div class="control">
               <button type="button" class="button" @click="getLocation">定位</button>
           </div>
       </div>
   </div>
</template>
<script>
    import {MP} from '../../../../map/map'
    export default {
        name: 'inputComponent',
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
                orientation:'',
                lng:'',
                lat:'',
            }
        },
        mounted () {
            let _this=this
            this.$nextTick(function () {
                if(_this.value!=='' && _this.value != null){
                    var locationArray1 =_this.value;
                    if(locationArray1.indexOf("|")>-1){
                        let locationArray=_this.value.split('|');
                        _this.orientation=locationArray[0];
                        _this.lng=locationArray[1];
                        _this.lat=locationArray[2];
                    }else{
                        _this.orientation=_this.value
                    }

                }
            })
        },
        computed:{

        },
        methods: {
            setCurrentValue() {
                this.currentValue = this.orientation+'|'+this.lng+'|'+this.lat;
                this.$emit('input', this.currentValue);
            },
            handInput(){
                this.$emit('input', this.currentValue);
                this.setCurrentValue();
            },
            getLocation () { //获取当前位置
                let _this = this
                MP().then(BMap => {
                    var BMap = new BMap.Geolocation()
                    BMap.getCurrentPosition(function (r) {
                        let province = r.address.province
                        let city = r.address.city
                        let district = r.address.district
                        let street = r.address.street
                        let streetNumber = r.address.street_number
                        _this.orientation = province + city + district + street + streetNumber
                        _this.lng = r.point.lng
                        _this.lat = r.point.lat
                    });
                });
            }
        },
        watch: {
            orientation(val) {
                this.setCurrentValue();
            }
        }
    }
</script>