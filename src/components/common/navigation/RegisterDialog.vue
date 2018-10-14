<template>
    <div class="registerDialog">
        <div @click="register">注册</div>
        <el-dialog :visible.sync="RegisterDialogVisible">

            <div slot="title" class="dialog-title">
                <el-steps :active="registerStatus" simple>
                    <el-step title="用户注册" icon="el-icon-edit"></el-step>
                    <el-step title="完善信息" icon="el-icon-edit"></el-step>
                </el-steps>
            </div>

            <el-form :model="form" label-width="80px" :rules="rules" ref="form">

                <div v-if="registerStatus===1">
                    <el-form-item label="用户名" prop="name">
                        <el-input type="text" v-model="form.name" prefix-icon="el-icon-edit"/>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-autocomplete class="el-autoComplete" v-model="form.email" clearable
                                         :fetch-suggestions="querySearch" :trigger-on-focus="false">
                            <i class="el-icon-edit" slot="prefix"></i>
                        </el-autocomplete>
                        <el-button class="el-button-verify" type="primary"
                                   :disabled="isDisabled" @click="verifyEmail" plain>
                            {{verifyButtonName}}
                        </el-button>
                    </el-form-item>
                    <el-form-item label="验证码" prop="verifyCode">
                        <verify-code ref="verifyCode" @addVerifyCode="addVerifyCode"/>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="form.password" prefix-icon="el-icon-edit"/>
                    </el-form-item>
                    <el-form-item label="重复密码" prop="repeatPassword">
                        <el-input type="password" v-model="form.repeatPassword" prefix-icon="el-icon-edit"/>
                    </el-form-item>
                </div>

                <div v-if="registerStatus===2">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="16">
                            <el-form-item label="学校" class="">
                                <el-input type="text" v-model="form.school"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="学历" class="education">
                                <el-select v-model="form.education" placeholder="选择学历" value="">
                                    <el-option label="本科" value="3"></el-option>
                                    <el-option label="硕士" value="4"></el-option>
                                    <el-option label="博士" value="5"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row type="flex" justify="space-between">
                        <el-col :span="12">
                            <el-form-item label="生日">
                                <el-date-picker class="el-date-picker" v-model="form.birthday" type="date"
                                                placeholder="选择日期"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="性别" class="sex">
                                <el-select v-model="form.sex" value="" placeholder="选择性别">
                                    <el-option label="男" value="F"></el-option>
                                    <el-option label="女" value="M"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="手机">
                        <el-input onKeypress='return (/[\d]/.test(String.fromCharCode(event.keyCode)))' type="number"
                                  v-model="form.phone"/>
                    </el-form-item>

                    <el-form-item label="简介">
                        <el-input type="textarea" placeholder="请输入个人简介" v-model="form.intro"
                                  :autosize="{minRows: 2}"/>
                    </el-form-item>
                </div>
            </el-form>


            <div slot="footer" class="dialog-footer" v-if="registerStatus===1">
                <el-button @click="registerCancel" round plain>取 消</el-button>
                <el-button type="primary" @click="registerCommit" round plain>注 册</el-button>
            </div>
            <div slot="footer" class="dialog-footer" v-if="registerStatus===2">
                <el-button type="primary" @click="complete" round plain>完 成</el-button>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import axios from 'axios'
    import md5 from 'blueimp-md5'

    export default {
        name: "register-dialog",
        components: {
            verifyCode: () => import('../VerifyCode')
        },
        data() {
            let verifyPassword = (rule, value, callback) => {
                if (value !== this.form.password) {
                    callback(new Error('两次密码输入不一致!'));
                }
                else {
                    callback();
                }
            };
            return {
                registerStatus: 1,
                isDisabled: false,
                verifyTime: 60,
                verifyButtonName: '发送验证码',
                form: {
                    name: '',
                    password: '',
                    repeatPassword: '',
                    email: '',
                    verifyCode: '',
                    school: '',
                    education: '',
                    birthday: '',
                    sex: '',
                    intro: '',
                    phone: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {max: 40, message: '名字不能超过40字', trigger: 'blur'}
                    ],
                    email: [
                        {type: 'email', message: '邮箱格式不对', trigger: 'blur'},
                        {required: true, message: '请输入邮箱', trigger: 'change'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {max: 32, message: '密码不能超过32位', trigger: 'blur'}
                    ],
                    repeatPassword: [
                        {validator: verifyPassword, message: '密码不一致', trigger: 'blur'}
                    ],
                    school: [
                        {max: 40, message: '学校名字不能超过40字', trigger: 'blur'}
                    ],
                    phone: [
                        {max: 14, message: '手机格式不对', trigger: 'blur'}
                    ],
                    intro: [
                        {max: 500, message: '简介不能超过500字', trigger: 'blur'}
                    ]
                }
            }
        },
        computed: {
            ...mapState({
                RegisterDialogVisible: state => state.RegisterDialogVisible
            })
        },
        methods: {
            getFomateDay(date) {
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                return year + '-' + month + '-' + day;
            },
            register() {
                this.$store.commit('registerShow');
                console.log("register");
            },
            addVerifyCode(verifyCode) {
                this.form.verifyCode = verifyCode.join('');
            },
            registerCommit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        alert('111')
                        axios.get(this.$store.state.actionIP + '/authority/register.action', {
                            params: {
                                name: this.form.name,
                                email: this.form.email,
                                code: this.form.verifyCode,
                                password: md5(this.form.password, 'hit-go-forward')
                            }
                        })
                            .then(response => {
                                if (response.data.status === 403) {
                                    this.$message.error(response.data.data);
                                }
                                else if (response.data.status === 200) {
                                    this.$message.success('注册成功');
                                    this.registerStatus = 2;
                                }
                                else if (response.data.status === 500) {
                                    this.$message.error('服务器出错')
                                }
                            })
                            .catch(error => console.log(error));
                    }
                    else {
                        console.log('error commit');
                        return false;
                    }
                });
            },
            verifyEmail() {
                this.$refs['form'].validateField('email', (errorMessage) => {
                    if (!errorMessage) {
                        axios.get(this.$store.state.actionIP + '/authority/uniqueEmail.action', {
                            params: {
                                email: this.form.email,
                            }
                        })
                            .then(response => {
                                if (response.data.status === 403) {
                                    this.$message.error(response.data.data);
                                }
                                else if (response.data.status === 200) {
                                    axios.get(this.$store.state.actionIP + '/authority/sendValidateCode.action', {
                                        params: {
                                            email: this.form.email
                                        }
                                    })
                                        .then(response => {
                                            if (response.data.status === 500) {
                                                this.$message.error(response.data.data);
                                            }
                                            else if (response.data.status === 200) {
                                                this.isDisabled = true;
                                                let interval = window.setInterval(() => {
                                                    this.verifyButtonName = this.verifyTime + 's后重新验证';
                                                    this.verifyTime--;
                                                    if (this.verifyTime < 0) {
                                                        this.verifyButtonName = '重新验证';
                                                        this.verifyTime = 60;
                                                        this.isDisabled = false;
                                                        window.clearInterval(interval);
                                                    }
                                                }, 1000)
                                            }
                                        })
                                        .catch(error => {
                                            this.$message.error('未连接到服务器');
                                            console.log(error);
                                        });
                                }
                                else if (response.data.status === 500) {
                                    this.$message.error('服务器出错');
                                }
                            })
                            .catch(error => {
                                this.$message.error('未连接到服务器');
                                console.log(error);
                            });
                    }
                    else {
                        console.log(errorMessage);
                        return false;
                    }
                });
            },
            complete() {
                alert('111')
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        axios.get(this.$store.state.actionIP + '/authority/modifyInfo.action', {
                            params: {
                                birthday: this.getFomateDay(this.form.birthday),
                                sex: this.form.sex,
                                education: this.form.education,
                                school: this.form.school,
                                phone: this.form.phone,
                                intro: this.form.intro
                            }
                        })
                            .then(response => {
                                alert('333')
                                alert(response.data.status)

                                if (response.data.status === 403) {
                                    this.$message.error(response.data.data);
                                }
                                else if (response.data.status === 200) {
                                    alert('2222')
                                    alert(response.data.data)
                                    // document.cookie = 'id='+response.data.data.id+'; max-age=604800';
                                    // document.cookie = 'password='+response.data.data.password+'; max-age=604800';
                                    // this.$store.commit('$_setStorage', {user: response.data.data});
                                    // this.$store.commit('login');
                                    // this.registerCancel();
                                }
                                else if (response.data.status === 500) {
                                    this.$message.error('服务器出错');
                                }
                            })
                            .catch(error => {
                                this.$message.error('未连接到服务器');
                                console.log(error);
                            });
                    }
                    else {
                        console.log('form data is invalid!');
                        return false;
                    }
                });
            },
            registerCancel() {
                this.$refs.verifyCode.clearCode();
                this.$refs['form'].resetFields();
                this.$store.commit('registerHide');
            },
            querySearch(queryString, callback) {
                let result = this.loadAll().map((val) => {
                    val.value = queryString + val.value;
                    return val;
                });
                console.log(result);
                callback(result);
            },
            loadAll() {
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

<style>
    .el-autoComplete {
        width: 75%;
        float: left;
    }

    .el-button-verify {
        width: 23%;
        overflow: hidden;
    }

    .el-date-picker {
        float: left;
    }

    .sex {
        float: right;
    }

    .education {
        float: right;
    }
</style>