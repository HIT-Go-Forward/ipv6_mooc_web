<template>
    <div class="userHomepageBar">
        <div class="refresh-div">
            <el-button v-if="tabName!=='modifyPassword' && tabName!=='releaseCourse' && tabName!=='applyTeacher'" type="primary" class="refresh" icon="el-icon-refresh" @click="refreshData">刷新数据</el-button>
        </div>
        <el-tabs v-model="tabName" @tab-click="handleClick">
            <el-tab-pane label="已学习" name="doneCourse">
                <done-course :courseList="courseList"/>
            </el-tab-pane>
            <el-tab-pane label="正在学习" name="learningCourse">
                <learning-course :courseList="courseList"/>
            </el-tab-pane>
            <el-tab-pane label="发布记录" name="releaseRecord">
                <release-record :applying='releaseCourseRecordApplying' :released="releaseCourseRecordreleased" :rejected="releaseCourseRecordrejected"/>
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
            <el-tab-pane label="博客审核" name="blogAudit" v-if="user.type===2">
                <blog-audit :blogs="blogList" @getBlogs="getBlogs"></blog-audit>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import axios from '../../axiosIntercepter'
    export default {
        name: "user-homepage-bar",
        data(){
            return{
                courseList: [],
                visitCourse: [],
                tabName: '',
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
                releasedCourse:'',
                releaseCourseRecordApplying:[],
                releaseCourseRecordreleased:[],
                releaseCourseRecordrejected:[],
                user: this.$store.getters.getStorge.user,
                blogList:[],
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
            releaseCourse: ()=>import('./releaseCourse'),
            releaseRecord: ()=>import('./courseRecord'),
            blogAudit:()=>import('./blogAudit')
        },
        created(){
            this.tabName = this.$route.query.tabName?this.$route.query.tabName:'learningCourse';
            this.refreshData()
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
                    case 'releaseRecord':this.getCourseRecord();break;
                    case 'blogAudit':this.getBlogs();
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
                    case 'releaseRecord':
                        if(this.releaseCourseRecordrejected.length===0&&this.releaseCourseRecordApplying.length===0&&this.releaseCourseRecordreleased.length===0){
                            this.getCourseRecord();
                        }
                        break;
                    case 'visitCourse':
                        if(this.visitCourse.length===0) {
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
                    case 'blogAudit':
                        if(this.blogList.length===0){
                            this.getBlogs()
                        }
                        break;
                }
                console.log(tab.name)
            },
            getCourse(courseType){
                this.courseList = [];
                axios.get('/action/course/getUserCourses.action', {
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
            getBlogs(){
                this.blogList = []
                axios.get('/action/apply/getBlogApplies.action').then((res)=>{
                    if(res.data.status===200){
                        this.blogList = res.data.data;
                        for(let blog of this.blogList){
                            axios.get('/action/authority/getUserInfo.action',{
                                params:{
                                    userId:blog.userId
                                }
                            }).then((res)=>{
                                blog.user = res.data.data
                                this.blogList.push('');
                                this.blogList.pop();
                            })
                        }
                    }
                })
            },
            getVisitCourse(){
                this.visitCourse = [];
                axios.get('/action/history/getCourseHistory.action')
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
                axios.get('/action/apply/getManageableApplies.action').then((res)=>{
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
                axios.get('/action/apply/getManageableApplies.action',{
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
                axios.get('/action/apply/getManageableApplies.action',{
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
            getCourseRecord(){
                this.releaseCourseRecordrejected = []
                this.releaseCourseRecordApplying = []
                this.releaseCourseRecordreleased = []
                axios.get('/action/course/getUserCourses.action',{
                    params:{
                        'type':'applying'
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.status===200){
                        this.releaseCourseRecordApplying=res.data.data
                    } else {
                        this.$message.error(res.data.data)
                    }
                }).catch((err)=>{
                    console.log(err)
                    this.$message.error("服务器错误或代码出现bug")
                })
                axios.get('/action/course/getUserCourses.action',{
                    params:{
                        'type':'rejected'
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.status===200){
                        this.releaseCourseRecordrejected=res.data.data
                    } else {
                        this.$message.error(res.data.data)
                    }
                }).catch((err)=>{
                    console.log(err)
                    this.$message.error("服务器错误或代码出现bug")
                })
                axios.get('/action/course/getUserCourses.action',{
                    params:{
                        'type':'released'
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.status===200){
                        this.releaseCourseRecordreleased=res.data.data
                    } else {
                        this.$message.error(res.data.data)
                    }
                }).catch((err)=>{
                    console.log(err)
                    this.$message.error("服务器错误或代码出现bug")
                })
            },
            courseAuditAll(){
                axios.get('/action/course/getUserCourses.action',{
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
                axios.get('/action/course/getUserCourses.action',{
                    params: {
                        'type':'rebutted'
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
                axios.get('/action/course/getUserCourses.action',{
                    params: {
                        'type':'pending'
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
        /*border-radius: 20px;*/
        /*box-shadow: 0 0 10px #B09999;*/
    }
    /*.userHomepageBar:hover{*/
        /*box-shadow: 0 0 20px #B09999;*/
    /*}*/
    .refresh-div{
        text-align: left;
    }
    .refresh{
        background-color: lightgreen;
        border-color: lightgreen;
    }
</style>