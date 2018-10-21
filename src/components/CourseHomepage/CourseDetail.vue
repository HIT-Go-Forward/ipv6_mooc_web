<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="course-detail">
        <el-tab-pane label="课程详情" name="courseDetail">{{course.intro}}</el-tab-pane>
        <el-tab-pane label="课程评价" name="courseComment"> </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "course-detail",
        props:{
            course: Object
        },
        data(){
            return{
                activeName: 'courseDetail'
            }
        },
        methods: {
            handleClick(tab){

            }
        }
    }
</script>

<style scoped>
    .course-detail{
        padding: 0 50px;
        margin-right: 20px;
        background-color: #eee;
        min-height: 300px;
    }
</style>