<template>
  <div>
      <div class="container loginIn">
      <div :class="'left center'">
        <el-form class="login-form" label-position="left" :label-width="'30px'">
          <p class="title-container" :style='{"padding":"0 10px","boxShadow":"0  0 0px rgba(255,0,0,.8)","margin":"10px auto","borderColor":"rgba(0,0,0,1)","backgroundColor":"rgba(247, 247, 247, 0)","color":"#f56c6c","isshow":true,"borderRadius":"8px","borderWidth":"0","width":"100%","lineHeight":"32px","fontSize":"24px","borderStyle":"solid"}'>博客登录</p>
          <el-form-item :style='{"padding":"0","margin":"0 0 12px 0","borderRadius":"8px","borderWidth":"0","width":"100%","height":"auto"}' :class="'style2'">
            <span class="svg-container" style="color:#000;"><svg-icon icon-class="user" /></span>
            <el-input placeholder="请输入用户名" name="username" type="text" v-model="rulesForm.username" />
          </el-form-item>
          <el-form-item :style='{"padding":"0","margin":"0 0 12px 0","borderRadius":"8px","borderWidth":"0","width":"100%","height":"auto"}' :class="'style2'">
            <span class="svg-container" style="color:#000;"><svg-icon icon-class="password" /></span>
            <el-input placeholder="请输入密码" name="password" type="password" v-model="rulesForm.password" />
          </el-form-item>
          <el-form-item label="角色" prop="loginInRole" class="role" style="display: flex;align-items: center;">
            <el-radio
              v-for="item in roles"
              v-bind:key="item.roleName"
              v-model="rulesForm.role"
              :label="item.roleName"
            >{{item.roleName}}</el-radio>
          </el-form-item>
          <el-button type="primary" @click="login()" class="loginInBt">登录</el-button>
        </el-form>
      </div>

    </div>
  </div>
</template>
<script>

import menu from "@/utils/menu";

