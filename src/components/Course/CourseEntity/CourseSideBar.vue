<template>
    <div class="course-sidebar">
        <div class="sidebar">
            <!--TODO 课程图片-->
            <div  class="course-img">
                <img :src="mediaIP + course.img" alt="">
            </div>
        </div>
        <div class="course-info">
            <div class="course-name">
                <span>{{course.name}}</span>
                <span class="course-num"><i class="el-icon-view"> {{course.userNum}}</i></span>
            </div>
            <div class="course-brief">
                <p v-if="course.brief">{{course.brief}}</p>
                <p v-else>课程简介未填写</p>
            </div>
        </div>
        <div class="course-teacher">
            <div class="teacher-title">
                <span>教师</span>
            </div>
            <el-row class="teacher-main">
                <el-col :span="6">
                    <div class="teacher-img">
                        <img :src="mediaIP + course.teacher.img" alt="">
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="teacher-name">
                        <span>{{course.teacher.name}}</span>
                    </div>
                    <div class="teacher-school">
                        <span v-if="course.teacher.school">{{course.teacher.school.name}}</span>
                        <span v-else>未填写学校</span>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    //import router from '../../../router'

    export default {
        name: "course-side-bar",
        data() {
            return {
                mediaIP: this.$store.state.mediaIP,
            }
        },
        props: {
            course: {},
        },
        created() {
        },
        methods: {}
    }
</script>

<style scoped>
    .sidebar {
        background-color: #eee;
        border-radius: 0 0 20px 20px;
        box-shadow: 0 0 10px #B09999;
    }

    .course-teacher{
        margin-top: 30px;
        padding: 20px;
        border-radius: 20px;
        text-align: left;
        background-color: #eee;
        box-shadow: 0 0 10px #B09999;
    }
    .course-teacher:hover, .course-info:hover{
        box-shadow: 0 0 20px #B09999;
    }

    .course-info{
        margin-top: 30px;
        padding: 20px;
        border-radius: 0 20px 20px;
        text-align: left;
        background-color: #eee;
        box-shadow: 0 0 10px #B09999;
    }
    .course-brief{
        font-size: 14px;
        margin-bottom: -14px;
        font-weight: 500;
        word-wrap: break-word;
        white-space: pre-wrap;
    }

    .course-name, .teacher-title{
        border-bottom: 1px solid #aaa;
        padding-bottom: 10px;
        font-size: 15px;
        font-weight: 600;
    }
    .course-num{
        float: right;
    }

    .course-img img{
        width: 100%;
        height: 100%;
        border-radius: 0 0 20px 20px;
    }
    .teacher-img img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
    .teacher-img{
        width: 60px;
        height: 60px;
    }
    .teacher-main{
        margin-top: 10px;
        margin-bottom: -10px;
    }
    .teacher-school{
        font-size: 14px;
    }
    .teacher-name{
        padding-top: 10px;
    }
    .course-img {
        height: 200px;
    }
</style>