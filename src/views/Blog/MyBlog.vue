<template>
    <el-col class="myblog-container">
        <el-col class="myblog-header" :span="20" :offset="2">
            <div class="myblog-header-name-div">
                <span class="myblog-header-name">我的名字</span>
            </div>
            <div class="myblog-header-release-div">
                <el-button type="success" class="myblog-header-release" @click="gotoRelease()">发布博客</el-button>
            </div>
        </el-col>
        <el-col>
        <el-col :span="6" :offset="1" class="myblog-bloger">
            <div class="bloger-header">
                <div class="bloger-img-div">
                    <img class="bloger-img" src="./../../assets/image/avatar.png">
                </div>
                <div class="bloger-name-div">
                    <span class="bloger-name">我的名字</span>
                </div>
            </div><hr/>
            <div class="bloger-msg">
                <div class="msg-origin">
                    <span>原创</span><br/>
                    <span>2</span>
                </div>
                <div class="msg-fans">
                    <span>粉丝</span><br>
                    <span>2</span>
                </div>
                <div class="msg-comment">
                    <span>评论</span><br>
                    <span>2</span>
                </div>
                <div class="msg-like">
                    <span>喜欢</span><br>
                    <span>2</span>
                </div>
            </div><hr/>
            <div class="bloger-reader-num">
                <span>总访问量：4</span>
            </div><hr/>
            <div class="bloger-related-courses">
                <div class="bloger-related-course">
                    <div class="course-img-div">
                        <img class="course-img" src="./../../assets/image/courseDefault.jpg">
                    </div>
                    <div class="course-name-div">
                        <span class="course-name">课程名字</span>
                    </div>
                    <div class="course-author-div">
                        <span class="course-author">课程作者</span>
                    </div>
                    <div class="course-intro-div">
                        <span class="course-intro">课程简介</span>
                    </div>
                    <div class="course-hot-div">
                        <span class="course-hot"><i class="el-icon-view"></i>2000</span>
                    </div>
                </div>
                <div class="bloger-related-course">
                    <div class="course-img-div">
                        <img class="course-img" src="./../../assets/image/courseDefault.jpg">
                    </div>
                    <div class="course-name-div">
                        <span class="course-name">课程名字</span>
                    </div>
                    <div class="course-author-div">
                        <span class="course-author">课程作者</span>
                    </div>
                    <div class="course-intro-div">
                        <span class="course-intro">课程简介</span>
                    </div>
                    <div class="course-hot-div">
                        <span class="course-hot"><i class="el-icon-view"></i>2000</span>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="13" class="myblog-main">
            <div class="main-header">
                <div class="main-header-filter">
                    <input type="checkbox" id="original">
                    <label for="original">只看原创</label>
                </div>
                <div class="main-header-sort">
                    <span class="sort-text">排序：</span>
                    <a href="javascript:">按时间</a>
                    <a href="javascript:">按题目</a>
                    <a href="javascript:">按热度</a>
                </div>
            </div>
            <div class="blog">
                <div class="blog-name-div">
                    <span class="blog-type">原</span>
                    <a href="javascript:" class="blog-name">博客名字</a>
                </div>
                <div class="blog-brief-div">
                    <span class="blog-brief">这里是从博客中抽取的最开始的部分文字用于简介</span>
                </div>
                <div class="blog-msg-div">
                    <div class="blog-msg">
                        <span class="release-time">发布时间：2019年3月1日 8:20:00</span>
                        <span class="point">|</span>
                        <span class="read-num">阅读数：2000</span>
                        <span class="point">|</span>
                        <span class="comment-num">评论数：13</span>
                    </div>
                    <div class="blog-edit-div">
                        <a href="javascript:" class="blog-toup">置顶</a>
                        <a href="javascript:" class="blog-close-comment">关闭评论</a>
                        <a href="javascript:" class="blog-edit">编辑</a>
                        <a href="javascript:" class="blog-delete">删除</a>
                    </div>
                </div>
            </div>
            <div class="blog" v-for="blog in blogs" :key="blog.id">
                <div class="blog-name-div">
                    <span class="blog-type">原</span>
                    <a href="javascript:" class="blog-name" @click="gotoBlog(blog.id)">{{blog.title}}</a>
                </div>
                <div class="blog-brief-div">
                    <span class="blog-brief">{{blog.blog}}</span>
                </div>
                <div class="blog-msg-div">
                    <div class="blog-msg">
                        <span class="release-time">发布时间：{{blog.uploadDate}}</span>
                        <span class="point">|</span>
                        <span class="read-num">阅读数：{{blog.visitCount}}</span>
                        <span class="point">|</span>
                        <span class="comment-num">评论数：13</span>
                    </div>
                    <div class="blog-edit-div">
                        <a href="javascript:" class="blog-toup">置顶</a>
                        <a href="javascript:" class="blog-close-comment">关闭评论</a>
                        <a href="javascript:" class="blog-edit">编辑</a>
                        <a href="javascript:" class="blog-delete">删除</a>
                    </div>
                </div>
            </div>
        </el-col>
        </el-col>
    </el-col>
</template>

