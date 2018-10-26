<template>
    <el-col :span="12">
        <el-card class="courseCard" :body-style="{ padding: '0px'}" shadow="hover" @click.native="handleSelect">
            <el-row class="course">
                <el-col :span="12" class="image">
                    <img src="../../assets/image/avatar.jpg" alt="">
                </el-col>
                <el-col :span="12" class="course-info">
                    <div class="course-name">
                        <span>{{course.course.name}}</span>
                    </div>
                    <div class="course-teacher">
                        <span><i class="el-icon-location"></i> {{course.course.teacher.name}}</span>
                        <span><i class="el-icon-view"></i> {{course.course.userNum}}</span>
                    </div>
                    <div class="course-intro">
                        <span v-if="course.course.brief">{{course.course.brief}}</span>
                        <span v-else>未填写课程简介</span>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </el-col>
</template>

<script>
    //import axios from 'axios'
    import router from '../../router'
    export default {
        name: "course-card",
        data(){
            return{
            }
        },
        props:{
            course: Object
        },
        methods:{
            handleSelect(){
                router.push({path: `/course/${this.course.id}/learn`});
                //router.push({name: 'courseHomepage', params: {courseId:this.course.course.id}});
                // axios.get(this.$store.state.actionIP + '/course/getCourseById.action', {
                //     params: {
                //         courseId: this.course.course.id
                //     }
                // })
                //     .then(response => {
                //         if (response.data.status === 403) {
                //             this.$message.error(response.data.data);
                //         }
                //         else if (response.data.status === 200) {
                //             router.push({name: 'courseHomepage', params: {courseId:this.course.course.id}});
                //             console.log(response.data.data)
                //         }
                //         else if (response.data.status === 500) {
                //             this.$message.error('服务器出错')
                //         }
                //     })
                //     .catch(error => {
                //         this.$message.error('未连接到服务器');
                //         console.log(error);
                //     });
            }
        }
    }
</script>

<style scoped>
    img{
        margin: 5px;
        width: 100%;
    }
    .image{
        display: inline-block;
        width: 150px;
        vertical-align: top;
    }
    .course-info{
        display: inline-block;
        text-align: left;
        margin-left: 25px;
    }
    .courseCard{
        margin: 10px;
    }
    .course{
        min-width: 400px;
    }
    .course-teacher{
        margin-top: 25px;
        font-size: 80%;
    }
    .course-teacher :nth-child(2){
        float: right;
    }
    .course-intro{
        margin-top: 15px;
        font-size: 80%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .course-name{
        margin-top: 20px;
        font-weight: bolder;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>