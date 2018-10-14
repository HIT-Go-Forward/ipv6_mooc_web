<template>
    <div class="modifyUserInfo">
        <el-form :model="form" label-width="80px" :rules="rules" ref="form">

            <el-form-item label="用户名" prop="name">
                <el-input type="text" v-model="form.name" prefix-icon="el-icon-edit"/>
            </el-form-item>

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
                        <el-date-picker class="el-date-picker" v-model="form.birthday" type="date" placeholder="选择日期"/>
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
            <el-form-item>
                <el-button class="modify-button" plain round @click="modifyUserInfo">修改信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "modify-user-info",
        data() {
            return {
                form: this.$store.getters.getStorge.user,
                rules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {max: 40, message: '名字不能超过40字', trigger: 'blur'}
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
        methods: {
            getFomateDay(date) {
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                return year + '-' + month + '-' + day;
            },
            modifyUserInfo() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        axios.get(this.$store.state.actionIP + '/authority/modifyInfo.action', {
                            params: {
                                name: this.form.name,
                                birthday: this.getFomateDay(this.form.birthday),
                                sex: this.form.sex,
                                education: this.form.education,
                                school: this.form.school,
                                phone: this.form.phone,
                                intro: this.form.intro
                            }
                        })
                            .then(response => {
                                if (response.data.status === 403) {
                                    this.$message.error(response.data.data);
                                }
                                else if (response.data.status === 200) {

                                    this.$message.success('修改成功');
                                    this.registerStatus = 2;
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
            }
        }
    }
</script>

<style scoped>
    .modifyUserInfo {
        width: 60%;
        margin-top: 30px;
        margin-left: auto;
        margin-right: auto;
        background-color: #ddd;
        padding: 50px;
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