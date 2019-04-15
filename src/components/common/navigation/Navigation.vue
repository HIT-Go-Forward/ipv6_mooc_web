<template>
    <div class="nav-div">
    <el-col class="Navigation">
        <el-col class="menu-item-logo" :span="2" :offset="3">
            <img alt="Vue logo" class="logo" src="../../../assets/image/logo.png">
        </el-col>
        <el-col class="menu-item-text" :span="1"><a href="javascript:" @click="handleSelect(1)">课程</a></el-col>
        <el-col class="menu-item-text" :span="1"><a href="javascript:" @click="handleSelect(2)">博客</a></el-col>
        <el-col class="menu-item-text" :span="1"><a href="javascript:">直播</a></el-col>
        <el-col :span="8"></el-col>
        <el-col class="menu-item-search" :span="4">
            <el-input size="big" placeholder="查询感兴趣的课程" prefix-icon="el-icon-search" class="search-input"/>
        </el-col>
        <el-col v-if="!IsLogin" class="menu-item-sign" :span="4">
            <register-dialog/>
            <login-dialog/>
        </el-col>
        <el-col v-else class="menu-item" :span="4">
            <userInfoDropdown/>
        </el-col>
    </el-col>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import router from '../../../router'
    export default {
        name: "Navigation",
        data() {
            return {
                activeIndex: 1,
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
        methods: {
            handleSelect(key) {
                switch (key) {
                    case 1:
                        router.push({name: 'Homepage'});
                        break;
                    case 2:
                        router.push({name: 'blogHomepage'});
                        break;
                }
            },
            handleScroll(){
            //    wait for adding
            }
        }
    }
</script>

<style scoped>
    .nav-div{
        /*position: relative;*/
        background-color: black;
        /*width:100%;*/
        height: 4rem;
        color: #fff;
        font-size: 1.5rem;

        top:0;
        left: 0;
        padding-right: 10rem;
        padding-top: 0.5rem;
        z-index:1000;
        margin-bottom: 2rem;
    }
    .Navigation{
        display: flex;
        align-items: center;
        /*opacity: 0.7;*/
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
        width: 100%;
    }
    .menu-item-search{
        padding-right: 2rem;
    }
</style>