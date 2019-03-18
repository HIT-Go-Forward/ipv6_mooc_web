<template>
    <el-row class="release-course-part">
        <el-col :span="7" class="left-courses">
            <div class="left-title">课列表</div>
            <el-tree v-if="this.chapters"
                     :data="this.chapters"
                >
                <div class="custom-tree-node" slot-scope="{node,data}">
                    <span class="lesson-title" v-if="data.state" @click="gotoLesson(data.id)">{{ "第"+data.num+"节："+data.title }}</span>
                    <span class="lesson-edit" v-if="data.state===3||data.state===2" @click="editLesson(data.id)">&nbsp;编辑</span>
                    <span class="lesson-state waiting" v-if="data.state===1"> 未审核 </span>
                    <span class="lesson-state pass" v-else-if="data.state===2"> 审核通过 </span>
                    <span class="lesson-state rejected" v-else-if="data.state===3"> 审核不通过 </span>
                    <span class="chapter-title" v-if="!data.state">{{  "第"+data.num+"章："+data.title  }}</span>
                </div>

            </el-tree>
            <p v-else>这里空空如也哦</p>
            <div><a href="javascript:void(0)" @click="addLesson" class="add-lesson">增加课程</a></div>
        </el-col>
        <el-col :span="16" :offset="1" class="release-course-container">
            <el-form ref="form" :model="form" label-width="6em">
                <el-form-item label="课程头像：">
                    <el-upload
                            action=""
                            ref="courseImgUpload"
                            class="img-upload"
                            :before-upload="handlePost"
                            drag
                            :limit="1"
                            accept="image/*"
                    >
                        <img :src="imageSrc" class="img">
                        <div class="el-upload__tip" slot="tip">点击图片修改，只能上传jpg/png/gif文件，且不超过2MB</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="课程名称：">
                    <el-input v-model="form.courseName" placeholder="请输入课程名称"></el-input>
                </el-form-item>
                <el-form-item label="课程简介：">
                    <el-input type="textarea" :autosize="{ minRows: 4 }" v-model="form.courseBrief" placeholder="请输入课程简介"></el-input>
                </el-form-item>
                <el-form-item label="课程介绍：">
                    <mavon-editor :toolbars="toolbars" v-model="form.courseIntro" placeholder="请输入课程介绍" class="course-intro"></mavon-editor>
                    <!-- <el-input type="textarea" :autosize="{ minRows: 4 }" v-model="form.courseIntro" placeholder="请输入课程介绍"></el-input> -->
                </el-form-item>
                <el-form-item label="课程要求：">
                    <mavon-editor :toolbars="toolbars" v-model="form.courseNeeds" placeholder="请输入课程要求" class="course-needs"></mavon-editor>
                </el-form-item>
                <el-form-item label="课程书籍">
                    <mavon-editor :toolbars="toolbars" v-model="form.courseBook" placeholder="请输入课程要求书籍" class="course-books"></mavon-editor>
                </el-form-item>
                <el-form-item label="课程标签：">
                    <el-tag
                            :key="tag"
                            v-for="tag in label"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button
                            v-else
                            class="button-new-tag"
                            size="small"
                            @click="showInput">
                        + 标签
                    </el-button>
                </el-form-item>
                <el-form-item label="课程分类：">
                    <template>
                        <el-select @change="changeCourse" placeholder="请选择大类" v-model="courseParentType">
                            <el-option
                                    v-for="item in courseParentTypes"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            >
                            </el-option>
                        </el-select>
                        <el-select
                                v-if="courseSonShow"
                                v-model="courseType"
                                collapse-tags
                                style="margin-left: 20px;"
                                placeholder="请选择具体分类">
                            <el-option
                                    v-for="item in courseSonTypes"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="提交备注：">
                    <el-input v-model="form.note" placeholder="这里可填写备注用于提交给管理员"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="courseReleaseSubmit">提交修改</el-button>
                    <el-button type="success" @click="goToCourse">查看课程</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import axios from '../../axiosIntercepter'
    import router from './../../router'
    export default {
        name: "CourseEdit",
        data(){
            return {
                courseId:'',
                form:{
                    courseName:'',
                    courseIntro:'',
                    note: '',
                    courseBrief:'',
                    courseBook:'',
                    courseNeeds:'',
                    courseTypeId:''
                },
                inputVisible: false,
                label:[],
                inputValue: '',

                imageSrc:'',
                courseTypes:[],
                courseParentTypes: [],
                courseSonTypes: [],
                courseParentType:'',
                courseType: '',
                courseSonShow: false,
                chapters: [],
                toolbars:{
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: false, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: false, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: false, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                }
            }
        },
        created:function(){
            this.getCourseType();
        },
        methods:{
            gotoLesson(lessonId){
                router.push('/lesson/'+lessonId)
            },
            editLesson(lessonId){
                router.push('/course/'+this.courseId+'/'+lessonId+'/lessonEdit')
            },
            addLesson(){
                router.push('/course/'+this.courseId+'/addLesson')
            },
            getCourseLessons(){
                let newChapters = []
                axios.get('/action/course/getCourseOutline.action',{
                    params: {
                        courseId:this.courseId
                    }
                }).then((res)=>{
                    console.log(res)
                    for (let i = 0;i<res.data.data.length;i++){
                        if(!newChapters[res.data.data[i].chapterNum-1])
                            newChapters[res.data.data[i].chapterNum-1] = {
                                num:res.data.data[i].chapterNum,
                                title:res.data.data[i].chapterTitle,
                                children:[]
                            }
                        newChapters[res.data.data[i].chapterNum-1].children.push({
                            num:res.data.data[i].sectionNum,
                            title:res.data.data[i].sectionTitle,
                            id:res.data.data[i].id,
                            state: res.data.data[i].state
                        })
                    }
                    for(let i=0;i< newChapters.length;i++){
                        newChapters[i].children.sort(function(){
                            return function(obj1,obj2){
                                return obj1['num']-obj2['num'];
                            }
                        })
                    }
                    this.chapters = newChapters
                }).catch((err)=>{
                    this.$message.error("联网错误！")
                    console.log(err)
                })
            },
            getCourseDetail(){
                this.courseId = this.$route.params.courseId
                axios.get('/action/course/getCourseById.action',{
                    params: {
                        courseId:this.$route.params.courseId
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.data.name) this.form.courseName = res.data.data.name
                    if(res.data.data.intro) this.form.courseIntro = res.data.data.intro
                    if(res.data.data.needs) this.form.courseNeeds = res.data.data.needs
                    if(res.data.data.books) this.form.courseBook = res.data.data.books
                    if(res.data.data.type){
                        this.form.courseTypeId = res.data.data.type.id
                        let idTmp = parseInt(res.data.data.type.id)
                        let typeTmp;
                        for(let i in this.courseTypes){
                            if(idTmp===this.courseTypes[i].id){
                                typeTmp = this.courseTypes[i];
                            }
                        }
                        console.log(typeTmp)
                        this.courseType = typeTmp.id
                        if(typeTmp.level===1){
                            this.courseParentType = typeTmp.id
                            this.courseSonShow = false
                        } else if(typeTmp.level===2) {
                            this.courseParentType = typeTmp.parent
                            this.courseSonShow = true
                        }
                        this.changeCourse()
                    }
                    if(res.data.data.label) this.label = res.data.data.label.split(";")
                    if(res.data.data.brief) this.form.courseBrief = res.data.data.brief
                    if(res.data.data.note) this.form.note = res.data.data.note
                    if(res.data.data.img) this.imageSrc = '/media'+res.data.data.img
                    this.getCourseLessons();
                }).catch((err)=>{
                    this.$message.error("联网错误！")
                    console.log(err)
                })
            },
            courseReleaseSubmit(){
                if(!this.form.courseName){
                    this.$message.error("请填写课程名称！")
                    return;
                }
                axios.get('/action/course/updateCourse.action',{
                    params: {
                        'courseId' : this.courseId,
                        'courseName': this.form.courseName,
                        'courseIntro': this.form.courseIntro,
                        'brief': this.form.courseBrief,
                        'books': this.form.courseBook,
                        'needs': this.form.courseNeeds,
                        'typeId': this.courseType?this.courseType:this.courseParentType,
                        'note': this.form.note,
                        'label': this.label.join(';')
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.status===200){
                        //router.push('course/courseEdit')
                        this.$message.success("课程修改成功！")
                        this.getCourseDetail()
                    } else {
                        this.$message.error(res.data.data)
                    }
                }).catch((err)=>{
                    this.$message.error("未连接到互联网！")
                    console.log(err)
                })
            },
            handleClose(tag) {
                this.label.splice(this.label.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.label.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            handlePost(file){
                const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/gif');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('图片格式错误！');
                    return false
                }
                if (!isLt2M) {
                    this.$message.error('图片过大！');
                    return false
                }
                let fd = new FormData()
                fd.append('file', file)
                fd.append('courseId',this.courseId)
                fd.append('type','courseImg')
                console.log(file)
                axios({
                    url: '/upload/resource/uploadResource.action',
                    method:'post',
                    data: fd
                }).then((res) => {
                    console.log(res)
                    if(res.data.status===200){
                        this.$message.success("图片上传成功!")
                        this.getCourseDetail()
                        // this.imageSrc = res.data.data+'?t='+Math.floor(Math.random()*50)
                    } else {
                        this.$message.error("图片上传失败！")
                    }
                }).catch((err)=>{
                    this.$message.error("网络连接错误！")
                    console.log(err)
                })
                return false;
            },
            getCourseType(){
                axios.get('/action/course/getAllCourseType.action').then((res)=>{
                    console.log(res)
                    if(res.data.status===200){
                        this.courseTypes=res.data.data
                        for(let i=0;i<res.data.data.length;i++){
                            if (!res.data.data[i].parent){
                                this.courseParentTypes.push(res.data.data[i])
                            }
                        }
                        this.getCourseDetail()
                    } else {
                        this.$message.error(res.data.data)
                    }
                }).catch((err)=>{
                    this.$message.error("网络连接错误！")
                    console.log(err)
                })
            },
            changeCourse(){
                this.courseSonTypes = []
                for(let i=0;i<this.courseTypes.length;i++){
                    if(this.courseTypes[i].parent===this.courseParentType){
                        this.courseSonTypes.push(this.courseTypes[i])
                    }
                }
                this.courseSonShow = this.courseSonTypes.length > 0;
            },
            goToCourse(){
                router.push('/course/'+this.courseId+'/Homepage')
            }
        }
    }
</script>
<style scoped>
    .custom-tree-node{
        width: 100%;
    }
    .pass{
        color: green;
    }
    .rejected{
        color: red;
    }
    .waiting{
        color: gray;
    }
    .lesson-state{
        font-weight: bold;
        float: right;
    }
    .lesson-edit{
        float: right;
        text-decoration: none;
        font-weight: bold;
        color: deepskyblue;
    }
    .word-max-overflow{
        overflow: hidden;
        word-break: keep-all;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .left-title{
        text-align: center;
        margin: 5px 0 5px 0;
        font-size: 20px;
    }
    .left-courses{
        border: 1px solid darkgray;
        box-shadow: 2px 2px 4px lightgrey;
        background-color: white;
        text-align: left;
        padding: 0 5px 10px 10px;
        overflow: hidden;
    }
    .el-upload{
        font-size: 0;
    }
    .img{
        margin: 0;
        max-height: 100%;
        max-width: 100%;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .el-tag {
        background-color: white;
        font-size: 20px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    }
    .button-new-tag {
        border-radius: 10px;
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
        font-size: 20px;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    .release-course-part{
        padding: 3em 2em 3em 2em;
    }
    .release-course-container{
        padding: 3em 3em 3em 2em;
        border: 1px solid darkgrey;
        background-color: lightgrey;
        overflow: hidden;
        border-radius: 5px;
        box-shadow: 2px 2px 3px darkgray;
    }
    .el-upload__tip{
        margin-top: -1em;
    }
    ul{
        list-style: none;
    }
    .chapter-list{
        padding: 0 0 0 1em;
        margin: 0;
    }
    .lesson-list{
        margin: 5px 0 0 0;
    }
    .lesson-list hr{
        margin: 0;
        opacity: 0.8;
    }
    .el-collapse-item__header{
        font-size: 1.5em;
    }
    .lesson-list a{
        margin-bottom: -5px;
        color: #000;
    }
    .lesson-list span{
        float:right;
    }
    a{
        color: blue;
        text-decoration: none;
    }
    .add-lesson{
        float: right;
        margin-top: 10px;
    }
</style>