<template>
  <div class="modifyUserInfo">
    <el-form
      :model="form"
      label-width="10rem"
      :rules="rules"
      ref="form"
      class="modify-userinfo-container"
      size="medium"
    >
      <el-form-item label="头像：">
        <div class="userImg" @click="modifyAvatar">
          <div v-if="!user.img" class="avatar-div">
            <img src="../../assets/image/avatar.jpg" alt class="avatar">
          </div>
          <div v-else class="avatar-div">
            <img :src="'/media' + user.img" alt class="avatar">
          </div>
          <div class="avatar-gray" @click="modifyAvatar">
            <span class="avatar-cover">更换头像</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input type="text" v-model="form.name" prefix-icon="el-icon-edit"/>
      </el-form-item>

      <el-row type="flex" justify="space-between">
        <el-col :span="16">
          <el-form-item label="学校" class="school">
            <el-select
              v-model="form.school"
              filterable
              remote
              placeholder="请输入学校名称"
              :remote-method="getSchoolList"
              :loading="loading"
              value
            >
              <el-option
                v-for="school in schoolList"
                :key="school.name"
                :value="school.id"
                :label="school.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="学历" class="education">
            <el-select v-model="form.education" placeholder="选择学历" value>
              <el-option label="本科" value="3"></el-option>
              <el-option label="硕士" value="4"></el-option>
              <el-option label="博士" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-form-item label="生日">
            <el-date-picker
              class="el-date-picker"
              v-model="form.birthday"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="性别" class="sex">
            <el-select v-model="form.sex" value placeholder="选择性别">
              <el-option label="男" value="F"></el-option>
              <el-option label="女" value="M"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="手机">
        <el-input
          onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
          type="number"
          v-model="form.phone"
        />
      </el-form-item>

      <el-form-item label="简介">
        <el-input
          type="textarea"
          placeholder="请输入个人简介"
          v-model="form.intro"
          :autosize="{minRows: 5}"
        />
      </el-form-item>
      <el-form-item>
        <el-button class="button button-submit" plain round @click="modifyUserInfo">修改并保存</el-button>
        <el-button class="button button-back" plain round @click="returnUserHomepage">放弃并返回</el-button>
      </el-form-item>
    </el-form>
    <avatar-dialog ref="avatarDialog"/>
  </div>
</template>

<script>
import axios from "../../axiosIntercepter";
import router from "../../router";
export default {
  name: "modify-user-info",
  inject: ["reload"],
  components: {
    avatarDialog: () => import("./../userHomepage/avatarDialog")
  },
  data() {
    let stringTrim = (rule, value, callback) => {
      if (value.replace(/(^\s*)|(\s*$)/g, "") === "") {
        callback(new Error("不能全为空格"));
      } else {
        callback();
      }
    };
    return {
      schoolList: [],
      loading: false,
      form: {
        name: "",
        school: "",
        education: "",
        birthday: "",
        sex: "",
        intro: "",
        phone: ""
      },
      urser: "",
      img: "",
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 40, message: "名字不能超过40字", trigger: "blur" },
          { validator: stringTrim, message: "不能全为空格", trigger: "blur" }
        ],
        school: [{ max: 40, message: "学校名字不能超过40字", trigger: "blur" }],
        phone: [{ max: 14, message: "手机格式不对", trigger: "blur" }],
        intro: [{ max: 500, message: "简介不能超过500字", trigger: "blur" }]
      }
    };
  },
  created() {
    this.user = this.$store.getters.getStorge.user;
    this.form.name = this.user.name;
    this.form.school = this.user.school ? this.user.school.name : "";
    this.form.intro = this.user.intro;
    this.form.birthday = this.user.birthday;
    this.form.education = this.user.education;
    this.form.phone = this.user.phone;
    this.form.sex = this.user.sex;
  },
  methods: {
    modifyAvatar() {
      this.$refs.avatarDialog.avatarUpload();
    },
    getSchoolList(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          axios
            .get("/action/school/querySchool.action", {
              params: {
                keyword: query
              }
            })
            .then(response => {
              if (response.data.status === 403) {
                this.$message.error(response.data.data);
              } else if (response.data.status === 200) {
                this.loading = false;
                this.schoolList = response.data.data;
              } else if (response.data.status === 500) {
                this.$message.error("服务器出错");
              }
            })
            .catch(error => {
              this.$message.error("未连接到服务器");
              console.log(error);
            });
        }, 200);
      } else {
        this.schoolList = [];
      }
    },
    getFomateDay(birthday) {
      if (birthday === null) {
        return birthday;
      } else {
        let date = new Date(Date.parse(birthday));
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;
        return year + "-" + month + "-" + day;
      }
    },
    returnUserHomepage() {
      router.back();
    },
    modifyUserInfo() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          axios
            .get("/action/authority/modifyInfo.action", {
              params: {
                name: this.form.name.replace(/(^\s*)|(\s*$)/g, ""),
                birthday: this.getFomateDay(this.form.birthday),
                sex: this.form.sex,
                education: this.form.education,
                school:
                  typeof this.form.school === "number"
                    ? this.form.school
                    : this.$store.getters.getStorge.user.school.id,
                phone: this.form.phone,
                intro: this.form.intro
              }
            })
            .then(response => {
              if (response.data.status === 403) {
                this.$message.error(response.data.data);
              } else if (response.data.status === 200) {
                this.$store.commit("$_setStorage", {
                  user: response.data.data
                });
                this.$message.success("修改成功");
                this.reload();
              } else if (response.data.status === 500) {
                this.$message.error("服务器出错");
              }
            })
            .catch(error => {
              this.$message.error("未连接到服务器");
              console.log(error);
            });
        } else {
          console.log("form data is invalid!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.userImg {
  width: 10rem;
  height: 10rem;
}
.avatar {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  box-shadow: whitesmoke 0 0 3px;
}
.avatar-gray:hover{
    opacity: 0.7;
    cursor: pointer;
}
.avatar-gray{
    position:relative;
    top: -10.9rem;
    background-color: black;
    font-size: 1.7rem;
    border-radius:50%;
    width: 10rem;
    height:10rem;
    opacity: 0;
}
.avatar-cover{
    position: relative;
    top: 4rem;
    color: #fff;
}
.modifyUserInfo {
  width: 60%;
  /*margin-top: 50px;*/
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  padding: 50px 50px 10px;
  border-radius: 20px;
  box-shadow: 0 0 10px #b09999;
}
.button-submit {
  background-color: lawngreen;
  color: white;
}
.button-back {
  background-color: red;
  color: white;
}
.modify-userinfo-container {
  margin-top: 7rem;
  padding-right: 8rem;
}
.el-date-picker {
  float: left;
}

.sex {
  float: right;
}

.button {
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 50px;
}

.education {
  float: right;
}

.school {
  float: left;
}
</style>