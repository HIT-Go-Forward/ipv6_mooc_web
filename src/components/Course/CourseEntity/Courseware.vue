<template>
    <div class="courseware">
        <div class="menu-title">
            <span><i class="el-icon-setting"></i>  课件</span>
        </div>
        <el-collapse @change="handleChange">
            <el-collapse-item name="video" class="collapse-item">
                <template slot="title">课程视频</template>
                <div v-for="lesson in lessonList" :key="lesson.id">
                    <div class="lesson-item">
                        <el-row>
                            <el-col :span="1">
                                <i class="el-icon-success"></i>
                            </el-col>
                            <el-col :span="20">
                                {{lesson.title}}
                            </el-col>
                            <el-col :span="3">
                                <i class="el-icon-tickets lesson-icon"></i>
                                <i class="el-icon-download lesson-icon"></i>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item  name="video1" class="collapse-item">
                <template slot="title">简介视频</template>
                <div class="lesson-item" v-for="lesson in lessonList">{{lesson.title}}</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    export default {
        name: "courseware",
        props:{
            course: {},
        },
        data(){
            return{
                lessonList: [{title:'沟通心理学的价值'},{title:'沟通交流中常见的行为与心理'}],
            }
        },
        methods:{
            handleChange(){
                console.log();
            }
        }
    }
</script>

<style scoped>
    .courseware{
        margin: 10px 20px;
    }
    .menu-title{
        font-size: 120%;
        text-align: left;
        margin: 20px 0;
    }
    .lesson-item{
        text-align: left;
        margin: 0 10px;
        padding: 10px;
        cursor: pointer;
        border-top: 1px dashed #ddd;
    }
    .lesson-item:hover{
        background-color: #eee;
    }
    .collapse-item{
        margin: 10px;
    }
    .lesson-icon{
        width: 30px;
    }
</style>