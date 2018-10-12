<template>
    <div class="verifyCode" @keyup="autoChangeInput">
        <el-input id="0" type="text" v-model="verifyCode[0]" maxlength="1" small/>
        <el-input id="1" type="text" v-model="verifyCode[1]" maxlength="1" small/>
        <el-input id="2" type="text" v-model="verifyCode[2]" maxlength="1" small/>
        <el-input id="3" type="text" v-model="verifyCode[3]" maxlength="1" small/>
        <el-input id="4" type="text" v-model="verifyCode[4]" maxlength="1" small/>
        <el-input id="5" type="text" v-model="verifyCode[5]" maxlength="1" small/>
    </div>
</template>

<script>
    export default {
        name: "verify-code",
        data(){
            return{
                verifyCode: []
            }
        },
        methods: {
            autoChangeInput(event){
                event.target.value = event.target.value.replace(/[\u4e00-\u9fa5]/g,'');
                event.target.value = event.target.value.replace(/\s*/g,'');
                this.verifyCode[event.target.id] = event.target.value;
                this.$emit('addVerifyCode', this.verifyCode);
                if(event.target.value.length===1){
                    event.target.parentNode.nextSibling.childNodes[1].focus();
                }
            },
            clearCode(){
                this.verifyCode = [];
            }
        }
    }
</script>

<style scoped>
    .verifyCode > .el-input {
        width: 8%;
        margin-right: 8%;
    }
    .verifyCode > .el-input > input{
        ime-mode: disabled;
    }
</style>