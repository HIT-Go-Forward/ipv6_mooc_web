<template>
    <div>
        <el-dialog class="avatar-dialog" :visible="modifyAvatarVisible" title="上传头像" center>
            <el-upload class="avatar-upload" drag
                       :action="'/upload/resource/uploadResource.action'"
                       :show-file-list="false"
                       :on-success="handleAvatarSuccess"
                       :with-credentials="true"
                       :before-upload="beforeAvatarUpload"
                       :data="{type:'userImg'}">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <div v-else>
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                    <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                </div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="uploadDone">确 定</el-button>
                <el-button type="primary" @click="uploadBack">取 消</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        name: "avatar-dialog",
        data(){
            return{
                modifyAvatarVisible: false,
                imageUrl: '',
                newImageUrl: '',
            }
        },
        methods:{
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                if(res.status===200){
                    this.$message.success('上传成功');
                    this.newImageUrl = res.data;
                }
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            avatarUpload(){
                this.modifyAvatarVisible = true;
            },
            uploadDone(){
                this.modifyAvatarVisible = false;
                this.imageUrl = '';
                let user = this.$store.getters.getStorge.user;
                user.img = this.newImageUrl;
                this.$store.commit('$_setStorage', {user: user});
            },
            uploadBack(){
                this.modifyAvatarVisible = false;
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 200px;
        height: 120px;
        line-height: 200px;
        text-align: center;
    }
    .avatar {
        width: 200px;
        height: 200px;
        display: block;
        margin: 0 auto;
    }
    .avatar-upload{
        text-align: center;
    }
    .avatar-dialog{
        width: 1000px;
        margin: 0 auto;
    }

</style>