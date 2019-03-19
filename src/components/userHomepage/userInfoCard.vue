<template>
    <div class="userInfoCard">
        <el-row justify="space-around" class="userinfo-row">
            <el-col :span="10" class="info">
                <el-row>
                    <el-col :span="8">
                        <div class="userImg">
                            <div v-if="user.img===undefined">
                                <img src="../../assets/image/avatar.jpg" alt="" class="avatar">
                            </div>
                            <div v-else>
                                <img :src="'/media' + user.img" alt="" class="avatar">
                            </div>
                            <!-- <div class="avatar-gray" @click="modifyAvatar">
                                <span class="avatar-cover">更换头像</span>
                            </div> -->
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
                                <span v-if="user.school">{{user.school.name}}</span>
                                <span v-else>学校未填写</span>
                            </div>
                            <div class="intro">
                                <span v-if="user.intro">{{user.intro}}</span>
                                <span v-else>此用户未填写个人简介</span>
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
        <avatar-dialog ref="avatarDialog"/>
    </div>

</template>

<script>
    export default {
        name: "user-info-card",
        components:{
            avatarDialog: ()=>import('./avatarDialog')
        },
        data() {
            return {
                user: this.$store.getters.getStorge.user,
            }
        },
        methods:{
            modifyAvatar(){
                this.$refs.avatarDialog.avatarUpload();
            }
        },
        created:function(){
            console.log(this.user)
            console.log(this.user.name)
        }
    }
</script>

<style scoped>
    .userInfoCard {
        height: 17rem;
        background-image: url("../../assets/image/show3.jpg");
        color: #fff;
        border-radius:20px 20px 20px 20px;
        box-shadow: 0 0 10px #B09999;
    }
    .userImg {
        width: 80px;
        height: 80px;
        display: inline-block;
        vertical-align: top;
        margin-left: 20%;
        float: right;
    }
    /* .avatar-cover{
        position: relative;
        top: 33px;
        left: 12px;
        font-size: 90%;
    }
    .avatar-gray:hover{
        opacity: 0.7;
        cursor: pointer;
    }
    .avatar-gray{
        background-color: black;
        position: relative;
        opacity: 0;
        top: -84px;
        height: 80px;
        border-radius: 100%;
    } */
    img {
        width: 100%;
        border-radius: 100%;
        height: 100%;
    }
    .info{
        display: inline-block;
        margin-top: 7rem;
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
        /*-webkit-line-clamp: 2;*/
        overflow: hidden;
    }
    .userInfo{
        margin: 15px;
        display: inline-block;
    }
</style>