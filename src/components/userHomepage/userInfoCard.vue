<template>
    <div class="userInfoCard">
        <el-row type="flex" justify="space-around">
            <el-col :span="10" class="info">
                <div class="userImg">
                    <img src="../../assets/image/avatar.jpg" alt="">
                </div>
                <div class="userInfo">
                    <div class="name">
                        <span>{{user.name}}</span>
                    </div>
                    <div class="identify">
                        <span>学生</span>
                    <span> | </span>
                        <span>哈尔滨工业大学</span>
                    </div>
                </div>
                <div class="intro">
                    <span>个人简介：计算机学院信息安全专业</span>
                </div>
            </el-col>
            <el-col :span="10">
                <div>

                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "user-info-card",
        data() {
            return {
                user: this.$store.getters.getStorge.user
            }
        }
    }
</script>

<style scoped>
    .userInfoCard {
        height: 200px;
        background-image: url("../../assets/image/show3.jpg");
        color: #fff;
    }
    .userImg {
        width: 15%;
        display: inline-block;
        vertical-align: top;
        margin-left: 20%;
    }
    img {
        width: 100%;
        border-radius: 100%;
    }
    .info{
        display: inline-block;
        margin-top: 40px;
        text-align: left;
    }
    .intro{
        margin-left: 20%;
    }
    .name{
        font-size: 200%;
    }
    .userInfo{
        margin: 15px;
        display: inline-block;
    }
</style>