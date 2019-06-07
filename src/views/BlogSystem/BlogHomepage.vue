<template>
    <el-col class="blog-container">
        <el-col :span="20" class="blog-header">
            <h1 @click="getBlogs">V6课堂博客区</h1>
        </el-col>
        <el-col :span="4" class="goto-my-blog" >
            <el-button type="success" @click="gotoMyBlog()">进入我的博客</el-button>
        </el-col>
        <el-col class="ads-container">
            <el-col :span="18" class="auto-run-container">
                <el-carousel trigger="click" height="22rem">
                    <el-carousel-item>
                        <img src="./../../assets/image/blog-img1.png" class="blog-img">
                    </el-carousel-item>
                    <el-carousel-item>
                        <img src="./../../assets/image/blog-img2.jpg" class="blog-img">
                    </el-carousel-item>
                </el-carousel>
            </el-col>
            <el-col :span="5" class="blog-filter-div">
                <div class="blog-filter-computer blog-filter">
                    <a href="javascript:;" @click="getBlogByType(114)">
                        <img src="./../../assets/image/blog_img/计算机.png" class="blog-filter-img">
                    </a>
                </div>
                <div class="blog-filter-financial blog-filter">
                    <a href="javascript:;">
                        <img src="./../../assets/image/blog_img/经济学.png" class="blog-filter-img">
                    </a>
                </div>
                <div class="blog-filter-psychology blog-filter">
                    <a href="javascript:;">
                        <img src="./../../assets/image/blog_img/艺术设计.png" class="blog-filter-img">
                    </a>
                </div>
                <div class="blog-filter-language blog-filter">
                    <a href="javascript:;">
                        <img src="./../../assets/image/blog_img/文学历史.png" class="blog-filter-img">
                    </a>
                </div>
                <div class="blog-filter-language blog-filter">
                    <a href="javascript:;">
                        <img src="./../../assets/image/blog_img/心理学.png" class="blog-filter-img">
                    </a>
                </div>
            </el-col>
        </el-col>
        <el-col class="blog-main">
            <el-col :span="18" class="blogs">
                <div class="blog" v-for="blog in showBlogs" :key="blog.id" @click="gotoBlog(blog.id)">
                    <div class="blog-header-div">
                        <a href="javascript:" class="blog-header">{{blog.title}}</a>
                    </div>
                    <div class="blog-body-div">
                        <span class="blog-body">{{blog.blog}}
                        </span>
                    </div>
                    <hr>
                </div>
            </el-col>
            <el-col :span="6" class="recommender">
                <div class="blog-recommender">
                    <div class="blog-recommender-header-div">
                        <span class="blog-recommender-header">推荐博客</span>
                        <hr>
                    </div>
                    <div class="blog-recommender-body">
                        <span class="blog-recommender-name">推荐博客名</span>
                        <span class="blog-recommender-user">博主名</span>
                    </div>
                </div>
                <div class="bloger-recommender">
                    <div class="bloger-recommender-header-div">
                        <span class="bloger-recommender-header">推荐博主</span>
                        <hr/>
                    </div>
                    <div class="bloger-recommender-body">
                        <div class="bloger-img-div">
                            <img src="./../../assets/image/avatar.png" class="bloger-img">
                        </div>
                        <div class="bloger-name-div">
                            <span class="bloger-name">博主</span>
                        </div>
                        <div class="bloger-msg-div">
                            <span class="bloger-msg">博主学了多少门课程，发表多少门课程。。。</span>
                        </div>
                    </div>
                </div>
                <div class="course-recommender">
                    <div class="course-recommender-header-div">
                        <span class="course-recommender-header">相关课程</span>
                        <hr/>
                    </div>
                    <div class="course-recommender-body">
                        <div class="course-recommender-name-div">
                            <span class="course-recommender-name">推荐课程名称</span>
                        </div>
                        <div class="course-recommender-msg-div">
                            <span class="course-recommender-learning-msg">课程有多少人在学</span>
                            <span class="course-recommender-publisher-msg">课程发布者是谁</span>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-col>
        <div class="to-up"></div>
    </el-col>
</template>

