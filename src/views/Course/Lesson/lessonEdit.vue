<template>
    <div class="lesson-upload-card">
        <div class="lesson-upload">
            <el-form :model="lesson" label-width="125px" class="add-class-form" ref="form">
                <div class="lesson-edit-header">
                    <h1 class="lesson-title">第{{lesson.chapterNum}}章 第{{lesson.num}}节：{{ lesson.title }}</h1>
                    <h4 class="create-date">创建时间：{{lesson.createDate}}</h4>
                    <h4 class="update-date">最近一次修改时间：{{lesson.updateDate}}</h4>
                    <h4 v-if="lesson.state===2" class="passed">已通过</h4>
                    <h4 v-if="lesson.state===3" class="nopassed">未通过</h4>
                </div>
                <el-form-item label="课所属章节：">
                    <el-col :span="8">
                        <el-select v-model="chapterNum">
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
                        <el-input v-model="lesson.title"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="课信息：">
                    <el-col :span="18">
                        <el-input v-model="lesson.intro" type="textarea" placeholder="这里填写课程信息，将显示给学生"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="课信息：">
                    <el-col :span="18">
                        <el-input v-model="lesson.note" type="textarea" placeholder="这里填写向管理员提交的信息，不会显示给学生"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="课程视频：">
                    <el-upload
                            :action="'/upload/resource/uploadResource.action'"
                            ref="lessonVideoUpload"
                            class="file-upload"
                            :data="{
                                'courseId':this.courseId,
                                'type':'lessonVideo',
                                'lessonId':this.lessonId
                            }"
                            :on-success="uploadVideoResponse"
                            :on-error="uploadVideoError"
                            :before-upload="uploadVideo"
                            name="file"
                            :auto-upload="false"
                            drag
                            :limit="1"
                            :with-credentials="true"
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将课程视频拖到此处，或<em>点击添加文件</em></div>
                    </el-upload>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitVideoUpload">上传到服务器</el-button>
                </el-form-item>
                <el-form-item label="课程辅助文件：">
                    <el-upload
                            :action="'/upload/resource/uploadResource.action'"
                            ref="lessonFileUpload"
                            class="file-upload"
                            :data="{
                                'courseId':this.courseId,
                                'type':'lessonFile',
                                'lessonId':this.lessonId
                            }"
                            :on-success="uploadFileResponse"
                            :on-error="uploadFileError"
                            :before-upload="uploadFile"
                            name="file"
                            :auto-upload="false"
                            drag
                            :limit="1"
                            :with-credentials="true"
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击添加文件</em></div>
                        <div class="el-upload__tip" slot="tip">请将所需文件打包后上传，不得超过100Mb</div>
                    </el-upload>
                    <div><span class="el-tag--danger">*这里上传将覆盖之前上传的文件，若没有问题不需要上传</span></div>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitFileUpload">上传到服务器</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="fileUploadState===2||videoUploadState===2" type="primary" disabled="disabled">正在上传</el-button>
                    <el-button v-if="fileUploadState===0||fileUploadState===3||videoUploadState===3||videoUploadState===0" type="primary" @click="submitLesson">提交课程信息</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import router from '../../../router'
    import axios from 'axios'
    export default {
        name: "addLesson",
        data(){
            return {
                chapters: '',
                addChapterFlag: 0,
                addChapterTitle: '',
                chapterNum:0,
                lessonId:'',
                lesson:{},

                fileUploadState:0,
                videoUploadState:0,
            }
        },
        created:function() {
            this.lessonId = this.$route.params.lessonId
            this.getCourseOutline()
            this.getLessonDetail();
        },
        methods:{
            getCourseOutline(){
                let newChapters = []
                this.courseId = this.$route.params.courseId
                axios.get('/action/course/getCourseOutline.action',{
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
            getLessonDetail(){
                axios.get('/action/course/getLessonById.action',{
                    params:{
                        lessonId:this.lessonId
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.status===200){
                        this.lesson = res.data.data;
                        this.chapterNum = this.lesson.chapterNum-1
                    } else {
                        this.lesson = {};
                    }
                }).catch((err)=>{
                    console.log(err)
                    this.$message.error("联网错误！")
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
            uploadVideo(file){
                this.videoUploadState = 1
                const isLt1024M = file.size / 1024 / 1024 /1024 < 2;

                if (!isLt1024M) {
                    this.$message.error('文件过大！');
                    return false
                }
            },
            submitVideoUpload(){
                this.videoUploadState = 2
                this.$refs.lessonVideoUpload.submit();
            },
            submitFileUpload(){
                this.fileUploadState = 2
                this.$refs.lessonFileUpload.submit();
            },
            uploadFileResponse(res){
                this.fileUploadState = 3
                console.log(res)
                this.$message.success(res)
            },
            uploadFileError(err){
                this.fileUploadState = 0
                console.log(err)
                this.$message.error(err)
            },
            uploadVideoResponse(res){
                this.videoUploadState = 3
                console.log(res)
                this.$message.success(res)
            },
            uploadVideoError(err){
                this.videoUploadState = 0
                console.log(err)
                this.$message.error(err)
            },
            uploadFile(file){
                this.fileUploadState = 1
                const isLt2M = file.size / 1024 / 1024 /100 < 2;

                if (!isLt2M) {
                    this.$message.error('文件过大！');
                    return false
                }
            },
            submitLesson(){
                let chapterNum = this.chapterNum+1
                let chapterTitle = this.chapters[chapterNum].title
                let num = this.chapters[chapterNum].sections.length+1
                axios.get('/action/course/updateLesson.action',{
                    params:{
                        lessonId:this.lessonId,
                        num:num,
                        title:this.lesson.title,
                        chapterNum:chapterNum,
                        courseId:this.courseId,
                        intro:this.lesson.intro,
                        chapterTitle:chapterTitle,
                        note:this.lesson.note
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.status===200){
                        this.lessonId = res.data.data
                        this.$message.success("课修改完成，请等待审核")
                        router.push('/course/'+this.courseId+'/courseEdit')
                    } else {
                        this.$message.error(res.data.data)
                    }
                }).catch((err)=>{
                    console.log(err)
                    this.$message.error("网络错误")

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
    .lesson-edit-header h4{
        margin: 0 0 5px 0;
    }
    .passed{
        color: green;
        font-weight: bold;
    }
    .nopassed{
        color:red;
        font-weight: bold;
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
    .lesson-verify{
        background-color: whitesmoke;
        border: 1px lightgrey solid;
        border-radius: 5px;
        box-shadow: lightgrey 3px 3px;
    }
    .verify{
        margin:25px 10% 25px 10%;
        width: 80%;
    }
    .verify-title{
        float: left;
        font-weight: bold;
    }
    .verify-content{
        margin-left: 50px;
    }
    .video-title{
        text-align: center;
    }
</style>