<template>
    <div class="columns" v-if="type==='input'">
        <div class="column">
            <field-input :label="name" :name="value.field" v-model="value" ></field-input>
        </div>
    </div>
</template>
<script>
    import FieldInput from  './input/FieldInput.vue'
    export default {
        name: 'inputComponent',
        components: {
            FieldInput
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
                default: 'input'
            },
            array:{
                type:String,
                default:''
            }
        },
        data(){
            return {
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
            },
            handInput(){
                const value = event.target.value;
                this.$emit('input', value);
                this.setCurrentValue(value);
            }
        },
        watch: {
           value(val) {
                this.setCurrentValue(val);
            }
        }
    }
</script>