<template>
    <div class="course-homepage">
        <course-card :course="course" :changeBackgroundColor="changeBgColor"/>
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
    import axios from '../../../axiosIntercepter'
    export default {
        name: "course-homepage",
        components:{
            courseCard: ()=>import('../../../components/Course/CourseHomepage/CourseCard'),
            courseDetail: ()=>import('../../../components/Course/CourseHomepage/CourseDetail'),
            courseTeacher: ()=>import('../../../components/Course/CourseHomepage/CourseTeacher')
        },
        data(){
            return{
                course: Object
            }
        },
        created(){
            this.getCourse()
        },
        methods:{
            getCourse(){
                axios.get('/action/course/getCourseById.action', {
                    params: {
                        courseId: this.$route.params.courseId
                    }
                }).then(response => {
                        if (response.data.status === 403) {
                            this.$message.error(response.data.data);
                        }
                        else if (response.data.status === 200) {
                            this.course = response.data.data
                            this.createHistory()
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
            createHistory(){
                axios.get('/action/history/addNewHistory.action',{
                    params:{
                        courseId:this.$route.params.courseId
                    }
                }).then((res)=>{
                    console.log(res)
                })
            },
            changeBgColor(data){
                document.querySelector('.course-homepage').backgroundColor = data;
            }
        }
    }
</script>

<style scoped>
    .course-homepage{
    }
    .course-bar{
        margin-top: 40px;
    }
</style>