<template>
    <div class="lesson-upload-card">
        <div class="header">
            <el-steps :active="part" align-center>
                <el-step title="步骤1" description="填写并保存基本的课信息"></el-step>
                <el-step title="步骤2" description="上传文件"></el-step>
                <el-step title="步骤3" description="确认提交"></el-step>
            </el-steps>
        </div>
        <div class="lesson-upload" v-if="part===0">
            <div>
                <el-select v-model="form.chapter" placeholder="选择所属章节">
                    <el-option v-for="(item,index) in chapters" :key="index" :label="'第'+(index+1)+'章：'+item.title" :value="index"></el-option>
                </el-select>
                <a href="javascript:void(0)" @click="addChapter=1" v-if="addChapter===0">添加章节</a>
            </div>
            <div class="addChapter" v-if="addChapter===1">
                <el-input type="input" v-model="addChapterTitle" placeholder="请输入章节名"/>
                <a href="javascript:void(0)" class="el-icon-check" @click="addChapter=0"></a>
                <a href="javascript:void(0)" class="el-icon-close" @click="addChapter=0"></a>
            </div>
        </div>
        <div class="vedio-upload" v-if="part===1">

        </div>
        <div class="lesson-msg-verify" v-if="part===2">

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "addLesson",
        data(){
            return {
                part: 0,
                chapters: [],
                addChapter: 0,
                addChapterTitle: '',
                form:{
                    chapter:''
                }
            }
        },
        created:function() {
            this.getCourseOutline()
        },
        methods:{
            getCourseOutline(){
                this.courseId = this.$route.params.courseId
                axios.get(this.$store.state.actionIP+"/course/getCourseOutline.action",{
                    params: {
                        courseId:this.courseId
                    }
                }).then((res)=>{
                    console.log(res)
                    for (let i = 0;i<res.data.data.length;i++){
                        if(!this.chapters[res.data.data[i].chapterNum-1])
                            this.chapters[res.data.data[i].chapterNum-1] = {
                                title:res.data.data[i].chapterTitle,
                                sections:[]
                            }
                        this.chapters[res.data.data[i].chapterNum-1].sections.splice(res.data.data.sectionNum-1,0,{
                            title:res.data.data[i].sectionTitle,
                            id:res.data.data[i].id
                        })
                    }
                    console.log(this.chapters)
                }).catch((err)=>{
                    this.$message.error("联网错误！")
                    console.log(err)
                })
            },
        }
    }
</script>

<style scoped>
    a{
        text-decoration: none;
        color: #000;
    }

    .lesson-upload-card{
        width: 66%;
        margin: 0 auto;
        padding-top: 50px;
    }
</style>