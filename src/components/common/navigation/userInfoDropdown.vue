<template>
    <el-dropdown @command="handleCommand">
        <a class="user-text" href="javascript:"><img :src="this.$store.getters.getStorge.user.img">{{this.$store.getters.getStorge.user.name}}<i class="el-icon-caret-bottom"></i></a>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1" class="dropdown-item">个人中心</el-dropdown-item>
            <el-dropdown-item command="2" class="dropdown-item">修改个人信息</el-dropdown-item>
            <el-dropdown-item command="3" class="dropdown-item">申请成为教师</el-dropdown-item>
            <el-dropdown-item command="4" class="dropdown-item">站内信息</el-dropdown-item>
            <el-dropdown-item command="5" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    import router from "../../../router"
    import axios from "../../../axiosIntercepter"
    export default {
        name: "user-info-dropdown",
        methods: {
            handleCommand(command){
                if(command==='1'){
                    router.push({name: 'userHomepage'})
                }
                else if(command==='2'){
                    router.push({name: 'userSetting'})
                }
                else if(command==='5'){
                    axios.get('/action/authority/logout.action')
                        .then(response=>{
                            if(response.data.status===403){
                                this.$message.error(response.data.data)
                            }
                            else if(response.data.status===200){
                                document.cookie = 'id='+this.$store.getters.getStorge.user.id+'; max-age=0';
                                document.cookie = 'password='+this.$store.getters.getStorge.user.password+'; max-age=0';
                                this.$store.state.IsLogin = false;
                                router.push({name: 'Homepage'});
                            }
                        })
                        .catch(error => {
                            this.$message.error('未连接到服务器');
                            console.log(error);
                        });
                }
            }
        }
    }
</script>

<style scoped>
    .dropdown-item{
        width: 100px;
        transition: padding-right, padding-left;
        transition-duration: 500ms;
    }
    .dropdown-item:hover{
        padding-left: 30px;
        padding-right: 10px;
    }
    .user-text{
        font-size: 1.5rem;
        color: #fff;
        text-decoration: none;
    }
</style>