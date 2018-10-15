<template>
    <div>
        <el-dialog title="用户信息" :visible.sync="userInfoDialogVisible" width="30%" @open="getUserInfo">
            <span>姓名：{{userInfo.name}}</span>
            <span>：{{userInfo.name}}</span>
            <span>姓名：{{userInfo.name}}</span>
            <span>姓名：{{userInfo.name}}</span>
            <span>姓名：{{userInfo.name}}</span>
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="close">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import axios from 'axios'
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
            getUserInfo(id){
                axios.get(this.$store.state.actionIP+'/authority/getUserInfo.action',{
                    params:{
                        id:id
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

</style>