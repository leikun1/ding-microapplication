<template>
    <div class="field">
        <label class="label">{{label}}</label>
        <div class="control">
            <textarea  class="textarea" :name="name" :value="value" placeholder="" @input="handInput"></textarea>
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
            value: [String]
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
                var value = event.target.value;
                value = this.formatVal(value)
                this.$emit('input', value);
                this.setCurrentValue(value);
            },
            formatVal(val){
                return val.replace(/\r\n/g, '').replace(/\n/g, '');
            }
        },
        watch: {
            value(val) {
                val = this.formatVal(val)
                this.setCurrentValue(val);
            }
        }
    }
</script>