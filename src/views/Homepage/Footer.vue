<template>
    <el-col class="footer"  :span="24">
        <el-row class="" type="flex" justify="center">
                <el-button type="text">关于本站</el-button>
                <el-button type="text">意见反馈</el-button>
                <el-button type="text">联系我们</el-button>
        </el-row>
        <div>
            <span class="footer-right">备案号 xxxxxxxxxxxxxx    @2018-2019  ipv6_Mooc</span>
        </div>
    </el-col>
</template>

<script>
    export default {
        name: "el-footer"
    }
</script>

<style scoped>
    .footer{
        background-color: #ddd;
    }
    .footer-right{
        font-size: 14px;
        font-weight: 500;
    }
    .el-row > .el-button{
        margin: 0 10px;
    }
</style>