export default {
  data() {
    return {
      rulesForm: {
        username: "",
        password: "",
        role: "",
        code: '',
      },
      menus: [],
      roles: [],
      tableName: "",
    };
  },
  mounted() {
	let menus = menu.list();
	this.menus = menus;
    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].hasBackLogin=='是') {
            this.roles.push(this.menus[i])
      }
    }
  },
  methods: {
    // 登陆
    login() {
      if (!this.rulesForm.username) {
         this.$message.error("请输入用户名");
        return;
      }
      if (!this.rulesForm.password) {
         this.$message.error("请输入密码");
        return;
      }
      if(this.roles.length>1) {
          if (!this.rulesForm.role) {
             this.$message.error("请选择角色");
            return;
          }
          let menus = this.menus;
          for (let i = 0; i < menus.length; i++) {
            if (menus[i].roleName == this.rulesForm.role) {
              this.tableName = menus[i].tableName;
            }
          }
      } else {
          this.tableName = this.roles[0].tableName;
          this.rulesForm.role = this.roles[0].roleName;
      }

      this.$http({
        url: `${this.tableName}/login?username=${this.rulesForm.username}&password=${this.rulesForm.password}`,
        method: "post"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data);
          this.$storage.set("Token", data.token);
          this.$storage.set("role", this.rulesForm.role);
          this.$storage.set("sessionTable", this.tableName);
          this.$storage.set("adminName", this.rulesForm.username);
          this.$router.replace({ path: "/index/" });
        } else {
          this.$message.error(data.msg);
        }
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.el-form-item--medium{
    display: flex;
    justify-content: center;
}
.loginIn {
  min-height: 100vh;
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  .loginInBt {
    width: auto;
    height: auto;
    line-height: auto;
    margin: 0 auto;
    padding: 25px;
    color: rgba(255, 255, 255, 1);
    font-size: 34px;
    border-radius: 54px;
    border-width: 0;
    border-style: solid;
    border-color: rgba(64, 158, 255, 1);
    background-color: rgba(134, 157, 153, 1);
    box-shadow: 0 0 0px rgba(255,0,0,.1);
  }

  .left {
    position: absolute;
    left: 0;
    top: 0;
	box-sizing: border-box;
	width: 400px;
	height: auto;
	margin: 0 0 0 300px;
	padding: 120px 16px 16px;
	border-radius: 900px 900px 400px 400px;
	border-width: 20px;
	border-style: solid;
	border-color: rgba(220, 236, 238, 1);
	background-color: rgba(255, 255, 255, 1);
	box-shadow: 0 -30px 0px 45px rgba(193, 217, 213, 1);

    .login-form {
      background-color: transparent;
      width: 100%;
      right: inherit;
      padding: 0;
      box-sizing: border-box;
      display: flex;
	  position: initial;
      justify-content: center;
      flex-direction: column;
    }

    .title-container {
      text-align: center;
      font-size: 24px;
    }

    .el-form-item {
      position: relative;

      & /deep/ .el-form-item__content {
        line-height: initial;
      }

	  & /deep/ .el-radio__label {
	    width: auto;
	    height: 14px;
	    line-height: 14px;
	    margin: 0;
	    padding: 0 0 0 10px;
	    color: rgba(156, 156, 156, 1);
	    font-size: 14px;
	    border-radius: 0;
	    border-width: 0;
	    border-style: solid;
	    border-color: rgba(255, 255, 255, 0);
	    background-color: rgba(255, 255, 255, 0);
	    box-shadow: 0 0 6px rgba(255,0,0,0);
	    text-align: left;
	  }
	  & /deep/ .el-radio.is-checked .el-radio__label {
	    width: auto;
	    height: 14px;
	    line-height: 14px;
	    margin: 0;
	    padding: 0 0 0 10px;
	    color: rgba(0, 0, 0, 1);
	    font-size: 14px;
	    border-radius: 0;
	    border-width: 0;
	    border-style: solid;
	    border-color: rgba(255, 255, 255, 0);
	    background-color: rgba(255, 255, 255, 0);
	    box-shadow: 0 0 6px rgba(255,0,0,0);
	    text-align: left;
	  }
	  & /deep/ .el-radio__inner {
	    width: 14px;
	    height: 14px;
	    margin: 6px 0;
	    padding: 0;
	    border-radius: 100%;
	    border-width: 1px;
	    border-style: solid;
	    border-color: #dcdfe6;
	    background-color: rgba(255, 255, 255, 1);
	    box-shadow: 0 0 6px rgba(255,0,0,0);
	  }
	  & /deep/ .el-radio.is-checked .el-radio__inner {
	    width: 14px;
	    height: 14px;
	    margin: 0;
	    padding: 0;
	    border-radius: 100%;
	    border-width: 1px;
	    border-style: solid;
	    border-color: rgba(0, 0, 0, 1);
	    background-color: rgba(0, 0, 0, 1);
	    box-shadow: 0 0 6px rgba(255,0,0,0);
	  }

      .svg-container {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
        vertical-align: middle;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        padding: 0;
        line-height: 40px;
        width: 30px;
        text-align: center;
      }

      .el-input {
        display: inline-block;
        // height: 40px;
        width: 100%;

        & /deep/ input {
          background: transparent;
          border: 0px;
          -webkit-appearance: none;
          padding: 0 15px 0 30px;
          color: #fff;
          height: 40px;

		  width: 100%;
		  height: 40px;
		  line-height: 40px;
		  margin: 0;
		  padding: 0 30px;
		  color: rgba(0, 0, 0, 1);
		  font-size: 16px;
		  border-radius: 8px;
		  border-width: 0;
		  border-style: solid;
		  border-color: rgba(0,0,0,0);
		  background-color: rgba(236, 236, 236, 1);
		  box-shadow: 0 0 6px rgba(255,0,0,0);
        }
      }

    }
  }

  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-50%,0);
  }

  .style2 {
    padding-left: 30px;

    .svg-container {
      left: -30px !important;
    }

    .el-input {
      & /deep/ input {
        padding: 0 15px !important;
      }
    }
  }
  
  & /deep/ .el-form-item__label {
	width: 30px;
	height: 40px;
	line-height: 40px;
	margin: 0;
	padding: 0;
	color: #333;
	font-size: 14px;
	border-radius: 8px 0 0 8px;
	border-width: 0;
	border-style: solid;
	border-color: rgba(0,0,0,0);
	background-color: rgba(236, 236, 236, 0);
	box-shadow: 0 0 6px rgba(0,0,0,0);
  }

  .role {
    & /deep/ .el-form-item__label {
      width: 56px !important;
      height: 38px;
      line-height: 38px;
      margin: 0;
      padding: 0;
      color: rgba(0, 0, 0, 1);
      font-size: 14px;
      border-radius: 0;
      border-width: 0;
      border-style: solid;
      border-color: rgba(64, 158, 255, 1);
      background-color: rgba(255, 255, 255, 0);
      box-shadow: 0 0 6px rgba(255,0,0,0);
      text-align: left;
    }

    & /deep/ .el-radio {
      margin-right: 12px;
    }
  }
}
</style>
