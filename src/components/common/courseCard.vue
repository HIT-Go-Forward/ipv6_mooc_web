<template>
    <el-col :span="12">
        <el-card class="courseCard" :body-style="{ padding: '0px'}" shadow="hover" @click.native="viewCourse">
            <el-row class="course">
                <el-col :span="12" class="image">
                    <img src="../../assets/image/avatar.jpg" alt="">
                </el-col>
                <el-col :span="12" class="course-info">
                    <div class="course-name">
                        <span>数据库系统分析与设计balabalabala</span>
                    </div>
                    <div class="course-teacher">
                        <span><i class="el-icon-location"></i> {{course}}</span>
                        <span><i class="el-icon-view"></i> 19453人</span>
                    </div>
                    <div class="course-intro">
                        <span>mysql数据库是世界上最好的数据库.数据库(Database)是按照数据结构来组织、存储和管理数据的仓库</span>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </el-col>
</template>

<script>
    export default {
        name: "course-card",
        data(){
            return{
            }
        },
        props:{
            course: String
        },
        methods:{
            viewCourse(){
                alert(this.course)
            }
        }
    }
</script>

<style scoped>
    img{
        margin: 5px;
        width: 100%;
    }
    .image{
        display: inline-block;
        width: 150px;
        vertical-align: top;
    }
    .course-info{
        display: inline-block;
        text-align: left;
        margin-left: 25px;
    }
    .courseCard{
        margin: 10px;
    }
    .course{
        min-width: 400px;
    }
    .course-teacher{
        margin-top: 25px;
        font-size: 80%;
    }
    .course-teacher :nth-child(2){
        float: right;
    }
    .course-intro{
        margin-top: 15px;
        font-size: 80%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .course-name{
        margin-top: 20px;
        font-weight: bolder;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>