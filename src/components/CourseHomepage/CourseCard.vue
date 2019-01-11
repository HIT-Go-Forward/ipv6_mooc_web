<template>
    <div class="course-card">
        <el-row>
            <el-col :span="10">
                <div class="course-img">
                    <img :src="'/media' + course.img" alt="" class="intro-img">
                </div>
            </el-col>
            <el-col :span="12">
                <div class="course-info">
                    <div class="course-name">
                        <span>{{course.name}}</span>
                    </div>
                    <div class="course-intro">
                        <el-row>
                            <el-col :span="3">
                                <span>课程简介:</span>
                            </el-col>
                            <el-col :span="21">
                                <span v-if="course.brief">{{course.brief}}</span>
                                <span v-else>未填写课程简介</span>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="course-user-number">
                        <span>已有{{course.userNum}}人参加该课程</span>
                    </div>
                    <div class="course-join">
                        <el-button v-if="hasJoinedCourse" class="join-button" plain type="primary" @click="joinCourse">立即加入</el-button>
                        <el-button v-if="user.type===2||user.id===course.teacher.id" class="join-button" plain type="primary" @click="enterCourse">进入课程</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from '../../axiosIntercepter'
    import router from '../../router'
    export default {
        name: "course-card",
        props:{
            course: {}
        },
        data(){
            return{
                user:"",
                hasJoinedCourse:false
            }
        },
        created(){
            this.user = this.$store.getters.getStorge.user
            this.hasJoin();
        },
        methods:{
            joinCourse(){
                axios.get("/action/course/joinCourse.action",{
                    params:{
                        courseId:this.course.id
                    }
                }).then((res)=>{
                    if(res.data==='success')
                        this.$message.success("你已经开始学习课程，请不要放弃哦")
                    else{
                        this.$message.error("学习失败？？？")
                    }
                }).catch((err)=>{
                    console.log(err)
                    this.$message.error("应用出错或网络错误！")
                })
            },
            enterCourse(){
                router.push({path: `/course/${this.course.id}/learn`});
            },
            hasJoin(){
                axios.get('/action/course/hasJoined.action', {
                    params: {
                        courseId:this.course.id
                    }
                }).then((res)=>{
                    console.log(res)
                    this.hasJoinedCourse = !(res.data === "success");
                }).catch((err)=>{
                    this.$message.error("项目出错或网络未连接")
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .course-card{
        height: 300px;
        border-radius: 0 0 20px 20px;
        box-shadow: 0 0 10px #B09999;
        background-color: #eee;
    }
    .intro-img{
        width: 100%;
        height: 100%;
    }
    .course-img{
        background-color: #ddd;
        height: 260px;
        margin: 20px;
    }
    .course-info{
        margin: 20px;
        min-height: 260px;
        text-align: left;
    }
    .course-name{
        margin-top: 10px;
        font-size: 150%;
    }
    .course-intro{
        padding: 8px;
        margin-top: 20px;
        min-height: 60px;
        font-size: 90%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        background-color: #ddd;
    }
    .course-user-number{
        font-size: 90%;
        margin: 10px 0;
    }
    .join-button{
        width: 150px;
    }
</style>