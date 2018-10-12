<template>
    <div class="userHomepageBar">
        <div class="button-group">
            <el-button type="text">申请成为教师</el-button>
            <el-button round size="small" plain>申请成为教师</el-button>
        </div>
        <el-tabs v-model="tabName">
            <el-tab-pane label="全部课程" name="all"> </el-tab-pane>
            <el-tab-pane label="正在学习" name="learning"> </el-tab-pane>
            <el-tab-pane label="已学习" name="done"> </el-tab-pane>
            <el-tab-pane label="浏览记录" name="history"> </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "user-homepage-bar",
        data(){
            return{
                tabName: 'all',
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
    .button-group{
        text-align: left;
    }
</style>