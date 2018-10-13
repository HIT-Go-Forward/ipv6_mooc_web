<template>
    <div class="teacher-apply-section">
        <div class="apply-teacher" v-if="applyMsg.state===0">
            <el-row :gutter="20">
                <el-col  :span="16" :offset="4">
                    <el-input type="textarea" :rows="4" placeholder="请输入申请理由" v-model="form.applyReason" class="apply-textarea"></el-input>
                    <el-button type="primary" class="teacher-apply-submit" @click="submitTeacherApply">申请成为教师</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="applying" v-if="applyMsg.state===1">
            <p>您的申请正在处理中。。。</p>
        </div>
        <div class="apply-succeed" v-if="applyMsg.state===2">
            <p>您已经具有教师资格了</p>
        </div>
        <div class="apply-refused" v-if="applyMsg.state===3">
            <div class="refuse-msg">
                <p>您的申请已被管理员拒绝，拒绝原因是：</p>
                <p>{{ applyMsg.state }}</p>
                <p>您可以继续申请</p>
            </div>
            <el-row :gutter="20">
                <el-col  :span="16" :offset="4">
                    <el-input type="textarea" :rows="4" placeholder="请输入申请理由" v-model="form.applyReason" class="apply-textarea"></el-input>
                    <el-button type="primary" class="teacher-apply-submit" @click="submitTeacherApply">申请成为教师</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "apply-teacher",
        props:{
            "applyMsg":{type: Object}
            },
        data(){
            return {
                form: {
                    applyReason: ''
                },
            }
        },
        methods:{
            submitTeacherApply(){
                axios.get(this.$store.state.actionIP+'/apply/applyTeacher.action',{
                    params: {
                        note: this.form.applyReason
                    }
                }).then((res)=>{
                    if(res.data.status===200){
                        this.$message.success("您的申请已发送，等待管理员审核！")
                    }else{
                        this.$message.error(res.data.data)
                    }
                }).catch((err)=>{
                    this.$message.error("没连接到服务器！")
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .apply-textarea{
        font-size: 2em;
    }
    .teacher-apply-submit{
        margin-top: 3em;
    }
    .refuse-msg :nth-child(1){
        color: red;
    }
    .refuse-msg :nth-child(3){
        color: darkturquoise;
    }
</style>