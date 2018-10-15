<template>
    <div class="Navigation">
        <el-menu
                :defult-active="activeIndex" mode="horizontal" class="el-menu" @select="handleSelect"
                background-color="#333" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">
                <img alt="Vue logo" src="../../../assets/image/logo.png">
            </el-menu-item>
            <el-menu-item index="2">课程</el-menu-item>
            <el-menu-item index="3">名校</el-menu-item>
            <div v-if="!IsLogin">
                <el-menu-item index="4" style="float:right">
                    <register-dialog/>
                </el-menu-item>
                <el-menu-item index="5" style="float:right">
                    <login-dialog/>
                </el-menu-item>
            </div>
            <div v-else>
                <el-menu-item index="6" style="float: right">
                    <userInfoDropdown/>
                </el-menu-item>
            </div>
            <el-menu-item index="7" style="float:right" v-show="this.$route.path==='/homepage' || this.$route.path==='/'">
                <div>
                    <el-input size="small" placeholder="查询感兴趣的课程" prefix-icon="el-icon-search"/>
                </div>
            </el-menu-item>
        </el-menu>
    </div>
</template>
x
<script>
    import {mapState} from 'vuex'
    import router from '../../../router'
    export default {
        name: "Navigation",
        data() {
            return {
                activeIndex: 1
            }
        },
        components: {
            loginDialog: () => import('./LoginDialog'),
            registerDialog: () => import('./RegisterDialog'),
            userInfoDropdown: () => import('./userInfoDropdown')
        },
        computed: {
            ...mapState({
                IsLogin: state => state.IsLogin
            })
        },
        created() {
            if (document.cookie.indexOf("id=") !== -1) {
                this.$store.state.IsLogin = true;
            }
            else{
                router.push('homepage');
            }
        },
        methods: {
            handleSelect(key) {
                switch (key) {
                    case '1':
                        router.push('homepage');
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    .el-menu-item {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-size: 16px;
    }

    .el-menu {
        padding-left: 20px;
        padding-right: 40px;
    }

    .el-menu .el-menu-item img {
        height: 40px;
    }
</style>