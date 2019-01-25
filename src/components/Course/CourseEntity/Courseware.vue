<template>
    <div class="courseware">
        <div class="menu-title">
            <div v-if="user.type===2 || user.type===1" class="course-auditing">
                <span><i class="el-icon-edit-outline"></i> 一键审核: </span>
                <el-button-group>
                    <el-button size="small" type="success" plain @click="auditingPass">通过</el-button>
                    <el-button size="small" type="danger" plain @click="auditingFail">回绝</el-button>
                </el-button-group>
            </div>
            <span class="course-title"><i class="el-icon-setting"></i>  课件 </span>
            <div v-if="course.teacher!==undefined">
                <div v-if="course.teacher.id === user.id" class="course-state">
                    <el-tag size="mini" v-if="course.state===1">草稿</el-tag>
                    <el-tag size="mini" type="info" v-else-if="course.state===2">待审核</el-tag>
                    <el-tag size="mini" type="danger" v-else-if="course.state===3">审核未通过</el-tag>
                    <el-tag size="mini" type="success" v-else-if="course.state===4">审核已通过</el-tag>
                </div>
            </div>
        </div>
        <el-collapse @change="handleChange" class="collapse-items">
            <el-collapse-item :key="chapter.chapterNum" :name="chapter.chapterNum" class="collapse-item" v-for="chapter in chapterList">
                <template slot="title">第{{chapter.chapterNum}}章 {{chapter.chapterTitle}}</template>
                <div v-if="course.teacher!==undefined">
                    <div v-if="user.type===4">
                        <div v-for="lesson in lessonList" :key="lesson.id" v-if="lesson.chapterNum === chapter.chapterNum && lesson.state === 2">
                            <div class="lesson-item">
                                <el-row>
                                    <el-col :span="1">
                                        <i class="el-icon-success"></i>
                                    </el-col>
                                    <el-col :span="20" class="lesson-title" @click.native="enterLesson(lesson.id)">
                                        第{{lesson.sectionNum}}节 {{lesson.sectionTitle}}
                                    </el-col>
                                    <el-col :span="3">
                                        <i class="el-icon-tickets lesson-icon"></i>
                                        <i class="el-icon-download lesson-icon"></i>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="user.type===2 || (user.type===3 && course.teacher.id === user.id) || user.type===1">
                        <div v-for="lesson in lessonList" :key="lesson.id" v-if="lesson.chapterNum === chapter.chapterNum">
                            <div class="lesson-item">
                                <el-row>
                                    <el-col :span="1">
                                        <i class="el-icon-success"></i>
                                    </el-col>
                                    <el-col :span="20" class="lesson-title" @click.native="enterLesson(lesson.id)">
                                        <el-badge value="未审核" v-if="lesson.state === 1">
                                            第{{lesson.sectionNum}}节 {{lesson.sectionTitle}}
                                        </el-badge>
                                        <el-badge value="未通过" v-else-if="lesson.state === 3">
                                            第{{lesson.sectionNum}}节 {{lesson.sectionTitle}}
                                        </el-badge>
                                        <div v-else-if="lesson.state === 2">
                                            第{{lesson.sectionNum}}节 {{lesson.sectionTitle}}
                                        </div>
                                        <el-button-group class="course-auditing" v-if="(user.type===2 || user.type===1) && lesson.state === 1">
                                            <el-button size="mini" type="success" plain @click="singleAuditingPass(lesson.id)">通过</el-button>
                                            <el-button size="mini" type="danger" plain @click="singleAuditingFail(lesson.id)">回绝</el-button>
                                        </el-button-group>
                                    </el-col>
                                    <el-col :span="3">
                                        <i class="el-icon-tickets lesson-icon"></i>
                                        <i class="el-icon-download lesson-icon"></i>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    import axios from 'axios'
    import router from '../../../router'
    export default {
        name: "courseware",
        props:{
            course: Object,
            chapterList: Array,
            lessonList: Array,
        },
        data(){
            return{
                user: this.$store.getters.getStorge.user,
            }
        },
        created(){
        },
        methods:{
            enterLesson(lessonId){
                router.push({path: `/lesson/${lessonId}`});
            },
            auditing(operation, todoList){
                if(todoList.length===0){
                    this.$message.info("没有需要审核的课程");
                }else{
                    axios.get('/action/course/handleLessonApplies.action', {
                        params:{
                            lessonIds: todoList,
                            operation: operation,
                        }
                    }).then((res)=>{
                        if(res.data.status===200){
                            this.$message.success("审核成功")
                            this.$emit('getCourseInfo');
                        } else {
                            this.$message.error(res.data.data);
                        }
                    }).catch((err)=>{
                        this.$message.error("审核失败，请稍后再试！");
                        console.log(err)
                    })
                }
            },
            auditingPass(){
                let todoList = [];
                for (let index in this.lessonList) {
                    if(this.lessonList[index].state === 1){
                        todoList.push(this.lessonList[index].id);
                    }
                }
                this.auditing("accept", todoList);
            },
            auditingFail(){
                let todoList = [];
                for (let index in this.lessonList) {
                    if(this.lessonList[index].state === 1){
                        todoList.push(this.lessonList[index].id);
                    }
                }
                this.auditing("reject", todoList);
            },
            singleAuditingPass(id){
                this.auditing('accept', [id]);
                event.stopPropagation();
            },
            singleAuditingFail(id){
                this.auditing('reject', [id]);
                event.stopPropagation();
            },
            handleChange(){
                console.log();
            },
        }
    }
</script>

<style scoped>
    .course-state{
        font-size: 85%;
        display: inline;
    }
    .course-auditing{
        margin-right: 15px;
        float: right;
    }
    .course-title{
        font-size: 120%;
    }
    .lesson-title{
        cursor: pointer;
    }
    .courseware{
        margin-left: 20px;
        background-color: #eee;
        padding: 20px;
        border-radius: 0 0 20px 20px;
        box-shadow: 0 0 10px #B09999;
    }
    .collapse-items{
        margin-top: 10px;
    }

    .menu-title{
        text-align: left;
    }
    .lesson-item{
        text-align: left;
        margin: 0 10px;
        padding: 10px;
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