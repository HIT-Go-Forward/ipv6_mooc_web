<template>
    <div class="course-info">
        <div v-if="course.intro" class="info-item">
            <div class="info-title"><i class="el-icon-setting"></i>课程概述</div>
            <div class="info-main">{{course.intro}}</div>
        </div>
        <div v-if="course.needs" class="info-item">
            <div class="info-title"><i class="el-icon-setting"></i>课程要求</div>
            <div class="info-main">{{course.needs}}</div>
        </div>
        <div v-if="course.books" class="info-item">
            <div class="info-title"><i class="el-icon-setting"></i>参考资料</div>
            <div class="info-main">{{course.books}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "course-info",
        props:{
            course: null,
        }
    }
</script>

<style scoped>
    .course-info{
        text-align: left;
    }
    .info-item{
        margin: 20px 0;
    }
    .info-title{
        margin: 15px 0;
        font-size: 120%;
        font-weight: bold;
    }
    .info-main{
        font-size: 95%;
    }
</style>