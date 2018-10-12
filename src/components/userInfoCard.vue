<template>
    <div class="userInfoCard">
        <el-row type="flex" justify="space-around">

            <el-col :span="10" class="info">
                <div class="userImg">
                    <img src="../assets/logo.png" alt="">
                </div>
                <div class="info">
                    <div class="name">
                        <span>{{user.name}}</span>
                    </div>
                    <div class="identify">
                        <span>学生</span>
                    </div>
                    <div class="school">
                        <span>哈尔滨工业大学</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="10">
                <div>

                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "user-info-card",
        data() {
            return {
                user: this.$store.getters.getStorge.user
            }
        }
    }
</script>

<style scoped>
    .userInfoCard {
        height: 200px;
    }
    .userImg {
        width: 15%;
        display: inline-block;
    }
    img {
        width: 100%;
        border-radius: 100%;
    }
    .identify {
        display: inline-block;
    }
    .school{
        display: inline-block;
    }
    .info{
        display: inline-block;
        margin-top: 4%;
    }
</style>