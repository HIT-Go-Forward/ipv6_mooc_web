<template>
    <div class="userHomepageBar">
        <el-tabs v-model="tabName" @tab-click="handleClick">
            <el-tab-pane label="已学习" name="doneCourse">
                <done-course/>
            </el-tab-pane>
            <el-tab-pane label="正在学习" name="learningCourse">
                <learning-course/>
            </el-tab-pane>
            <el-tab-pane label="浏览记录" name="visitCourse"> </el-tab-pane>
            <el-tab-pane label="发布课程" name="releaseCourse"> </el-tab-pane>
            <el-tab-pane label="申请成为教师" name="applyTeacher" v-if="user.type===4">
                <apply-teacher :applyMsg="applyMsg"></apply-teacher>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="modifyPassword">
                <modify-password></modify-password>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "user-homepage-bar",
        data(){
            return{
                tabName: 'doneCourse',
                applyMsg: {
                    state: 0,
                    handlerId: '',
                    handleTime: '',
                    handleId: '',
                    note: ''
                },
                user: this.$store.getters.getStorge.user
            }
        },
        components: {
            learningCourse: ()=>import('./learningCourse'),
            doneCourse: ()=>import('./doneCourse'),
            applyTeacher: ()=>import('./applyTeacher'),
            modifyPassword: ()=>import('./modifyPassword')
        },
        methods:{
            handleClick(tab) {
                switch (tab.name) {
                    case 'applyTeacher':this.applyStateSearch();break;
                }
                console.log(tab.name)
            },
            applyStateSearch(){
                axios.get(this.$store.state.actionIP+'/apply/getManageableApplies.action').then((res)=>{
                    console.log(res)
                    if(res.data.status === 200) {
                        this.applyMsg.state = res.data.data[0].state
                        this.applyMsg.handleId = res.data.data[0].id
                        this.applyMsg.handlerId = res.data.data[0].handlerId
                        this.applyMsg.handleTime = res.data.data[0].handleTime
                        this.applyMsg.note = res.data.data[0].note
                    } else {
                        this.$message.error("服务器出错！")
                    }
                }).catch((err)=>{
                    this.$message.error("没连接到服务器！")
                    console.log(err)
                })
            }
        },
    }
</script>

<style scoped>
    .userHomepageBar{
        margin-left: 100px;
        margin-right: 300px;
        margin-top: 40px;
    }
</style>