<template>
    <el-row class="modify-password">
        <el-col :span="12" :offset="7" class="modify-container">
            <el-form :model="form" label-width="6em">
                <el-form-item label="邮箱">
                    <el-col :span="14">
                        <el-input v-model="form.email" autocomplete="off"></el-input>
                    </el-col>
                    <el-col :span="5" :offset="2">
                        <el-button @click="verifyEmail">发送验证码</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item label="验证码">
                    <verify-code ref="verifyCode" @addVerifyCode="addVerifyCode"></verify-code>
                </el-form-item>
                <el-form-item label="旧密码">
                    <el-input type="password" v-model="form.old_password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" v-model="form.new_password1" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="重复新密码">
                    <el-input type="password" v-model="form.new_password2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changePwdSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import axios from '../../axiosIntercepter'
    import md5 from 'blueimp-md5'
    import router from "../../router";
    export default {
        name: "modify-password",
        data(){
            return{
                form: {
                    email: '',
                    old_password: '',
                    verifyCode: '',
                    new_password1: '',
                    new_password2: '',
                },
            };
        },
        components: {
            verifyCode: ()=>import('./../common/VerifyCode')
        },
        methods: {
            addVerifyCode(verifyCode){
                this.form.verifyCode = verifyCode.join('');
            },
            verifyEmail(){
                if(this.form.email===this.$store.getters.getStorge.user.email){
                    axios.get('/action/authority/sendValidateCodeToCurrentUser.action').then((res)=>{
                        console.log(res.data)
                        if(res.data.status===200){
                            this.$message.success("验证邮件已发送到您绑定的邮箱，请查收！")
                        } else {
                            this.$message.error(res.data.data)
                        }
                    }).catch((err)=>{
                        this.$message.error("未连接到互联网！")
                        console.log(err)
                    })
                } else {
                    this.$message.error("邮箱与您绑定的邮箱不一致！")
                }
            },
            changePwdSubmit(){
                if(this.form.new_password2!==this.form.new_password1){
                    this.$message.error("两次密码输入不一致，请重新输入")
                    this.form.new_password1=''
                    this.form.new_password2=''
                } else {
                    axios.get('/action/authority/changePassword.action',{
                        params:{
                            code: this.form.verifyCode,
                            oldPassword: md5(this.form.old_password, 'hit-go-forward'),
                            newPassword: md5(this.form.new_password1, 'hit-go-forward')
                        }
                    }).then((res)=>{
                        console.log(res)
                        if(res.data.status===200){
                            this.$message.success("密码修改成功！三秒后跳转到主页面...")
                            setTimeout(()=>{
                                document.cookie = 'id='+this.$store.getters.getStorge.user.id+'; max-age=0';
                                document.cookie = 'password='+this.$store.getters.getStorge.user.password+'; max-age=0';
                                this.$store.state.IsLogin = false;
                                router.push({name: 'homepage'})
                            }, 3000);
                        } else {
                            this.$message.warning("密码修改失败!"+res.data.data)
                        }
                    }).catch((err)=>{
                        this.$message.error("未连接到互联网。")
                        console.log(err)
                    })
                }
            }
        },

    }
</script>

<style scoped>
    .modify-container{
        margin-top: 3em;
        margin-bottom: 1em;
        border: 1px solid #ccc;
        padding: 3em 3em 1em 1em;
        background-color: whitesmoke;
        border-radius: 1em;
        box-shadow: 2px 2px 3px deepskyblue;
    }
</style>