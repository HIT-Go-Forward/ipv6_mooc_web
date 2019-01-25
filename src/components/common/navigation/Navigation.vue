<template>
    <div class="Navigation">
        <el-menu
                :defult-active="activeIndex" mode="horizontal" class="el-menu" @select="handleSelect"
                background-color="#333" text-color="#fff" active-text-color="#ffd04b">
            <div class="menu-main">
                <el-menu-item index="1" class="el-menu-item" style="float: left">
                    <img alt="Vue logo" src="../../../assets/image/logo.png">
                </el-menu-item>
                <el-menu-item index="2" class="el-menu-item" style="float: left">课程</el-menu-item>
                <el-menu-item index="3" class="el-menu-item" style="float: left">名校</el-menu-item>
                <div v-if="!IsLogin">
                    <el-menu-item index="4" style="float:right"  class="el-menu-item">
                        <register-dialog/>
                    </el-menu-item>
                    <el-menu-item index="5" style="float:right"  class="el-menu-item">
                        <login-dialog/>
                    </el-menu-item>
                </div>
                <div v-else>
                    <el-menu-item index="6" style="float: right"  class="el-menu-item">
                        <userInfoDropdown/>
                    </el-menu-item>
                </div>
                <el-menu-item  class="el-menu-item" index="7" style="float:right" v-show="this.$route.path==='/homepage' || this.$route.path==='/'">
                    <div>
                        <el-input size="small" placeholder="查询感兴趣的课程" prefix-icon="el-icon-search"/>
                    </div>
                </el-menu-item>
            </div>
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
            if (document.cookie.indexOf("token=") !== -1) {
                this.$store.state.IsLogin = true;
            }
            else{
                router.push({name: 'homepage'});
            }
        },
        methods: {
            handleSelect(key) {
                switch (key) {
                    case '1':
                        router.push({name: 'homepage'});
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

    .menu-main {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }

    .el-menu-item{
        display: inline;
    }

    .el-menu .el-menu-item img {
        height: 40px;
    }
</style>