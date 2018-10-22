<template>
    <div class="course-card">
        <el-row>
            <el-col :span="10">
                <div class="intro-video">
                    视频简介/图片
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
                                <span v-if="course.intro">{{course.intro}}</span>
                                <span v-else>未填写</span>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="course-user-number">
                        <span>已有{{course.userNum}}人参加该课程</span>
                    </div>
                    <div class="course-join">
                        <el-button class="join-button" plain type="primary" @click="joinCourse">立即加入</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "course-card",
        created(){
            // console.log(this.$route.params.courseId);
        },
        props:{
            course: Object
        },
        methods:{
            joinCourse(){
                alert('加入')
            }
        }
    }
</script>

<style scoped>
    .course-card{
        height: 300px;
        background-color: #eee;
    }
    .intro-video{
        background-color: #ddd;
        min-height: 260px;
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