<template>
    <el-col class="footer"  :span="24">
        <el-row class="link" type="flex" justify="center">
            <el-col class="info" :span="12">
                <el-row>
                    <img class="logo" src="../../assets/image/logo.png" alt="">
                </el-row>
                <div class="introduction">
                    V6课堂是一个基于ipv6教育网络的在线课程学习平台。
                </div>
            </el-col>
            <el-col class="about" :span="2">
                <el-row class="title">关于我们</el-row>
                <el-row>
                    <el-button class="link-button" type="text">关于本站</el-button>
                </el-row>
                <el-row>
                    <el-button class="link-button" type="text">意见反馈</el-button>
                </el-row>
                <el-row>
                    <el-button class="link-button" type="text">联系我们</el-button>
                </el-row>
            </el-col>
            <el-col class='blogroll' :span="2">
                <el-row class="title">友情链接</el-row>
                <el-row>
                    <el-button class="link-button" type="text" onclick="window.open('https://www.icourse163.org', '_blank')">中国大学MOOC</el-button>
                </el-row>
                <el-row>
                    <el-button class="link-button" type="text" onclick="window.open('https://www.cnmooc.org', '_blank')">好大学在线</el-button>
                </el-row>
                <el-row>
                    <el-button class="link-button" type="text" onclick="window.open('https://study.163.com', '_blank')">网易云课堂</el-button>
                </el-row>
            </el-col>
            <el-col class="power" :span="2">
                <el-row class="title">Powered by</el-row>
                <el-row>
                    <el-button class="link-button" type="text" onclick="window.open('https://element.eleme.cn', '_blank')">Element</el-button>
                </el-row>
                <el-row>
                    <el-button class="link-button" type="text" onclick="window.open('https://vuefe.cn', '_blank')">Vue.js</el-button>
                </el-row>
                <el-row>
                    <el-button class="link-button" type="text" onclick="window.open('http://dplayer.js.org', '_blank')">DPlayer</el-button>
                </el-row>
            </el-col>
        </el-row>
        <div class="record">
            <span class="footer-right">备案号：xxxxxxxxxxxxxxxxx @2018-2019  ipv6_Mooc</span>
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
        background-color: #272727;
        height: 250px;
        padding: 20px;
        margin-top: 20px;
    }
    .logo{
        float: left;
        height: 100px;
    }
    .link-button{
        color: #a7a7a7;
    }
    .link-button :hover{
        color: cyan;
    }
    .about, .blogroll, .power{
        margin: 0 0 0 50px;
        text-align: left;
        color: #a7a7a7;
    }
    .title{
        font-size: 22px;
        margin: 0 0 10px 10px;
        font-weight: 500;
    }
    .record{
        margin-top: 10px;
    }
    .introduction{
        color: #a7a7a7;
        font-size: 20px;
        font-weight: 500;
        margin: 0 0 0 10px;
        text-align: left;
    }
    .link{
        height: 180px;
    }
    .footer-right{
        color: #a7a7a7;
        font-size: 16px;
        font-weight: 500;
    }
    .el-row > .el-button{
        margin: 0 10px;
    }
</style>