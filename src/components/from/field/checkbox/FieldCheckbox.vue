<template>
    <div class="field">
        <label class="label">{{label}}</label>
        <div class="control">
            <label class="checkbox" v-for="(v,k,i) in list">
                <input  type="checkbox" :name="name" :value="v" v-model="currentValue">
                {{v}}
            </label>
        </div>
    </div>
</template>
<script>
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
            value: [String, Number,Boolean],
            type: {
                type: String,
                default: 'text'
            },
            array:{
                type:String,
                default:'是,否'
            }
        },
        data(){
            return {
                list:this.array.split(','),
                currentValue:[]
            }
        },
        mounted () {
            let _this=this
            this.$nextTick(function () {
                _this.setCurrentValue(_this.value)
            })
        },
        computed:{

        },
        methods: {
            setCurrentValue(value) {
                if (value === this.currentValue) return;
                this.currentValue = value.split(',');
                this.$emit('input', this.currentValue.join(','));
            }
        },
        watch: {
            value(val) {
                this.setCurrentValue(val);
            },
            currentValue(){
                this.$emit('input', this.currentValue.join(','));
            }
        }
    }
</script>