<template>
    <div class="field" v-if="value.type==='input'">
        <label class="label">{{value.name}}</label>
        <div class="control">
            <input  class="input" type="text" :name="value.field" :value="value" placeholder="">
        </div>
    </div>
</template>
<script>
    export default {
        name: 'inputComponent',
        components: {
        },
        data(){
            return {

            }
        },
        mounted () {
            this.$nextTick(function () {

            })
        },
        computed:{

        },
        methods: {

        }
    }
</script>
<style type="text/css">
</style>