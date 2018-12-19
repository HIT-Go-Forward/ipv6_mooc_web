<template>
    <div class="course-teacher">
        <div class="teacher-header">
            <span>授课教师</span>
        </div>
        <div class="teacher-list">
            <div class="teacher-info">
                <el-row>
                    <el-col :span="8">
                        <div class="teacher-img">
                            <img :src="'/media' + course.teacher.img" alt="">
                        </div>
                    </el-col>
                    <el-col :span="16">
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
    </div>
</template>

<script>
    export default {
        name: "course-teacher",
        props:{
            course: Object
        },
        data(){
            return{
            }
        }
    }
</script>

<style scoped>
    .course-teacher{
        background-color: #eee;
        text-align: left;
        padding: 20px;
        border-radius: 20px 0 20px 20px;
        box-shadow: 0 0 10px #B09999;
    }
    .course-teacher:hover{
        box-shadow: 0 0 20px #B09999;
    }
    .teacher-header{
        padding: 0 0 10px;
        border-bottom: 1px solid #aaa;
        font-size: 15px;
    }
    .teacher-img{
        width: 60px;
        height: 60px;
    }
    img{
        width: 100%;
        border-radius: 100%;
        height: 100%;
    }
    .teacher-info{
        margin-top: 30px;
    }
    .teacher-name{
        margin-top: 10px;
    }
    .teacher-school{
        font-size: 90%;
    }
</style>