<script>
    import router from './../../router.js'
    import axios from 'axios'
    export default {
        name: "MyBlog",
        data(){
            return {
                hello:'',
                blogs:'',
            }
        },
        created(){
            this.getBlogs()
        },
        methods:{
            getBlogs(){
                this.blogs = [];
                axios.get("/action/blog/getBlog.action",{
                    params:{
                        id:24
                    }
                }).then((res)=>{
                    console.log(res)
                    this.blogs.push(res.data.data)
                }).catch((err)=>{
                    console.log(err)
                    this.$message.error("网络错误！")
                })
            },
            gotoRelease(){
                router.push({name:'releaseBlog'})
            },
            gotoBlog(blogId){
                router.push("/blog/"+blogId)
            }
        }
    }
</script>

<style scoped lang="less">
    .myblog-container{
        .myblog-header{
            // width: 100%;
            height: 8rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .myblog-header-name-div{
                margin-left: 2rem;
                font-size: 3rem;
                font-weight: bold;
            }
            .myblog-header-release-div{
                margin-right: 2rem;
            }
            .myblog-header-release{
                width: 10rem;
                height: 4rem;
                font-size: 1.5rem;
            }
        }
        .myblog-bloger{
            background-color: white;
            .bloger-header{
                height: 5rem;
                .bloger-img-div{
                    margin-left: 2rem;
                    margin-top: 0.5rem;
                    margin-bottom: 0.5rem;
                    .bloger-img{
                        float: left;
                        width: 4.5rem;
                        height: 4.5rem;
                        border-radius: 50%;
                    }
                }
                .bloger-name-div{
                    float:left;
                    margin-left: 1.5rem;
                    .bloger-name{
                        font-size: 1.5rem;
                        line-height: 5rem;
                        font-weight: 800;
                    }
                }
            }
            .bloger-msg{
                padding: 0 3rem;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                line-height: 2rem;
                div{
                    span:nth-child(1){
                        font-weight: 800;
                        font-size: 1.3rem;
                    }
                    span:nth-child(3){
                        font-weight: 700;
                        font-size: 1.1rem;
                    }
                }
            }
            .bloger-related-courses{
                overflow:hidden;
                padding-top: 1rem;
                padding-bottom: 1rem;
                text-align: left;
                .bloger-related-course{
                    border-radius: 5px;
                    border: 1px solid white;
                    &:hover{
                        border: 1px solid whitesmoke;
                        box-shadow: 4px 4px 3px lightblue;
                    }
                    transition: 0.5s;
                    height: 10rem;
                    margin-bottom: 1rem;
                    margin-right: 0.5rem;
                    margin-left: 0.5rem;
                    .course-img-div{
                        .course-img{
                            height: 10rem;
                            width: 10rem;
                            float: left;
                        }
                    }
                    .course-name-div{
                        .course-name{
                            margin-left: 1rem;
                            font-size: 1.5rem;
                            font-weight: 700;
                        }
                    }
                    .course-author-div{
                        margin-top: 0.5rem;
                        .course-author{
                            margin-left: 1rem;
                            font-size: 0.8rem;
                            font-weight: 500;
                            color: gray;
                        }
                    }
                    .course-intro-div{
                        margin-top: 0.5rem;
                        height: 5rem;
                        .course-intro{
                            margin-left: 1rem;
                            
                        }
                    }
                    .course-hot-div{
                        .course-hot{
                            margin-left: 1rem;
                        }
                    }
                }
            }
        }
        .myblog-main{
            background-color: white;
            margin-left: 2rem;
            .main-header{
                height: 4rem;
                border-bottom: 1px solid gray;
                box-shadow: 0 2px 2px #ddd;
                font-size:1.5rem;
                .main-header-filter{
                    display: inline-block;
                    line-height: 4rem;
                    float: left;
                    margin-left: 2rem;
                }
                .main-header-sort{
                    display: inline-block;
                    line-height: 4rem;
                    float: right;
                    margin-right: 3rem;
                    span{
                        margin-right: 2rem;
                        color: gray;
                    }
                    a{
                        margin-right: 1.5rem;
                        text-decoration: none;
                        color: black;

                    }
                }
            }
            .blog{
                border-bottom: 1px solid #ddd;
                padding: 1rem 2rem;
                text-align: left;
                .blog-name-div{
                    margin-bottom: 1rem;
                    .blog-type{
                        border-radius: 50%;
                        padding: 0.1rem 0.3rem;
                        color: red;
                        border: 2px solid pink;
                        font-size: 1.2rem;
                        font-weight: 800;
                    }
                    .blog-name{
                        font-size: 1.5rem;
                        font-weight: bold;
                        margin-left: 1rem;
                        color: black;
                        text-decoration: none;
                    }
                }
                .blog-brief-div{
                    font-size: 1.2rem;
                    font-weight: 500;
                    color: gray;
                    margin-bottom: 1rem;
                }
                .blog-msg-div{
                    font-size: 1.1rem;
                    .blog-msg{
                        display: inline-block;
                        .point{
                            color: gray;
                            margin: 0 0.5rem;
                        }
                    }
                    .blog-edit-div{
                        display: inline-block;
                        float: right;
                        a{
                            margin-right: 1rem;
                            text-decoration:none;
                            color: black;
                            font-weight: 600;
                        }
                    }
                }
            }
        }
    }
</style>