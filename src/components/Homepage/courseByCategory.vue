<template>
    <el-col class="course-by-category">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="type.name" :name="type.name" :key="type.id">
                <course-item  v-for="courseItem in courseItemList" :key="courseItem.id" :courseItem="courseItem"/>
            </el-tab-pane>
            <el-tab-pane v-for="category in categoryList" :key="category.id" :label="category.name" :name="category.name">
                <course-item  v-for="courseItem in courseItemList" :key="courseItem.id" :courseItem="courseItem"/>
            </el-tab-pane>
            <el-tab-pane label="查看全部 >>" :key="-1" :type="type.id" name="click-for-more"> </el-tab-pane>
        </el-tabs>
    </el-col>
</template>

<script>
    import axios from "axios"
    import router from '../../router'
    export default {
        name: "course-by-category",
        components:{
            courseItem: ()=>import('./courseItem'),
        },
        props:{
            categoryList: Array,
            type: Object,
        },
        data(){
            return{
                activeName: this.type.name,
                courseItemList: [],
            }
        },
        created(){
            this.getCourseList(this.type.id);
        },
        methods:{
            getCourseList(type){
                axios.get('/action/course/getCourseByType.action', {
                    params:{
                        typeId: type,
                        start: 0,
                        length: 5,
                    }
                }).then((res)=>{
                    if(res.data.status===200){
                        this.courseItemList=res.data.data
                    } else {
                        this.$message.error(res.data.data)
                    }
                }).catch((err)=>{
                    this.$message.error("网络连接错误！");
                    console.log(err)
                })
            },
            handleClick(tab){
                if(tab.$vnode.data.key===-1){
                    router.push({path: `/course/classify/${tab.$vnode.data.attrs.type}`});
                }else{
                    this.getCourseList(tab.$vnode.data.key);
                }
            }
        }
    }
</script>

<style scoped>
    .course-by-category{
        margin-bottom: 40px;
        padding: 20px;
        border-radius: 15px;
        height: 33rem;
        background-color: #ccc;
        box-shadow: 0 0 10px #B09999;
    }
</style>