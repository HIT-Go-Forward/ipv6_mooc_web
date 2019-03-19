<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="course-detail">
        <el-tab-pane label="课程详情" name="courseDetail">
            <course-info :course="course"/>
        </el-tab-pane>
        <el-tab-pane label="课程评论" name="courseComment">
            <course-comment  :courseId="course.id" commentType="course"/>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "course-detail",
        props:{
            course: ''
        },
        components:{
            courseInfo: ()=>import('./CourseInfo'),
            courseComment: ()=>import('../common/Comment'),
        },
        data(){
            return{
                activeName: 'courseDetail'
            }
        },
        methods: {
            handleClick(tab){
                console.log(tab)
            }
        }
    }
</script>

<style scoped>
    .course-detail{
        padding: 20px;
        margin-right: 20px;
        border-radius: 20px;
        box-shadow: 0 0 10px #B09999;
        background-color: #eee;
        min-height: 500px;
    }
    .course-detail:hover{
        box-shadow: 0 0 20px #B09999;
    }
</style>