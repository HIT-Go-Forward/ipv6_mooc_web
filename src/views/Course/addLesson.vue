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
            <el-form :model="form" :rules="rules" label-width="125px" class="add-class-form" ref="form">
                <el-form-item label="课所属章节：">
                    <el-col :span="8">
                        <el-select v-model="form.chapter" placeholder="选择所属章节">
                            <el-option v-for="(item,index) in chapters" :key="index" :label="'第'+(index+1)+'章：'+item.title" :value="index"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4" v-if="addChapterFlag===0">
                        <a href="javascript:void(0)" @click="addChapterFlag=1" >添加章节</a>
                    </el-col>
                    <el-col :span="12" class="addChapter" v-if="addChapterFlag===1">
                        <el-input type="input" v-model="addChapterTitle" placeholder="请输入章节名">
                            <a slot="suffix" class="el-input__icon el-icon-check" href="javascript:void(0)" @click="addChapter"></a>
                            <a slot="suffix" class="el-input__icon el-icon-close" href="javascript:void(0)" @click="closeAddChapter"></a>
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="课题目：">
                    <el-col :span="18">
                        <el-input v-model="form.title"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="课信息：">
                    <el-col :span="18">
                        <el-input v-model="form.intro" type="textarea" placeholder="这里填写课程信息，将显示给学生"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="课信息：">
                    <el-col :span="18">
                        <el-input v-model="form.note" type="textarea" placeholder="这里填写向管理员提交的信息，不会显示给学生"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitLesson">点击提交课信息</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="vedio-upload" v-if="part===1">
            <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
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
                chapters: '',
                addChapterFlag: 0,
                addChapterTitle: '',
                form:{
                    chapter:'',
                    title:'',
                    intro:'',
                    note:''
                },
                lessonId:'',
                rules:{
                    chapter:[
                        {required:true,message:"请选择章节",trigger:'blur'},
                    ],
                    title:[
                        {required:true,message:"请填写课题目",trigger:'blur'},
                        {min:2,max:50,message:"题目长度在2-50之间",trigger:"blur"}
                    ],
                }
            }
        },
        created:function() {
            this.getCourseOutline()
        },
        methods:{
            getCourseOutline(){
                let newChapters = []
                this.courseId = this.$route.params.courseId
                axios.get(this.$store.state.actionIP+"/course/getCourseOutline.action",{
                    params: {
                        courseId:this.courseId
                    }
                }).then((res)=>{
                    console.log(res)
                    for (let i = 0;i<res.data.data.length;i++){
                        if(!newChapters[res.data.data[i].chapterNum-1])
                            newChapters[res.data.data[i].chapterNum-1] = {
                                title:res.data.data[i].chapterTitle,
                                sections:[]
                            }
                        newChapters[res.data.data[i].chapterNum-1].sections.splice(res.data.data.sectionNum-1,0,{
                            title:res.data.data[i].sectionTitle,
                            id:res.data.data[i].id
                        })
                    }
                    this.chapters = newChapters.slice(0,newChapters.length)
                    console.log(this.chapters)
                }).catch((err)=>{
                    this.$message.error("联网错误！")
                    console.log(err)
                })
            },
            addChapter(){
                if(this.addChapterTitle) {
                    let newChapter = {
                        title: this.addChapterTitle,
                        sections: []
                    }
                    this.chapters.push(newChapter)
                    this.addChapterFlag = 0
                    console.log(this.chapters)
                    this.$message.success("添加成功！")
                } else {
                    this.$message.error("必须输入章节名！")
                }
            },
            closeAddChapter(){
                this.addChapterFlag = 0
                this.addChapterTitle= ''
            },
            submitLesson(){
                console.log(1)
                this.$refs['form'].validate((valid)=>{
                    if(valid){
                        let chapterNum = this.form.chapter+1
                        let chapterTitle = this.chapters[this.form.chapter].title
                        let num = this.chapters[this.form.chapter].sections.length+1
                        axios.get(this.$store.state.actionIP+"/course/addNewLesson.action",{
                            params:{
                                num:num,
                                title:this.form.title,
                                chapterNum:chapterNum,
                                courseId:this.courseId,
                                intro:this.form.intro,
                                chapterTitle:chapterTitle,
                                note:this.form.note
                            }
                        }).then((res)=>{
                            console.log(res)
                            if(res.data.data.status===200){
                                this.lessonId = res.data.lessonId
                                this.part = 2
                            } else {
                                this.$message.error(res.data.data)
                            }
                        }).catch((err)=>{
                            console.log(err)
                            this.$message.error("网络错误")
                        })
                    } else {
                        console.log("error")
                        return false;
                    }
                })
            }
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
    .add-class-form{
        background-color: whitesmoke;
        margin: 2em 1em 2em 1em;
        padding: 1em 0 1em 0;
        border: 1px lightgrey solid;
        border-radius: 5px;
        box-shadow: lightgrey 3px 3px;
    }
</style>