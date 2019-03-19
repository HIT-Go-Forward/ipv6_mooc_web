<template>
    <div class="home">
        <carousel :courses="importantCourses"/>
        <el-row v-for="category in categoryList" :key="category.id">
            <course-by-category :type="category" :categoryList="tagList[category.id-1]" class="course-by-category"/>
        </el-row>
    </div>
</template>

<script>
    import axios from '../../axiosIntercepter'
    export default {
        name: 'home',
        data(){
            return {
                categoryList: [],
                tagList: [],
                importantCourses:[],
                user:'',
            }
        },
        components: {
            courseByCategory: ()=>import('./homepage/courseByCategory'),
            carousel: ()=>import('./homepage/carousel'),
        },
        created(){
            this.user = this.$store.getters.getStorge?this.$store.getters.getStorge.user:null
            console.log(this.user)
            if(this.user && this.user.type===4){
                axios.get('/action/course/getUserCourses.action',{
                    params:{
                        type:"learning",
                        start:0,
                        length:3
                    }
                }).then((res)=>{
                    this.importantCourses = res.data.data
                }).catch((err)=>{
                    console.log(err)
                })
            } else if(this.user && (this.user.type===3||this.user.type===2)){
                axios.get('/action/course/getUserCourses.action',{
                    params:{
                        type:"released",
                        start:0,
                        length:3
                    }
                }).then((res)=>{
                    this.importantCourses = res.data.data
                }).catch((err)=>{
                    console.log(err)
                })
            }

            axios.get('/action/course/getAllCourseType.action').then((res)=>{
                if(res.data.status===200){
                    for(let i=0;i<res.data.data.length;i++){
                        if (!res.data.data[i].parent){
                            this.categoryList.push(res.data.data[i]);
                        }
                        else{
                            while(this.tagList.length<res.data.data[i].parent){
                                this.tagList.push([]);
                            }
                            this.tagList[res.data.data[i].parent-1].push(res.data.data[i]);
                        }
                    }
                } else {
                    this.$message.error(res.data.data)
                }
            }).catch((err)=>{
                this.$message.error("网络连接错误！")
                console.log(err)
            })
        },
    }
</script>

<style scoped>
.home{
    padding-top: 5rem;
}
</style>
