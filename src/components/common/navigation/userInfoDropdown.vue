<template>
    <el-dropdown @command="handleCommand">
        <span>{{this.$store.getters.getStorge.user.name}}</span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">个人中心</el-dropdown-item>
            <el-dropdown-item command="2">修改个人信息</el-dropdown-item>
            <el-dropdown-item command="3">申请成为教师</el-dropdown-item>
            <el-dropdown-item command="4">站内信息</el-dropdown-item>
            <el-dropdown-item command="5" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    import router from "../../../router"
    import axios from "axios"
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
                    axios.get(this.$store.state.actionIP+'/authority/logout.action')
                        .then(response=>{
                            if(response.data.status===403){
                                this.$message.error(response.data.data)
                            }
                            else if(response.data.status===200){
                                document.cookie = 'id='+this.$store.getters.getStorge.user.id+'; max-age=0';
                                document.cookie = 'password='+this.$store.getters.getStorge.user.password+'; max-age=0';
                                this.$store.state.IsLogin = false;
                                router.push({name: 'homepage'});
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

</style>