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
                <el-form-item label="课提交信息：">
                    <el-col :span="18">
                        <el-input v-model="lesson.note" type="textarea" placeholder="这里填写向管理员提交的信息，不会显示给学生"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="课程视频：">
                    <div class="d-player" id="dplayer" ref="player"></div>
                    <div class="video-detail">
                        <h3>已上传视频文件信息</h3>
                        <strong>视频文件名：</strong><span>{{ videoName }}</span><br/>
                        <strong>视频大小：</strong><span>{{ videoSize }}</span><br/>
                        <strong>视频时长：</strong><span>{{ videoLength }}</span>
                    </div>
                    <div class="upload-box">
                        <div class="file-box">
                            <input type="file" id="video" name="video" class="file-input" accept="video/mp4" @change="videoUpload($event)"/>
                            <label for="video" class="file-input-label">
                                <i class="el-icon-upload"></i>点击上传视频文件<br/>
                            </label>
                            <label for="video" class="file-input-label-tip">
                                *仅限mp4文件，文件大小不超过1024M，上传将覆盖之前的文件
                            </label>
                        </div>
                        <div class="file-info">
                            <div class="file-name">
                                {{ video.name }}
                            </div>
                            <div class="file-size">
                                {{ video.size }}
                            </div>
                            <div class="progress-div" v-if="video.uploadStatus===1||video.uploadStatus===2">
                                <el-progress :percentage="video.progress"></el-progress>
                                <span v-if="video.progress>=100">正在向服务器提交，请稍候...</span>
                            </div>
                            <div class="status">
                                <span class="wait" v-if="video.uploadStatus===0">等待上传</span>
                                <span class="uploading" v-if="video.uploadStatus===1">上传中</span>
                                <span class="success" v-if="video.uploadStatus===2">上传完成</span>
                                <span class="error" v-if="video.uploadStatus===-1">服务求错误</span>
                                <span class="error" v-if="video.uploadStatus===-2">上传类型不符合要求</span>
                                <span class="error" v-if="video.uploadStatus===-3">文件超出限制</span>
                            </div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="课程辅助文件：">
                    <div class="video-detail">
                        <h3>已上传辅助文件信息</h3>
                        <strong>文件名：</strong><span>{{ fileName }}</span><br/>
                        <strong>文件大小：</strong><span>{{ fileSize }}</span><br/>
                    </div>
                    <div class="upload-box">
                        <div class="file-box">
                            <input type="file" id="pack" name="pack" class="file-input" @change="packUpload($event)"/>
                            <label for="pack" class="file-input-label">
                                <i class="el-icon-upload"></i>点击上传课程辅助文件<br/>
                            </label>
                            <label for="pack" class="file-input-label-tip">
                                *文件类型不限，如有多个文件请打包，文件大小不超过100M，上传将覆盖之前的文件
                            </label>
                        </div>
                        <div class="file-info">
                            <div class="file-name">
                                {{ assistFile.name }}
                            </div>
                            <div class="file-size">
                                {{ assistFile.size }}
                            </div>
                            <div class="progress-div" v-if="assistFile.uploadStatus===1||assistFile.uploadStatus===2">
                                <el-progress :percentage="assistFile.progress"></el-progress>
                                <span v-if="assistFile.progress>=100">正在向服务器提交，请稍候...</span>
                            </div>
                            <div class="status">
                                <span class="wait" v-if="assistFile.uploadStatus===0">等待上传</span>
                                <span class="uploading" v-if="assistFile.uploadStatus===1">上传中</span>
                                <span class="success" v-if="assistFile.uploadStatus===2">上传完成</span>
                                <span class="error" v-if="assistFile.uploadStatus===-1">服务求错误</span>
                                <span class="error" v-if="assistFile.uploadStatus===-2">上传类型不符合要求</span>
                                <span class="error" v-if="assistFile.uploadStatus===-3">文件超出限制</span>
                            </div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="video.uploadStatus===1||assistFile.uploadStatus===1" type="primary" disabled="disabled">正在上传</el-button>
                    <el-button v-if="video.uploadStatus!==1&&assistFile.uploadStatus!==1" type="primary" @click="submitLesson">提交课程信息</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import router from '../../../router'
    import axios from '../../../axiosIntercepter'
    import 'dplayer/dist/DPlayer.min.css';
    import DPlayer from 'dplayer';
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
                videoName:'',
                videoSize:'',
                videoLength:'',
                fileName:'',
                fileSize:'',
                videoUrl:'',
                videoDuration:'',

                video:'',
                assistFile:'',
                uploadSuccess:'',

                stopRefresh:false,
            }
        },
        created:function() {
            this.lessonId = this.$route.params.lessonId
            this.getCourseOutline()
            this.getLessonDetail();
        },
        watch:{
            videoUrl: function(to,from){
                if(to&&!this.stopRefresh){
                    this.initPlayer();
                    this.stopRefresh = true;
                }
                console.log(to,from)
            }
        },
        methods:{
            initPlayer(){
                const dplayer = new DPlayer({
                    container: document.getElementById('dplayer'),
                    video:{
                        url: "/media" + this.videoUrl,
                    },
                    screenshot: false,
                    autoplay: false,
                });
                dplayer.on("durationchange",function(){
                    this.videoDuration = parseInt(dplayer.video.duration)
                    console.log(dplayer.video.duration)
                })
                // console.log(this.dqlayer.video)
            },
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
                        this.chapterNum = this.lesson.chapterNum-1;
                        this.videoName = this.lesson.video.url.split('/').pop();
                        this.videoUrl = this.lesson.video.url;
                        this.videoSize = this.lesson.video.size===0?"未知":this.leson.video.size;
                        this.videoLength = this.lesson.video.length?this.lesson.video.length:"未知";
                        this.fileName = this.lesson.file.url.split('/').pop()
                        this.fileSize = this.lesson.file.size===0?"未知":this.leson.file.size;
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
            checkFileSize(fileSize,name){
                let size = name==="video"?1024:100
                let isFileSize = fileSize / 1024 / 1024 /size < 2;

                if (!isFileSize) {
                    this.$message.error('文件过大！');
                    return false
                }
                return true;
            },
            formatFileSize(fileSize,idx){
                var unit = ['B','KB','MB',"GB"];
                idx = idx||0;
                if(fileSize<1024||idx===unit.length-1){
                    return fileSize.toFixed(1)+unit[idx]
                }
                return this.formatFileSize(fileSize/1024,++idx)
            },
            checkFileType(fileType,name){
                let accetpType = 'mp4'
                return (name==='video'&&fileType===accetpType)||name==='assistFile'
            },
            videoUpload(e){
                let file = e.target.files[0]
                this.video = {
                    name:file.name,
                    progress:1,
                    size: this.formatFileSize(file.size, 0),
                    uploadStatus:0,
                }
                let params = new FormData();
                params.append("courseId",this.courseId)
                params.append("type","lessonVideo")
                params.append("lessonId",this.lessonId)
                params.append("file",file)
                console.log(file)
                if(!this.checkFileSize(file.size,'video')){
                    this.video.uploadStatus = -3
                    return false;
                }
                if(!this.checkFileType(file.name.split('.')[-1],'video')){
                    this.video.uploadStatus = -2;
                    return false;
                }
                let config = {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    },
                    onUploadProgress:e=>{
                        var completeProgress = ((e.loaded/e.total*100)|0);
                        this.video.progress = completeProgress;
                    }
                }
                this.video.uploadStatus = 1;
                axios.post('/upload/resource/uploadResource.action',params,config).then((res)=>{
                    console.log(res);
                    if(res.data.status===200){
                        this.video.uploadStatus = 2;  
                    } else {
                        this.video.uploadStatus = -1;
                    }
                }).catch((err)=>{
                    this.video.uploadStatus = -1;
                    console.log(err)
                })
            },
            packUpload(e){
                let file = e.target.files[0]
                this.assistFile = {
                    name:file.name,
                    progress:1,
                    size: this.formatFileSize(file.size, 0),
                    uploadStatus:0,
                }
                let params = new FormData();
                params.append("courseId",this.courseId)
                params.append("type","lessonFile")
                params.append("lessonId",this.lessonId)
                params.append("file",file)
                console.log(file)
                if(!this.checkFileSize(file.size,'assistFile')){
                    this.assistFile.uploadStatus = -3
                    return false;
                }
                if(!this.checkFileType(file.name.split('.')[-1],'assistFile')){
                    this.assistFile.uploadStatus = -2;
                    return false;
                }
                let config = {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    },
                    onUploadProgress:e=>{
                        var completeProgress = ((e.loaded/e.total*100)|0);
                        this.assistFile.progress = completeProgress;
                    }
                }
                this.assistFile.uploadStatus = 1;
                axios.post('/upload/resource/uploadResource.action',params,config).then((res)=>{
                    console.log(res);
                    if(res.data.status===200){
                        this.assistFile.uploadStatus = 2;  
                    } else {
                        this.assistFile.uploadStatus = -1;
                    }
                }).catch((err)=>{
                    this.assistFile.uploadStatus = -1;
                    console.log(err)
                })
            },
            submitLesson(){
                let chapterNum = this.chapterNum+1
                let chapterTitle = this.chapters[chapterNum].title
                let num = this.lesson.num
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
    .video-detail>h3{
        margin:0;
    }
    .file-input{
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }
    .file-input-label{
        font-size: 1.5rem;
        cursor: pointer;
    }
    .file-input-label-tip{
        font-size:0.5rem;
        color: orange;
    }
    .file-box{
        padding: 2rem;
    }
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
    .status{
        font-size: 1rem;
    }
    .wait{
        color: gray;
    }
    .uploading{
        color: blue;
    }
    .success{
        color: green;
    }
    .error{
        color: red;
    }
</style>