<template>
    <div class="userSetting">
        <div class="userSettingBar">
            <el-tabs v-model="tabName">
                <el-tab-pane label="修改个人信息" name="modifyUserInfo"> </el-tab-pane>
                <el-tab-pane label="申请教师" name="applyTeacher"> </el-tab-pane>
                <el-tab-pane label="修改密码" name="modifyPassword"> </el-tab-pane>
                <el-tab-pane label="更多" name="more"> </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: "user-setting",
        data(){
            return{
                tabName: 'modifyUserInfo',
            }
        }
    }
</script>

<style scoped>
    .userSettingBar{
        margin-left: 100px;
        margin-right: 300px;
        margin-top: 40px;
    }
</style>