<template>
    <div class="adminCourses">
        <el-row>
        <h1>正在申请的课程</h1>
            <h5 v-if="applying.length===0">这里空空如也</h5>
            <el-col :span="8" v-for="(course,index) in applying" :key="course.id">
            <el-card class="card">
                <img src="../../assets/image/avatar.jpg" class="image" @click="goToCourse()">
                <div>
                    <a class="courseName" href="javascript:void (0);" @click="goToCourse()">{{index}}. {{course.name}}</a>
                    <a class="updater" href="javascript:void (0);" @click="goToTeacher()">{{course.teacherId}}</a>
                    <p class="courseIntro">{{course.state}}</p>
                </div>
            </el-card>
        </el-col>
    </el-row>
        <el-row>
            <h1>申请通过的课程</h1>
            <h5 v-if="accept.length===0">这里空空如也</h5>
            <el-col :span="8" v-for="(course,index) in accept" :key="course.id">
                <el-card class="card">
                    <img src="../../assets/image/avatar.jpg" class="image">
                    <div>
                        <a class="courseName" href="javascript:void (0);" @click="goToCourse()">{{index}}. {{course.name}}</a>
                        <a class="updater" href="javascript:void (0);" @click="goToTeacher()">{{course.teacherId}}</a>
                        <p class="courseIntro">{{course.state}}</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <h1>申请未通过的课程</h1>
            <h5 v-if="rejected.length===0">这里空空如也</h5>
            <el-col :span="8" v-for="(course,index) in rejected" :key="course.id">
                <el-card class="card">
                    <img src="../../assets/image/avatar.jpg" class="image">
                    <div>
                        <a class="courseName" href="javascript:void (0);" @click="goToCourse()">{{index}}. {{course.name}}</a>
                        <a class="updater" href="javascript:void (0);" @click="goToTeacher()">{{course.teacherId}}</a>
                        <p class="courseIntro">{{course.state}}</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import router from '../../router'
    export default {
        name: "courseAudit",
        props:['rejected','accept','applying'],
        components:{

        },
        methods:{
            goToCourse(){
                router.push('course')
            },
            goToTeacher(){
                router.push('teacher')
            }
        }
    }
</script>

<style scoped>
    .adminCourses{
        background-color: whitesmoke;
    }
    .courseName{
        margin: 0;
        display: block;
        font-size: 1.5em;
        font-weight: bold;
        text-decoration: none;
        color: gray;
    }
    .updater{
        margin: 0;
        display: block;
        font-size: 0.8em;
        font-weight: bold;
        text-decoration: none;
        color: #000;
    }
    .image {
        float: left;
        width: 30%;
        display: inline-block;
        margin: -5px -5px 10px -5px;
    }
    .card {
        margin-left: 20px;
        margin-bottom: 20px;
        box-shadow: 1px 1px blanchedalmond;
        border: 2px solid whitesmoke;
        overflow: hidden;
    }
    .card:hover{
        border: 2px solid deepskyblue;
        box-shadow: 1px 1px lightblue;
    }
</style>