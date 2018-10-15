<template>
    <div class="userInfoCard">
        <el-row type="flex" justify="space-around">
            <el-col :span="10" class="info">
                <el-row>
                    <el-col :span="8">
                        <div class="userImg">
                            <img src="../../assets/image/avatar.jpg" alt="">
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="userInfo">
                            <div class="name">
                                <span>{{user.name}}</span>
                            </div>
                            <div class="identify">
                                <span v-if="user.type===4">学生</span>
                                <span v-else-if="user.type===3">教师</span>
                                <span v-else-if="user.type===2">管理员</span>
                                <span> | </span>
                                <span v-if="user.school!==null">{{user.school.name}}</span>
                                <span v-else>学校未知</span>
                            </div>
                            <div class="intro">
                                <span v-if="user.intro!==null">此用户未填写个人简介</span>
                                <span v-else>{{user.intro}}</span>
                            </div>
                        </div>
                    </el-col>
                </el-row>
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
        width: 80px;
        display: inline-block;
        vertical-align: top;
        margin-left: 20%;
        float: right;
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
    .name{
        font-size: 200%;
    }
    .intro{
        margin-top: 10px;
        font-size: 80%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .userInfo{
        margin: 15px;
        display: inline-block;
    }
</style>