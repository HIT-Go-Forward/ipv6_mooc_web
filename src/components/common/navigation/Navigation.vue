<template>
    <el-col class="Navigation">
        <el-col class="menu-item-logo" :span="2" :offset="3">
            <img alt="Vue logo" class="logo" src="../../../assets/image/logo.png">
        </el-col>
        <el-col class="menu-item-text" :span="6"><a href="javascript:">课程</a></el-col>
        <el-col class="menu-item-text" :span="6"><a href="javascript:">博客</a></el-col>
        <el-col class="menu-item-text" :span="6"><a href="javascript:">直播</a></el-col>
        <el-col></el-col>
        <el-col class="menu-item-search" :span="6">
            <el-input size="big" placeholder="查询感兴趣的课程" prefix-icon="el-icon-search" class="search-input"/>
        </el-col>
        <el-col v-if="!IsLogin" class="menu-item-sign" :span="6">
            <register-dialog/>/
            <login-dialog/>
        </el-col>
        <el-col v-else class="menu-item" :span="6">
            <userInfoDropdown/>
        </el-col>
    </el-col>
</template>
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
                router.push({name: 'Homepage'});
            }
        },
        methods: {
            handleSelect(key) {
                switch (key) {
                    case '1':
                        router.push({name: 'Homepage'});
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    .Navigation{
        background-color: black;
        position:fixed;
        height: 4rem;
        color: #fff;
        font-size: 2rem;

        top:0;
        left: 0;
        padding-right: 10rem;
        z-index: 1000;
        display: flex;
        align-items: center;

        opacity: 0.7;
    }
    .menu-item-text :hover{
        color: darkgrey;
    }
    a{
        text-decoration: none;
        color: #fff;
    }
    .logo{
        width: 100%;
    }
    .menu-item-sign{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .search-input{
        width: 20rem;
    }
    .menu-item-search{
        padding-right: 2rem;
    }
</style>