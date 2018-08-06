<template>
    <div>
        <div class="columns" v-if="listData.length>0" v-for="(value,index) in controlData">
            <div v-show="value.is_show">
                <div class="column">
                    <div  v-if="value.type==='input'">
                        <field-input :label="value.name" :name="value.field" v-model="value.values"></field-input>
                    </div>
                </div>
                <div class="column" v-if="value.type==='textarea'">
                    <field-textarea :label="value.name" :name="value.field" v-model="value.values"></field-textarea>
                </div>
               <!-- <div class="column" v-if="value.type==='position'">
                    <field-location :label="value.name" :name="value.field" v-model="value.values"></field-location>
                </div>-->
               <!-- <div class="column" v-if="value.type==='positionWithMap'">
                    <field-location-with-map :label="value.name" :name="value.field" v-model="value.values"></field-location-with-map>
                </div>-->
                <div class="column" v-if="value.type==='radio'">
                    <field-radio :label="value.name" :name="value.field" :array="value.array" v-model="value.values"></field-radio>
                </div>
                <div class="column" v-if="value.type==='checkbox'">
                    <field-checkbox :label="value.name" :name="value.field" :array="value.array" v-model="value.values"></field-checkbox>
                </div>
              <!--  <div class="column" v-if="value.type==='date'">
                    <field-date :label="value.name" :name="value.field" :array="value.array" v-model="value.values"></field-date>
                </div>-->

                <div class="column" v-if="value.type==='camera'">
                    <field-camera :label="value.name" :name="value.field" v-model="value.values"></field-camera>
                </div>
               <!-- <div class="column" v-if="value.type==='cameraMany'">
                    <field-camera-many :label="value.name" :name="value.field" v-model="value.values"></field-camera-many>
                </div>-->
                <div class="column" v-if="value.type==='img'">
                    <FieldImg :label="value.name" :name="value.field" v-model="value.values"></FieldImg>
                </div>
                <div class="column" v-if="value.type==='file'">
                    <FieldFile :label="value.name" :name="value.field" v-model="value.values"></FieldFile>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import FieldInput from './field/input/FieldInput.vue'
    import FieldTextarea from './field/textarea/FieldTextarea.vue'
    import FieldRadio from './field/radio/FieldRadio.vue'
    import FieldCheckbox from './field/checkbox/FieldCheckbox.vue'
    import FieldCamera from './field/camera/FieldCamera.vue'
    import FieldImg from './field/img/FieldImg'
    import FieldFile from './field/file/FieldFile'
    export default {
        name: 'inputComponent',
        components: {
            FieldInput,
            FieldTextarea,
            FieldRadio,
            FieldCheckbox,
            FieldCamera,
            FieldImg,
            FieldFile
        },
        props: {
            list: {
                type: Array,
                default:[]
            }
        },
        data(){
            return {
                listData:[],
            }
        },
        mounted () {
            this.$nextTick(function () {
                this.setCurrentValue(this.list);
            })
        },
        computed:{
            controlData(){
                let _this=this;
                let data=_this.listData
                data.forEach(function(value,index){
                    if(value.show_where.length>0){
                        value.is_show=false
                        let show_where=JSON.parse(value.show_where)
                        _this.listData.forEach(function(listValue){
                            if(listValue.field===show_where.field&&listValue.values===show_where.value){
                                value.is_show=true
                            }
                        })
                    }else{
                        value.is_show=true
                    }
                })
                return data;
            }
        },
        methods: {
            setCurrentValue(val) {
                let _this=this
                _this.listData = val;
                this.$emit('fromData',this.listData);
            },
            setIsShow(){
                let _this=this;
                _this.controlData.forEach(function(value,index){
                    if(value.show_where.length>0){
                        value.is_show=false
                        let show_where=JSON.parse(value.show_where)
                        _this.listData.forEach(function(listValue){
                            if(listValue.field===show_where.field&&listValue.values===show_where.value){
                                value.is_show=true
                            }
                        })
                    }else{
                        value.is_show=true
                    }
                })
            }
        },
        watch: {
            controlData: {
                handler: function (val) {
                    this.setIsShow(val);
                    this.setCurrentValue(val)
                },
                deep: true
            }
        }
    }
</script>
