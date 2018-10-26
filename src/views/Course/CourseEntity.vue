<template>
    <div class="course-entity">
        <el-row>
            <el-col :span="7">
                <course-side-bar :course="course"/>
            </el-col>
            <el-col :span="17">
                <courseware :course="course"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "course-entity",
        components:{
            courseSideBar: ()=>import('../../components/Course/CourseEntity/CourseSideBar'),
            courseware: ()=>import('../../components/Course/CourseEntity/Courseware')
        },
        data(){
            return{
                course: {}
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

</style>