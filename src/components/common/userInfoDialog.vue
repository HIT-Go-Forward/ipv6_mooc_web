<template>
    <div>
        <el-dialog title="用户信息" :visible.sync="userInfoDialogVisible" center width="30%" @open="getUserInfo" :modal="false">
            <div v-if="userInfo.img" class="img-block" align="center">
                <img :src="'/media'+userInfo.img" class="userImg" alt="照片找不到了哦" width="66%">
            </div>
            <ul class="info-list">
                <li>
                    <span>姓名：</span>
                    <span v-if="userInfo.name">{{userInfo.name}}</span>
                    <span v-else>这个人竟然没有名字！</span>
                </li>
                <li>
                    <span>邮箱：</span>
                    <span>{{userInfo.email}}</span>
                </li>
                <li v-if="userInfo.phone">
                    <span>联系方式：</span>
                    <span>{{userInfo.phone}}</span>
                </li>
                <li v-if="userInfo.education">
                    <span>学历：</span>
                    <span v-if="userInfo.education===1">初中及以下</span>
                    <span v-if="userInfo.education===2">高中</span>
                    <span v-if="userInfo.education===3">本科</span>
                    <span v-if="userInfo.education===4">硕士及以上</span>
                </li>
                <li>
                    <span>类型：</span>
                    <span v-if="userInfo.type===2">管理员用户</span>
                    <span v-if="userInfo.type===3">教师用户</span>
                    <span v-if="userInfo.type===4">学生用户</span>
                    <span v-if="userInfo.type===6">已被封禁的用户</span>
                    <span v-if="userInfo.type===5">游客</span>
                </li>
                <li>
                    <span>性别：</span>
                    <span v-if="userInfo.sex==='F'">男</span>
                    <span v-else-if="userInfo.sex==='M'">女</span>
                </li>
                <li v-if="userInfo.school">
                    <span>学校：</span>
                    <span>{{userInfo.school.name}}</span>
                </li>
            </ul>
            <div class="intro-part">
                <p class="intro-title">自我介绍：</p>
                <p v-if="userInfo.intro" class="intro">{{userInfo.intro}}</p>
                <p v-else class="intro">没想到吧，我没有自我介绍</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="close">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import axios from '../../axiosIntercepter'
    export default {
        name: "userInfoDialog",
        props:['id'],
        data(){
            return {
                userInfo:'',
                dialogVisible: this.$store.state.userInfoDialogVisible
            }
        },
        computed: {
            ...mapState({
                userInfoDialogVisible : state => state.userInfoDialogVisible
            })
        },
        methods:{
            getUserInfo(){
                axios.get('/action/authority/getUserInfo.action',{
                    params:{
                        'userId':this.id,
                    }
                }).then((res)=>{
                    this.userInfo=res.data.data
                    console.log(res.data)
                }).catch((err)=>{
                    this.$message.error("联网错误")
                    console.log(err)
                })
            },
            close(){
                this.$store.commit("userInfoHide");
            }
        }
    }
</script>

<style scoped>
    .info-list{
        font-size: 1.5em;
        list-style: none;
    }
    .info-list span:nth-child(1){
        font-weight: bold;
    }
    .intro-part{
        margin-left: 3em;
    }
    .intro-title{
        font-size: 1.5em;
        font-weight: bold;
    }
    .intro{
        border: 2px solid darkgrey;
        margin-bottom: 0;
        margin-right: 3em;
        height: 100px;
        font-size: 1.5em;
        padding: 0.5em 1em 0.5em 1em;
        border-radius: 2em;
        box-shadow: 2px 2px lightgrey;

    }
    .userImg{
        margin: 0 auto;
    }
    .img-block{
        display: block;
        width: 100%;
    }
</style>