<template>
    <div>
        <el-dialog :visible="modifyAvatarVisible" title="上传头像" center>
            <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="preUpload"
                       :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modifyAvatarVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyAvatarVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <div class="vue-cropper-box"
             v-if="isShowCropper">
            <div class="vue-cropper-content">
                <vueCropper ref="cropper"
                            :img="option.img"
                            :outputSize="option.outputSize"
                            :outputType="option.outputType"
                            :info="option.info"
                            :canScale="option.canScale"
                            :autoCrop="option.autoCrop"
                            :autoCropWidth="option.autoCropWidth"
                            :autoCropHeight="option.autoCropHeight"
                            :fixed="option.fixed"
                            :fixedNumber="option.fixedNumber"> </vueCropper>
            </div>
            <el-button v-if="isShowCropper"
                       type="danger"
                       @click="onCubeImg">确定裁剪图片</el-button>

        </div>
    </div>

</template>

<script>
    import vueCropper from 'vue-cropper'
    import axios from 'axios'
    export default {
        name: "avatar-dialog",
        components:{
            vueCropper
        },
        data(){
            return{
                modifyAvatarVisible: false,
                isShowCropper: false,
                imageUrl: '',
                option: {
                    img: '',                         //裁剪图片的地址
                    info: true,                      //裁剪框的大小信息
                    outputSize: 1,                   // 裁剪生成图片的质量
                    outputType: 'jpeg',              //裁剪生成图片的格式
                    canScale: false,                 // 图片是否允许滚轮缩放
                    autoCrop: true,                  // 是否默认生成截图框
                    autoCropWidth: 150,              // 默认生成截图框宽度
                    autoCropHeight: 150,             // 默认生成截图框高度
                    fixed: false,                    //是否开启截图框宽高固定比例
                    fixedNumber: [4, 4]              //截图框的宽高比例
                },
            }
        },
        methods:{
            handleAvatarSuccess(res, file) {
                alert('1')
                this.imageUrl = URL.createObjectURL(file.raw);
                alert(this.imageUrl)
                this.$nextTick(() => {
                    this.option.img = this.imageUrl;
                    this.isShowCropper = true
                })
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
            preUpload(file){
                console.log(file);
                axios.post(this.$store.state.actionIP + '/resource/upload.action', {
                    file: file,
                    type: 'userImg',
                })
                    .then(response => {
                        if (response.data.status === 403) {
                            this.$message.error(response.data.data);
                        }
                        else if (response.data.status === 200) {
                            this.imageUrl = response.data.data
                        }
                        else if (response.data.status === 500) {
                            this.$message.error('服务器出错')
                        }
                    })
                    .catch(error => {
                        this.$message.error('未连接到服务器');
                        console.log(error);
                    });
            },
            onCubeImg(){

            }
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>