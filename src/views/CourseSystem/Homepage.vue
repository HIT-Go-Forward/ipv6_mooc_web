<template>
    <div class="home">
        <carousel :courses="importantCourses"/>
        <div v-for="category in categoryList" :key="category.id">
            <course-by-category :type="category" :categoryList="tagList[category.id-1]" class="course-by-category"/>
        </div>
        </div>
</template>

<script>
    import { mapState } from 'vuex'
    import axios from '../../axiosIntercepter'
    export default {
        name: 'home',
        inject:['getCourse'],
        data(){
            return {
                // categoryList: [],
                // tagList: [],
                importantCourses:[],
                user:'',
            }
        },
        computed: {
            ...mapState({
                categoryList : state => state.categoryList,
                tagList : state => state.tagList,
            })
        },
        components: {
            courseByCategory: ()=>import('../../components/Homepage/courseByCategory'),
            carousel: ()=>import('../../components/Homepage/carousel'),
        },
        created(){
            this.user = this.$store.state.IsLogin?this.$store.getters.getStorge.user:null
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
        },
    }
</script>

<style scoped>
.home{
    /*padding-top: 5rem;*/
}
</style>
