<template>
    <div class="field">
        <label class="label">{{label}}</label>
        <datepicker placeholder="选择日期" v-model="currentValue"></datepicker>
    </div>
</template>
<script>
    import Datepicker from '../../../../component/datepicker'
    export default {
        name: 'inputComponent',
        components: {
            Datepicker
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
                this.$emit('input', this.currentValue);
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