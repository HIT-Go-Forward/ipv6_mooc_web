<template>
    <div class="home">
        <carousel/>
        <div v-for="category in categoryList" :key="category.id">
            <course-by-category :type="category" :categoryList="tagList[category.id-1]" class="course-by-category"/>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'home',
        data(){
            return{
                categoryList: [],
                tagList: [],
            }
        },
        components: {
            carousel: ()=>import('../components/homepage/carousel'),
            courseByCategory: ()=>import('../components/homepage/courseByCategory'),
        },
        created(){
            axios.get(this.$store.state.actionIP+'/course/getAllCourseType.action').then((res)=>{
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

</style>
