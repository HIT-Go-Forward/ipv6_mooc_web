<template>
    <el-menu :default-active="activeBar" @select="handleSelect"  background-color="#545c64"
             text-color="#fff" active-text-color="#ffd04b" class="course-menu">
        <!--TODO 课程图片-->
        <img :src="mediaIP + course.img" alt="" class="course-img">
        <img src="../../../assets/image/avatar.jpg" class="course-img">
        <el-menu-item index="notice">
            <i class="el-icon-menu"></i>
            <span slot="title">公告</span>
        </el-menu-item>
        <el-menu-item index="courseware">
            <i class="el-icon-menu"></i>
            <span slot="title">课件</span>
        </el-menu-item>
        <el-menu-item index="quize">
            <i class="el-icon-document"></i>
            <span slot="title">测验与作业</span>
        </el-menu-item>
        <el-menu-item index="discussion">
            <i class="el-icon-setting"></i>
            <span slot="title">讨论区</span>
        </el-menu-item>
        <el-menu-item index="">
            <i class="el-icon-setting"></i>
            <span slot="title">评价课程</span>
        </el-menu-item>
        <el-menu-item index="">
            <i class="el-icon-setting"></i>
            <span slot="title">申请证书</span>
        </el-menu-item>

    </el-menu>
</template>

<script>
    import router from '../../../router'
    export default {
        name: "course-side-bar",
        data(){
            return{
                activeBar: 'notice',
                mediaIP: this.$store.state.mediaIP,
            }
        },
        props:{
            course: {},
        },
        created(){
            this.activeBar = this.$route.matched[1].name;
        },
        methods:{
            handleSelect(index){
                switch (index){
                    case 'courseware':
                        router.push({path: `/course/${this.course.id}/learn/courseware`});
                        break;
                    case 'notice':
                        router.push({path: `/course/${this.course.id}/learn`});
                        break;
                }
                router.push({name: ''});
            }
        }
    }
</script>

<style scoped>
    .course-menu{
        text-align: left;
        margin: 0 5px;
    }
    .course-img{
        width: 100%;
    }
</style>