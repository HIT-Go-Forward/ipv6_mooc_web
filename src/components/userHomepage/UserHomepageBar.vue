<template>
    <div class="userHomepageBar">
        <el-tabs v-model="tabName" @tab-click="handleClick">
            <el-tab-pane label="已学习" name="doneCourse">
                <done-course :courseList="courseList"/>
            </el-tab-pane>
            <el-tab-pane label="正在学习" name="learningCourse">
                <learning-course :courseList="courseList"/>
            </el-tab-pane>
            <el-tab-pane label="浏览记录" name="visitCourse">
                <visit-course :visitCourse="visitCourse"/>
            </el-tab-pane>
            <el-tab-pane label="发布课程" name="releaseCourse" v-if="user.type<=3">
                <release-course></release-course>
            </el-tab-pane>
            <el-tab-pane label="申请成为教师" name="applyTeacher" v-if="user.type===4">
                <apply-teacher :applyMsg="applyMsg"></apply-teacher>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="modifyPassword">
                <modify-password></modify-password>
            </el-tab-pane>
            <el-tab-pane label="教师审核" name="teacherAudit" v-if="user.type===2">
                <teacherAudit :handled="handledTeacherApply" :unhandled="unhandledTeacherApply"></teacherAudit>
            </el-tab-pane>
            <el-tab-pane label="课程审核" name="courseAudit" v-if="user.type===2">
                <course-audit :rejected="rejectCourseApply" :accept="acceptCourseApply" :applying="applyingCourseApply"></course-audit>
            </el-tab-pane>
            <el-tab-pane label="举报审核" name="informAudit" v-if="user.type===2"></el-tab-pane>
        </el-tabs>
        <el-button v-if="tabName!=='modifyPassword' && tabName!=='releaseCourse' && tabName!=='applyTeacher'" type="primary" class="refresh" icon="el-icon-refresh" @click="refreshData"></el-button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "user-homepage-bar",
        data(){
            return{
                courseList: [],
                visitCourse: [],
                tabName: 'learningCourse',
                applyMsg: {
                    state: 0,
                    handlerId: '',
                    handleTime: '',
                    handleId: '',
                    note: ''
                },
                handledTeacherApply: '',
                unhandledTeacherApply: '',
                acceptCourseApply: '',
                rejectCourseApply: '',
                applyingCourseApply: '',
                user: this.$store.getters.getStorge.user
            }
        },
        components: {
            visitCourse: ()=>import('./visitCourse'),
            learningCourse: ()=>import('./learningCourse'),
            doneCourse: ()=>import('./doneCourse'),
            applyTeacher: ()=>import('./applyTeacher'),
            modifyPassword: ()=>import('./modifyPassword'),
            teacherAudit: ()=>import('./teacherAudit'),
            courseAudit: ()=>import('./courseAudit'),
            releaseCourse: ()=>import('./releaseCourse')
        },
        created(){
            this.getCourse('learningCourse');
        },
        methods:{
            refreshData() {
                this.$store.commit("userInfoHide");
                switch (this.tabName) {
                    case 'doneCourse':this.getCourse('learned');break;
                    case 'learningCourse':this.getCourse('learning');break;
                    case 'visitCourse':this.getVisitCourse();break;
                    case 'applyTeacher':this.applyStateSearch();break;
                    case 'teacherAudit':this.teacherAuditAll();break;
                    case 'courseAudit':this.courseAuditAll();break;
                }
            },
            handleClick(tab) {
                this.$store.commit("userInfoHide");
                switch (tab.name) {
                    case 'doneCourse':
                        if(!this.courseList) {
                            this.getCourse('learned');
                        }
                        break;
                    case 'learningCourse':
                        if(!this.courseList) {
                            this.getCourse('learning');
                        }
                        break;
                    case 'visitCourse':
                        if(!this.visitCourse) {
                            this.getVisitCourse();
                        }
                        break;
                    case 'applyTeacher':
                        if(!this.applyMsg) {
                            this.applyStateSearch();
                        }
                        break;
                    case 'teacherAudit':
                        if(!this.handledTeacherApply && !this.unhandledTeacherApply){
                            this.teacherAuditAll();
                        }
                        break;
                    case 'courseAudit':
                        if(!this.rejectCourseApply && !this.applyingCourseApply && !this.acceptCourseApply) {
                            this.courseAuditAll();
                        }
                        break;
                }
                console.log(tab.name)
            },
            getCourse(courseType){
                this.courseList = [];
                axios.get(this.$store.state.actionIP + '/course/getUserCourses.action', {
                    params: {
                        type: courseType
                    }
                })
                    .then(response => {
                        if (response.data.status === 403) {
                            this.$message.error(response.data.data);
                        }
                        else if (response.data.status === 200) {
                            this.courseList = response.data.data;
                        }
                        else if (response.data.status === 500) {
                            this.$message.error('服务器出错')
                        }
                    })
                    .catch(error => {
                        this.$message.error('未连接到服务器');
                        console.log(error);
                    });
            },
            getVisitCourse(){
                this.visitCourse = [];
                axios.get(this.$store.state.actionIP + '/history/getCourseHistory.action')
                    .then(response => {
                        if (response.data.status === 403) {
                            this.$message.error(response.data.data);
                        }
                        else if (response.data.status === 200) {
                            this.visitCourse = response.data.data;
                        }
                        else if (response.data.status === 500) {
                            this.$message.error('服务器出错')
                        }
                    })
                    .catch(error => {
                        this.$message.error('未连接到服务器');
                        console.log(error);
                    });
            },
            applyStateSearch(){
                axios.get(this.$store.state.actionIP+'/apply/getManageableApplies.action').then((res)=>{
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
            },
            teacherAuditAll(){
                axios.get(this.$store.state.actionIP+'/apply/getManageableApplies.action',{
                    params: {
                        'type': 'handled'
                    }
                }).then((res)=>{
                    if(res.data.status === 200) {
                        this.handledTeacherApply = res.data
                        console.log(this.handledTeacherApply)
                    } else {
                        this.$message.error("服务器出错"+res.data.data)
                    }
                }).catch((err)=>{
                    this.$message.error("没连接到服务器")
                    console.log(err)
                })
                axios.get(this.$store.state.actionIP+'/apply/getManageableApplies.action',{
                    params: {
                        'type': 'unhandled'
                    }
                }).then((res)=>{
                    if(res.data.status === 200) {
                        this.unhandledTeacherApply = res.data
                        console.log(this.unhandledTeacherApply)
                    } else {
                        this.$message.error("服务器出错"+res.data.data)
                    }
                }).catch((err)=>{
                    this.$message.error("没连接到服务器")
                    console.log(err)
                })
            },
            courseAuditAll(){
                axios.get(this.$store.state.actionIP+'/course/getUserCourses.action',{
                    params: {
                        'type':'accepted'
                    }
                }).then((res)=>{
                    console.log(res.data)
                    if(res.data.status === 200) {
                        this.acceptCourseApply = res.data.data
                    } else {
                        this.$message.error("服务器出错"+res.data.data)
                    }
                }).catch((err)=>{
                    this.$message.error("没连接到服务器")
                    console.log(err)
                })
                axios.get(this.$store.state.actionIP+'/course/getUserCourses.action',{
                    params: {
                        'type':'rejected'
                    }
                }).then((res)=>{
                    console.log(res.data)
                    if(res.data.status === 200) {
                        this.rejectCourseApply = res.data.data
                    } else {
                        this.$message.error("服务器出错"+res.data.data)
                    }
                }).catch((err)=>{
                    this.$message.error("没连接到服务器")
                    console.log(err)
                })
                axios.get(this.$store.state.actionIP+'/course/getUserCourses.action',{
                    params: {
                        'type':'applying'
                    }
                }).then((res)=>{
                    console.log(res.data)
                    if(res.data.status === 200) {
                        this.applyingCourseApply = res.data.data
                    } else {
                        this.$message.error("服务器出错"+res.data.data)
                    }
                }).catch((err)=>{
                    this.$message.error("没连接到服务器")
                    console.log(err)
                })
            }
        },

    }
</script>

<style scoped>
    .userHomepageBar{
        margin-top: 40px;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0 0 10px #B09999;
    }
    .userHomepageBar:hover{
        box-shadow: 0 0 20px #B09999;
    }
    .refresh{
        margin-top: 2em;
        margin-bottom: 2em;
    }
</style>