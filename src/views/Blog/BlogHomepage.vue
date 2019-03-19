<template>
    <el-col :span="22" :offset="1" class="blog-container">
        <el-col class="blog-header">
            <h1>V6课堂博客区</h1>
        </el-col>
        <el-col class="ads-container">
            <el-col :span="18" class="auto-run-container">
                <el-carousel trigger="click" height="22rem">
                    <el-carousel-item v-for="item in 4" :key="item">
                        {{item}}
                    </el-carousel-item>
                </el-carousel>
            </el-col>
            <el-col :span="5" class="blog-filter">
                <span>look here</span>
            </el-col>
        </el-col>
        <el-col class="blog-main">
            <el-col :span="18" class="blogs">
                <div class="blog">
                    <div class="blog-header-div">
                        <span class="blog-header">这里是头头</span>
                    </div>
                    <div class="blog-body-div">
                        <span class="blog-body">这里是抽取的正文这里是抽取的正文
                            这里是抽取的正文这里是抽取的正文这里是抽取的正文这里是抽取的正文
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
    export default {
        name: "BlogHomepage"
    }
</script>

<style scoped lang="less">
    .blog-container{
        text-align: left;   
        .blog-header{
            h1{
                font-size: 4rem;
                margin: 0;
            }
        }   
        .ads-container{
            margin-top: 2rem;
            .blog-filter{
                background-color: yellow;
                margin-left: 2rem;
                height: 22rem;
                overflow: hidden;
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
                            font-weight: 1000;
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
                            font-weight: 1000;
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
                            font-weight: 1000;
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
                            font-weight: 1000;
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