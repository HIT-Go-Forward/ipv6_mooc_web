<template>
    <div class="blog-audit">
        <el-table :data="blogs">
            <el-table-column label="博客名">
                <template slot-scope="scope">
                    <a href="javascript:" @click="gotoBlog(scope.row.id)">{{scope.row.title}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="user.name" label="发布人" width="180"></el-table-column>
            <el-table-column label="备注" width="360">
                <template slot-scope="scope">
                    <el-input v-model="notes[scope.$index]"/>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="pass(scope.row.id,scope.$index)">通过</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="reject(scope.row.id,scope.$index)">不通过</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from './../../axiosIntercepter'
    import router from '../../router'
    export default {
        name: "blogAudit",
        props:['blogs'],
        data(){
            return {
                notes:[],
            }
        },
        created(){
            this.notes = new Array(this.blogs.length)
            console.log(this.blogs)
        },
        methods:{
            pass(blogId){
                axios.post('/action/apply/handleBlogApplies.action',{
                        ids:[blogId,],
                        operation:"accept"
                }).then((res)=>{
                    if(res.data.status===200){
                        this.$message.success("审核通过！")
                        this.$emit('getBlogs')
                    }
                })
            },
            reject(blogId){
                axios.post('/action/apply/handleBlogApplies.action',
                    {
                        ids:[blogId,],
                        operation:"reject"
                    }).then((res)=>{
                    if(res.data.status===200){
                        this.$message.success("审核不通过！")
                        this.$emit('getBlogs')
                    }
                })
            },
            gotoBlog(blogId){
                router.push('/blog/'+blogId)
            }
        }
    }
</script>

<style scoped lang="less">
    .blog-audit{
        background-color: white;
        min-height: 500px;
        padding: 2rem;
        .blog{
            width: 60%;
            margin: 0 auto 2rem auto;
        }
    }
    a{
        text-decoration: none;
        font-size: 1.2rem;
        color: #000;
    }
</style>