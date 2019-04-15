<template>
    <div class="course-card">
        <el-row>
            <el-col :span="10">
                <div class="course-img-div">
                    <img :src="'/media' + course.img" alt="" class="course-img">
                </div>
            </el-col>
            <el-col :span="12">
                <div class="course-info">
                    <div class="course-name">
                        <span>{{course.name}}</span>
                    </div>
                    <div class="course-intro">
                        <el-row>
                            <el-col :span="3">
                                <span><strong>课程简介:</strong></span>
                            </el-col>
                            <el-col :span="21">
                                <span v-if="course.brief">{{course.brief}}</span>
                                <span v-else>未填写课程简介</span>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="course-user-number">
                        <span>已有{{course.userNum}}人参加该课程</span>
                    </div>
                    <div class="course-join">
                        <el-button v-if="hasJoinedCourse" class="join-button" plain type="primary" @click="joinCourse">立即加入</el-button>
                        <el-button v-if="user.type===2||user.id===course.teacher.id" class="join-button" plain type="primary" @click="enterCourse">进入课程</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import analyze from '../../../plugins/rgbaster'
    import axios from '../../../axiosIntercepter'
    import router from '../../../router'
    export default {
        name: "course-card",
        props:{
            course: '',
        },
        data(){
            return{
                user:"",
                hasJoinedCourse:false
            }
        },
        created(){
            this.user = this.$store.getters.getStorge.user
        },
        watch:{
            course:function(val){
                if(val.img){
                    this.getImgCol(val.img);
                }
                if(val.id){
                    this.hasJoin();
                }
            }
        },
        methods:{
            joinCourse(){
                axios.get("/action/course/joinCourse.action",{
                    params:{
                        courseId:this.course.id
                    }
                }).then((res)=>{
                    if(res.data==='success')
                        this.$message.success("你已经开始学习课程，请不要放弃哦")
                    else{
                        this.$message.error("学习失败？？？")
                    }
                }).catch((err)=>{
                    console.log(err)
                    this.$message.error("应用出错或网络错误！")
                })
            },
            enterCourse(){
                router.push({path: `/course/${this.course.id}/learn`});
            },
            hasJoin(){
                console.log("course",this.course)
                axios.get('/action/course/hasJoined.action', {
                    params: {
                        courseId:this.course.id
                    }
                }).then((res)=>{
                    this.hasJoinedCourse = !(res.data === "success");
                }).catch((err)=>{
                    this.$message.error("项目出错或网络未连接")
                    console.log(err)
                })
            },
            async getImgCol(src){
                try {
                    let imgSrc ='/media' + src
                    console.log(imgSrc)
                    let imgCol = await analyze(imgSrc, {ignore: ['rgb(255,255,255)', 'rgb(0,0,0)']})
                    let arrColor = imgCol[0].color.slice(4, -1).split(',')
                    arrColor.forEach((item,index)=>{arrColor[index] = parseInt(item)})
                    while(arrColor[0]<200||arrColor[1]<200||arrColor[2]<200){
                        arrColor[0]+=15;arrColor[1]+=15;arrColor[2]+=15;
                    }
                    console.log(arrColor);
                    this.$emit("changeBackgroundColor","rgb("+arrColor[0]+","+arrColor[1]+","+arrColor[2]+")")
                    // document.querySelector('.course-card').style.backgroundColor = "rgb("+arrColor[0]+","+arrColor[1]+","+arrColor[2]+")"
                }catch (e) {
                    console.log(e)
                    this.$emit("changeBackgroundColor","#fff")
                    // document.querySelector('.course-card').style.backgroundColor = "#fff"
                }
            }
        }
    }
</script>

<style scoped>
    .course-card{
        height: 20rem;
        padding-top: 1rem;
        border-radius: 0 0 20px 20px;
        box-shadow: 0 0 10px #B09999;
    }
    .course-img{
        /* width: 100%; */
        height: 17rem;
    }
    .course-img-div{
        background-color:white;
        height: 17rem;
        width: 90%;
        margin: 20px;
        overflow: hidden;
    }
    .course-info{
        margin: 20px;
        min-height: 260px;
        text-align: left;
    }
    .course-name{
        margin-top: 10px;
        font-size: 150%;
    }
    .course-intro{
        padding: 8px;
        margin-top: 20px;
        min-height: 5rem;
        overflow: hidden;
        background-color: #fff;
    }
    .course-user-number{
        font-size: 90%;
        margin: 10px 0;
    }
    .join-button{
        width: 150px;
    }
</style>