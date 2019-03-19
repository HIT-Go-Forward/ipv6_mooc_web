<template>
    <div class="course-info">
        <div v-if="course.intro" class="info-item">
            <div class="info-title"><i class="el-icon-setting"></i>课程概述</div>
            <div class="info-main">
                <mavon-editor :toolbarsFlag="false" :value="course.intro" :subfield="false" :defaultOpen="'preview'"></mavon-editor>
            </div>
        </div>
        <div v-if="course.needs" class="info-item">
            <div class="info-title"><i class="el-icon-setting"></i>课程要求</div>
                <mavon-editor class="info-main" :toolbarsFlag="false" :value="course.needs" :subfield="false" :defaultOpen="'preview'"></mavon-editor>
        </div>
        <div v-if="course.books" class="info-item">
            <div class="info-title"><i class="el-icon-setting"></i>参考资料</div>
                <mavon-editor class="info-main" :toolbarsFlag="false" :value="course.books" :subfield="false" :defaultOpen="'preview'"></mavon-editor>
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