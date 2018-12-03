<template>
    <div class="adminCourses">
        <el-row>
            <h1>正在申请的课程</h1>
                <h5 v-if="applying.length===0">这里空空如也</h5>
                <el-col :span="8" v-for="(course,index) in applying" :key="course.id">
                    <div class="card">
                    <img src="../../assets/image/avatar.jpg" class="image" @click="goToCourse()">
                    <div>
                        <a class="courseName" href="javascript:void (0);" @click="goToCourse(course.id)">{{index}}. {{course.name}}</a>
                        <a class="updater" href="javascript:void (0);" @click="goToTeacher(course.teacher.id)">{{course.teacher.id}}</a>
                        <p class="courseIntro">{{course.state}}</p>
                    </div>
                    </div>
                </el-col>
        </el-row>
        <el-row>
            <h1>申请通过的课程</h1>
            <h5 v-if="accept.length===0">这里空空如也</h5>
            <el-col :span="8" v-for="(course,index) in accept" :key="course.id">
                <div class="card">
                    <img src="../../assets/image/avatar.jpg" class="image">
                    <div>
                        <a class="courseName" href="javascript:void (0);" @click="goToCourse(course.id)">{{index}}. {{course.name}}</a>
                        <a class="updater" href="javascript:void (0);" @click="goToTeacher(course.teacher.id)">{{course.teacher.id}}</a>
                        <p class="courseIntro">{{course.state}}</p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <h1>申请未通过的课程</h1>
            <h5 v-if="rejected.length===0">这里空空如也</h5>
            <el-col :span="8" v-for="(course,index) in rejected" :key="course.id">
                <div class="card">
                    <img src="../../assets/image/avatar.jpg" class="image">
                    <div>
                        <a class="courseName" href="javascript:void (0);" @click="goToCourse(course.id)">{{index}}. {{course.name}}</a>
                        <a class="updater" href="javascript:void (0);" @click="goToTeacher(course.teacher.id)">{{course.teacher.id}}</a>
                        <p class="courseIntro">{{course.state}}</p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <user-info-dialog :id="id"></user-info-dialog>
    </div>
</template>

<script>
    import router from '../../router'

    export default {
        name: "courseAudit",
        props:['rejected','accept','applying'],
        data(){
            return {
                id:'',
            }
        },
        components:{
            userInfoDialog: ()=>import('../common/userInfoDialog')
        },
        methods:{
            goToCourse(courseId){
                router.push('/course/'+courseId+'/homepage')
            },
            goToTeacher(id){
                this.$store.commit("userInfoShow");
                this.id=id
            }
        }
    }
</script>

<style scoped>
    .adminCourses{
        background-color: whitesmoke;
    }
    .courseName{
        white-space:nowrap;
        overflow: hidden;
        word-break: keep-all;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;

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