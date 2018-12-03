<template>
    <div class="lesson-upload-card">
        <div class="header">
            <el-steps :active="part" align-center finish-status="success">
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
            <el-form label-width="125px" class="add-class-form">
                <el-form-item label="课程视频：">
                    <el-upload
                            :action="this.$store.state.actionIP+'/resource/upload.action'"
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
                            :action="this.$store.state.actionIP+'/resource/upload.action'"
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
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitFileUpload">上传到服务器</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="fileUploadState===2||videoUploadState===2" type="primary" disabled="disabled">正在上传</el-button>
                    <el-button v-if="(fileUploadState===0||fileUploadState===3)&&videoUploadState===3" type="primary" @click="part=2">点击进入下一步</el-button>
                    <p v-else>数据上传未完成或未上传视频文件！</p>
                </el-form-item>
            </el-form>
        </div>
        <div class="lesson-msg-verify" v-if="part===2">
            <div class="lesson-verify">
                <div class="verify">
                    <span class="verify-title">课程题目：</span>
                    <span class="verify-content">{{lesson.title}}</span>
                </div>
                <div class="verify">
                    <span class="verify-title">课程信息：</span>
                    <span class="verify-content">{{lesson.intro}}</span>
                </div>
                <div class="verify">
                    <span class="verify-title">课程状态：</span>
                    <span class="verify-content">未审核</span>
                </div>
                <div class="verify">
                    <span class="verify-title">课程创建时间：</span>
                    <span class="verify-content">{{lesson.createDate}}</span>
                </div>
            <div class="video-title">
                <div>课程视频</div>
                <video width="80%" :src="this.$store.state.mediaIP+this.lesson.videoUrl" controls></video>
            </div>
            <div class="video-title" v-if="this.lesson.fileUrl">
                <div>课程配套文件</div>
                <a :href="this.$store.state.mediaIP+this.lesson.fileUrl" :download="this.lesson.originalFileName">点击下载</a>
            </div>
            <div class="verify verify-all">
                <el-button type="primary" class="verify-submit" @click="confirmLesson">确认</el-button>
                <el-button type="primary" class="verify-submit" @click="reEdit">修改</el-button>
            </div>
        </div>
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
                lesson:'',

                fileUploadState:0,
                videoUploadState:0,

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
        watch:{
            part:function(part1,part2){
                if(part2===2){
                    this.getLessonDetail();
                }
            }
        },
        created:function() {
            this.getCourseOutline()
            this.getLessonDetail();
        },
        methods:{
            confirmLesson(){
                this.part=3
                this.$message.success("课已确认!")
                setTimeout(()=>{
                    router.push("/course/"+this.courseId+"/courseEdit");
                },2000)
            },
            reEdit(){
                router.push("/course/"+this.lessonId+"/lessonEdit")
            },
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
            getLessonDetail(){
                axios.get(this.$store.state.actionIP+"/course/getLessonById.action",{
                    params:{
                        lessonId:this.lessonId
                    }
                }).then((res)=>{
                    console.log(res)
                    this.lesson = res.data.data
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
                            if(res.data.status===200){
                                this.lessonId = res.data.data
                                this.$message.success("课创建成功！进入下一步上传视频及其他文件。")
                                this.part = 1
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