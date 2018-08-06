<template>
    <div class="field">
        <label class="label">{{label}}</label>
        <div class="control">
            <input  class="input" :type="type" :name="name" :value="value" placeholder="" @input="handInput">
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