<template>
    <div class="userHomepageBar">
        <el-tabs v-model="tabName">
            <el-tab-pane label="已学习" name="doneCourse"> </el-tab-pane>
            <el-tab-pane label="正在学习" name="learningCourse"> </el-tab-pane>
            <el-tab-pane label="浏览记录" name="visitCourse"> </el-tab-pane>
            <el-tab-pane label="发布课程" name="releaseCourse"> </el-tab-pane>
            <el-tab-pane label="申请成为教师" name="applyTeacher"> </el-tab-pane>
            <el-tab-pane label="修改密码" name="modifyPassword"> </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "user-homepage-bar",
        data(){
            return{
                tabName: 'doneCourse',
            }
        }
    }
</script>

<style scoped>
    .userHomepageBar{
        margin-left: 100px;
        margin-right: 300px;
        margin-top: 40px;
    }
</style>