<script>
    import axios from './../../axiosIntercepter'
    import router from './../../router'
    import { mapState } from 'vuex'

    export default {
        name: "BlogHomepage",
        inject:["reload"],
        data(){
            return {
                blogs:[],
                showBlogs:[],
            }
        },
        created(){
            this.getBlogs();
        },
        computed:{
            ...mapState({
                tagList : state => state.categoryList,
            })
        },
        methods:{
            gotoBlog(blogId){
                router.push('/blog/'+blogId)
            },
            gotoMyBlog(){
                router.push({name:"myBlog"})
            },
            getBlogByType(id){
                this.showBlogs = [];
                axios.get("/action/blog/queryBlogByType.action",{
                    params:{
                        typeId:id
                    }
                }).then((res)=>{
                    this.showBlogs = res.data.data;
                })
            },
            getBlogs(){
                this.blogs=[];
                this.showBlogs=[];
                axios.get("/action/blog/queryBlog.action",{
                    params:{
                        start:0,
                        length:10,
                    }
                }).then((res)=>{
                    this.blogs=[...res.data.data];
                    this.showBlogs = this.blogs;
                })
                // let reqList=[];
                // for(let type of this.tagList){
                //     let req = axios.get("/action/blog/queryBlogByType.action",{
                //         params:{
                //             typeId:type.id
                //         }
                //     })
                //     reqList.push(req)
                // }
                // axios.all(reqList).then(axios.spread((...resList)=>{
                //     let blogList = [];
                //     console.log(resList)
                //     resList.forEach(function(item){
                //         blogList.push(...item.data.data)
                //     })
                //     console.log(blogList)
                //     for(let blog of blogList){
                //         if(!this.containBlog(blog)){
                //             this.showBlogs.push(blog)
                //         }
                //     }
                //     console.log("show")
                //     console.log(this.showBlogs)
                // }))
            },
            // containBlog(blog){
            //     if(this.showBlogs.length===0){
            //         return false;
            //     }
            //     for(let showblog of this.showBlogs){
            //         if(blog.id===showblog.id){
            //             return true;
            //         }
            //     }
            //     return false;
            // },
        },

    }
</script>

<style scoped lang="less">
    .blog-container{
        text-align: left;   
        .goto-my-blog{
            margin-top: 2rem;
        }
        .blog-header{
            h1{
                font-size: 4rem;
                margin: 0;
            }
        }   
        .ads-container{
            margin-top: 2rem;
            .blog-img{
                height: 22rem;
                width: 100%;
            }
            .blog-filter-div{
                background-color: white;
                margin-left: 5px;
                height: 22rem;
                overflow: hidden;
                .blog-filter{
                    height: 3rem;
                    padding: 0 0 1.5rem 1rem;
                }
                .blog-filter-img{
                    width: 100%;
                }
            }
        }
        .blog-main{
            .blogs{
                padding-right: 2rem;
                .blog{
                    margin-top: 3rem;
                    .blog-header-div{
                        margin-bottom: 1rem;
                        .blog-header{
                            font-size: 2rem;
                            font-weight: 900;
                            color:black;
                        }
                    }
                    .blog-body-div{
                        .blog-body{
                            color: gray;
                            font-size: 1.5rem;
                            letter-spacing: 2px;
                            line-height: 3rem;
                        }
                    }
                }
            }
            .recommender{
                padding-left: 2rem;
                margin-top: 2rem;
                .blog-recommender{
                    .blog-recommender-header-div{
                        .blog-recommender-header{
                            font-size: 1.5rem;
                            font-weight: 900;
                        }
                    }
                    .blog-recommender-body{
                        font-size: 1rem;
                        .blog-recommender-name{
                        }
                        .blog-recommender-user{
                            float: right;
                        }
                    }
                }
                .bloger-recommender{
                    margin-top: 2rem;
                    .bloger-recommender-header-div{
                        .bloger-recommender-header{
                            font-size: 1.5rem;
                            font-weight: 900;
                        }
                    }
                    .bloger-recommender-body{
                        .bloger-img-div{
                            float: left;
                            margin-right: 1rem;
                            .bloger-img{
                                width: 4rem;
                                height: 4rem;
                                border-radius: 50%;
                            }
                        }
                        .bloger-name-div{
                            font-size: 1.2rem;
                            font-weight: 800;
                        }
                        .bloger-msg-div{
                        }
                    }
                }
                .course-recommender{
                    margin-top: 2rem;
                    .course-recommender-header-div{
                        .course-recommender-header{
                            font-size: 1.5rem;
                            font-weight: 900;
                        }
                    }
                    .course-recommender-body{
                        .course-recommender-name-div{
                            .course-recommender-name{
                                font-size: 1.2rem;
                                font-weight: 800;
                            }
                        }
                    }
                }
            }
        }
        
    }
</style>