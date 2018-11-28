<template>
    <div class="course-entity">
        <el-row>
            <el-col :span="7">
                <course-side-bar :course="course"/>
            </el-col>
            <el-col :span="17">
                <courseware :course="course" :lessonList="lessonList" :chapterList="chapterList"/>
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
                course: {},
                lessonList: [],
                chapterList: [],
            }
        },
        created(){
            this.getCourseInfo();
        },
        methods: {
            getCourseInfo(){
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
                            this.course = response.data.data;
                            axios.get(this.$store.state.actionIP + '/course/getCourseOutline.action', {
                                params: {
                                    courseId: this.course.id
                                }
                            })
                                .then(response => {
                                    if (response.data.status === 403) {
                                        this.$message.error(response.data.data);
                                    }
                                    else if (response.data.status === 200) {
                                        for(let i=0;i<response.data.data.length;i++){
                                                this.lessonList.push(response.data.data[i]);
                                                while(this.chapterList.length<response.data.data[i].chapterNum){
                                                    this.chapterList.push("");
                                                }
                                                this.chapterList[response.data.data[i].chapterNum-1] = response.data.data[i];
                                        }
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
                        else if (response.data.status === 500) {
                            this.$message.error('服务器出错')
                        }
                    })
                    .catch(error => {
                        this.$message.error('未连接到服务器');
                        console.log(error);
                    });
            },
        }
    }
</script>

<style scoped>

</style>