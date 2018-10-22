<template>
    <div class="course-homepage">
        <course-card :course="course"/>
        <el-row class="course-bar">
            <el-col :span="18">
                <course-detail :course="course"/>
            </el-col>
            <el-col :span="6">
                <course-teacher :course="course"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "course-homepage",
        components:{
            courseCard: ()=>import('../../components/CourseHomepage/CourseCard'),
            courseDetail: ()=>import('../../components/CourseHomepage/CourseDetail'),
            courseTeacher: ()=>import('../../components/CourseHomepage/CourseTeacher')
        },
        data(){
            return{
                course: Object
            }
        },
        created(){
            axios.get(this.$store.state.actionIP + '/course/getCourseById.action', {
                params: {
                    courseId: this.$route.params.courseId
                }
            })
                .then(response => {
                    if (response.data.status === 403) {
                        this.$message.error(response.data.data);
                    }
                    else if (response.data.status === 200) {
                        this.course = response.data.data
                    }
                    else if (response.data.status === 500) {
                        this.$message.error('服务器出错')
                    }
                })
                .catch(error => {
                    this.$message.error('未连接到服务器');
                    console.log(error);
                });
        }
    }
</script>

<style scoped>
    .course-homepage{
        margin: 20px;
    }
    .course-bar{
        margin: 20px 60px 0;
    }
</style>