<template>
    <div class="loginDialog">
        <div @click="login">登录</div>
        <el-dialog :visible.sync="LoginDialogVisible">
            <div slot="title" class="dialog-title">
                <el-tabs v-model="loginType">
                    <el-tab-pane label="邮箱登录" name="email"> </el-tab-pane>
                    <el-tab-pane label="账号登录" name="id"> </el-tab-pane>
                </el-tabs>
            </div>
            <el-form :model="form" label-width="80px" :rules="rules" ref="form">
                <el-form-item label="用户ID" v-if="loginType==='id'" prop="id">
                    <el-input onKeypress='return (/[\d]/.test(String.fromCharCode(event.keyCode)))' type="number" v-model="form.id" prefix-icon="el-icon-edit" clearable/>
                </el-form-item>
                <el-form-item label="邮箱" v-if="loginType==='email'" prop="email">
                    <el-autocomplete class="el-autoComplete" v-model="form.email"  clearable
                                     :fetch-suggestions="querySearch" :trigger-on-focus="false">
                        <i class="el-icon-edit" slot="prefix"></i>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password" prefix-icon="el-icon-edit" clearable/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="loginCancel" round plain>取 消</el-button>
                <el-button type="primary" @click="loginCommit" round plain>登 录</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import { mapState } from 'vuex'
    import axios from 'axios'
    import md5 from 'blueimp-md5'
    export default {
        name: "LoginDialog",
        data(){
            return{
                loginType: 'email',
                form: {
                    id: '',
                    password: '',
                    email: ''
                },
                rules: {
                    id: [
                        {required: true, message: '请输入用户ID', trigger: 'change'},
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'change'},
                        {type: 'email', message: '邮箱格式不对', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'change'}
                    ],
                }
            }
        },
        computed: {
            ...mapState({
                LoginDialogVisible : state => state.LoginDialogVisible
            })
        },
        methods: {
            loginCommit(){
                this.$refs['form'].validate((valid)=>{
                   if(valid){
                       let params;
                       if(this.loginType==='id'){
                           params = {
                               account: this.form.id,
                               password: md5(this.form.password, 'hit-go-forward')
                           }
                       }
                       else{
                           params = {
                               account: this.form.email,
                               password: md5(this.form.password, 'hit-go-forward')
                           }
                       }
                       axios.get('/action/authority/login.action', {
                           params: params})
                           .then(response=>{
                               if(response.data.status===403){
                                   this.$message.error(response.data.data)
                               }
                               else if(response.data.status===200){
                                   console.log(response)
                                   // document.cookie = 'id='+response.data.data.id+'; max-age=604800';
                                   // document.cookie = 'password='+response.data.data.password+'; max-age=604800';
                                   document.cookie = 'token='+response.data.data.token+'; max-age=604800';
                                   this.$store.commit('$_setStorage', {user: response.data.data});
                                   this.$store.commit('login');
                                   this.loginCancel();
                               }
                           })
                           .catch(error => console.log(error));
                   }
                   else{
                       console.log('error commit');
                       return false;
                   }
                });

            },
            login(){
                this.$store.commit('loginShow');
                console.log("login");
            },
            loginCancel(){
                this.$refs['form'].resetFields();
                this.$store.commit('loginHide');
            },
            querySearch(queryString, callback){
                let result = this.loadAll().map((val)=>{
                    val.value = queryString + val.value;
                    return val;
                });
                console.log(result);
                callback(result);
            },
            loadAll(){
                return [
                    {value: '@qq.com'},
                    {value: '@163.com'},
                    {value: '@126.com'},
                    {value: '@gmail.com'},
                    {value: '@sina.com'},
                    {value: '@yahoo.com'},
                    {value: '@sohu.com'},
                    {value: '@hotmail.com'},
                    {value: '@sogou.com'},
                    {value: '@live.com'}
                ]
            }
        }
    }
</script>

<style scoped>
    .el-autoComplete{
        width: 100%;
    }
</style>