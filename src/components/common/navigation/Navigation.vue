<template>
    <el-col class="Navigation">
        <el-col class="menu-item-logo" :span="2" :offset="3">
            <img alt="Vue logo" class="logo" src="../../../assets/image/logo.png">
        </el-col>
        <el-col class="menu-item-text" :span="6"><a href="javascript:" @click="handleSelect(1)">课程</a></el-col>
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
        created() {
            if (document.cookie.indexOf("token=") !== -1) {
                this.$store.state.IsLogin = true;
            }
            else{
                router.push({name: 'homepage'});
            }
        },
        mounted() {
            this.IsLogin = localStorage.getItem('Flag')==='islogin';
            if(this.$route.path==='/'){
                document.querySelector(".Navigation").style.position = "fixed"
            }
        },
        watch:{
            $route(to,from){
                console.log("from:"+from.path+";"+"to:"+to.path)
                if(from.path==='/'){
                    window.removeEventListener("scroll",this.handleScroll,true)
                    document.querySelector(".Navigation").style.position = "relative"
                }
                if(to.path==='/'){
                    document.querySelector(".Navigation").style.position = "fixed"
                    window.addEventListener("scroll",this.handleScroll,true)
                }
            }
        },
        methods: {
            handleSelect(key) {
                switch (key) {
                    case 1:
                        router.push({name: 'Homepage'});
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
    .Navigation{
        position: relative;
        background-color: black;
        height: 4rem;
        color: #fff;
        font-size: 2rem;

        top:0;
        left: 0;
        padding-right: 10rem;
        z-index:1000;
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
        width: 20rem;
    }
    .menu-item-search{
        padding-right: 2rem;
    }
</style>