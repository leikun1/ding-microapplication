<template>
    <div class="field">
        <label class="label">{{label}} <a @click="clearValue">清除</a></label>
        <div class="control">
            <label class="radio" v-for="(v,k,i) in list">
                <input  type="radio" :name="name" :value="v" v-model="currentValue">
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
            value: [String, Number],
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
                currentValue:''
            }
        },
        mounted () {
            this.$nextTick(function () {
                this.setCurrentValue(this.value);
            })
        },
        computed:{

        },
        methods: {
            setCurrentValue(value) {
                if (value === this.currentValue) return;
                this.currentValue = value;
                this.$emit('input', this.currentValue);
            },
            clearValue(){
                this.setCurrentValue('');
            }
        },
        watch: {
           value(val) {
                this.setCurrentValue(val);
            },
           currentValue(){
               this.$emit('input', this.currentValue);
           }
        }
    }
</script>