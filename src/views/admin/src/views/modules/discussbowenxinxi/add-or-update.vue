<template>
  <div class="addEdit-block">
    <el-form
      class="detail-form-content"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
    >
      <el-row >
      </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item class="textarea" v-if="type!='info'" label="评论内容" prop="content">
                <el-input
                  style="min-width: 200px; max-width: 600px;"
                  type="textarea"
                  :rows="8"
                  v-model="ruleForm.content" readonly>
                </el-input>
              </el-form-item>
              <div v-else>
                <el-form-item v-if="ruleForm.content" label="评论内容" prop="content">
                    <span>{{ruleForm.content}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item class="textarea" v-if="type!='info'" label="回复内容" prop="reply">
                <el-input
                  style="min-width: 200px; max-width: 600px;"
                  type="textarea"
                  :rows="8"
                  placeholder="回复内容"
                  v-model="ruleForm.reply" >
                </el-input>
              </el-form-item>
              <div v-else>
                <el-form-item v-if="ruleForm.reply" label="回复内容" prop="reply">
                    <span>{{ruleForm.reply}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
      <el-form-item class="btn">
        <el-button  v-if="type!='info'" type="primary" class="btn-success" @click="onSubmit">提交</el-button>
        <el-button v-if="type!='info'" class="btn-close" @click="back()">取消</el-button>
        <el-button v-if="type=='info'" class="btn-close" @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
	  addEditForm: {"btnSaveFontColor":"rgba(0, 0, 0, 1)","selectFontSize":"16px","btnCancelBorderColor":"rgba(188, 188, 188, 1)","inputBorderRadius":"0","inputFontSize":"16px","textareaBgColor":"#fff","btnSaveFontSize":"14px","textareaBorderRadius":"0","uploadBgColor":"#fff","textareaBorderStyle":"solid","btnCancelWidth":"88px","textareaHeight":"120px","dateBgColor":"#fff","btnSaveBorderRadius":"0","uploadLableFontSize":"14px","textareaBorderWidth":"1px","inputLableColor":"rgba(0, 0, 0, 1)","addEditBoxColor":"#fff","dateIconFontSize":"16px","btnSaveBgColor":"rgba(219, 244, 255, 1)","uploadIconFontColor":"rgba(0, 0, 0, 1)","textareaBorderColor":"rgba(112, 112, 112, 1)","btnCancelBgColor":"rgba(241, 241, 241, 1)","selectLableColor":"rgba(0, 0, 0, 1)","btnSaveBorderStyle":"solid","dateBorderWidth":"1px","dateLableFontSize":"14px","dateBorderRadius":"0","btnCancelBorderStyle":"solid","selectLableFontSize":"14px","selectBorderStyle":"solid","selectIconFontColor":"rgba(0, 0, 0, 1)","btnCancelHeight":"44px","inputHeight":"40px","btnCancelFontColor":"rgba(0, 0, 0, 1)","dateBorderColor":"rgba(112, 112, 112, 1)","dateIconFontColor":"rgba(0, 0, 0, 1)","uploadBorderStyle":"solid","dateBorderStyle":"solid","dateLableColor":"rgba(0, 0, 0, 1)","dateFontSize":"16px","inputBorderWidth":"1px","uploadIconFontSize":"28px","selectHeight":"40px","inputFontColor":"rgba(0, 0, 0, 1)","uploadHeight":"148px","textareaLableColor":"rgba(0, 0, 0, 1)","textareaLableFontSize":"14px","btnCancelFontSize":"14px","inputBorderStyle":"solid","btnCancelBorderRadius":"0","inputBgColor":"#fff","inputLableFontSize":"14px","uploadLableColor":"rgba(0, 0, 0, 1)","uploadBorderRadius":"0","btnSaveHeight":"44px","selectBgColor":"#fff","btnSaveWidth":"88px","selectIconFontSize":"16px","dateHeight":"40px","selectBorderColor":"rgba(112, 112, 112, 1)","inputBorderColor":"rgba(112, 112, 112, 1)","uploadBorderColor":"rgba(112, 112, 112, 1)","textareaFontColor":"rgba(0, 0, 0, 1)","selectBorderWidth":"1px","dateFontColor":"#606266","btnCancelBorderWidth":"0 5px 5px","uploadBorderWidth":"1px","textareaFontSize":"16px","selectBorderRadius":"0","selectFontColor":"rgba(0, 0, 0, 1)","btnSaveBorderColor":"rgba(109, 109, 148, 1)","btnSaveBorderWidth":"0 5px 5px"},
      id: '',
      type: '',
      ro:{
		content : false,
		reply : false,
      },
      ruleForm: {
        content: '',
        reply: '',
      },
      rules: {
          content: [
                { required: true, message: '评论内容不能为空', trigger: 'blur' },
          ],
      }
    };
  },
  props: ["parent"],

  created() {
	this.addEditStyleChange()
  },
  methods: {
    // 初始化
    init(id,type) {
      if (id) {
        this.id = id;
        this.type = type;
      }
      if(this.type=='info'||this.type=='else'){
        this.info(id);
      }
    },
    // 多级联动参数
    info(id) {
      this.$http({
        url: `discussbowenxinxi/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
        this.ruleForm = data.data;
	//解决前台上传图片后台不显示的问题
	let reg=new RegExp('../../../upload','g')//g代表全部
        } else {
          this.$message.error(data.msg);
        }
      });
    },


    // 提交
    onSubmit() {
       this.$refs["ruleForm"].validate(valid => {
         if (valid) {
			this.$http({
				url: `discussbowenxinxi/${!this.ruleForm.id ? "save" : "update"}`,
				method: "post",
				data: this.ruleForm
			   }).then(({ data }) => {
				if (data && data.code === 0) {
					this.$message({
						message: "操作成功",
						type: "success",
						duration: 1500,
						onClose: () => {
							this.parent.showFlag = true;
							this.parent.addOrUpdateFlag = false;
							this.parent.discussbowenxinxiCrossAddOrUpdateFlag = false;
							this.parent.search();
							this.parent.contentStyleChange();
						}
					});
				} else {
					this.$message.error(data.msg);
				}
			});
         }
       });
    },
    // 获取uuid
    getUUID () {
      return new Date().getTime();
    },
    // 返回
    back() {
      this.parent.showFlag = true;
      this.parent.addOrUpdateFlag = false;
      this.parent.contentStyleChange();
    },
	addEditStyleChange() {
		this.$nextTick(()=>{
	    // input
	    document.querySelectorAll('.addEdit-block .input .el-input__inner').forEach(el=>{
	      el.style.height = "40px"
	    })
	    document.querySelectorAll('.addEdit-block .input .el-form-item__label').forEach(el=>{
	      el.style.lineHeight = "40px"
	    })
	    // select 下拉栏
	    document.querySelectorAll('.addEdit-block .select .el-input__inner').forEach(el=>{
	      el.style.height = "40px"
	    })
	    document.querySelectorAll('.addEdit-block .select .el-form-item__label').forEach(el=>{
	      el.style.lineHeight = "40px"
	    })
	    // date
	    document.querySelectorAll('.addEdit-block .date .el-input__inner').forEach(el=>{
	      el.style.height = "40px"
	    })
	    document.querySelectorAll('.addEdit-block .date .el-form-item__label').forEach(el=>{
	      el.style.lineHeight = "40px"
	    })
	    document.querySelectorAll('.addEdit-block .date .el-input__icon').forEach(el=>{
	      el.style.lineHeight = "40px"
	    })
	    // upload
	    document.querySelectorAll('.addEdit-block .upload .el-upload--picture-card').forEach(el=>{
	      el.style.width = "148px"
	      el.style.height = "148px"
	      el.style.borderColor = "rgba(112, 112, 112, 1)"
	      el.style.backgroundColor = "#fff"
	    })
	    document.querySelectorAll('.addEdit-block .upload .el-form-item__label').forEach(el=>{
	      el.style.lineHeight = "148px"
	    })
	    document.querySelectorAll('.addEdit-block .upload .el-icon-plus').forEach(el=>{
	      el.style.fontSize = "28px"
	      el.style.lineHeight = '146px'
	      el.style.display = 'block'
	    })
	    // 多文本输入框
	    document.querySelectorAll('.addEdit-block .textarea .el-textarea__inner').forEach(el=>{
	      el.style.height = "120px"
	    })
	    // 保存
	    document.querySelectorAll('.addEdit-block .btn .btn-success').forEach(el=>{
	      el.style.width = "88px"
	      el.style.height = "44px"
	    })
	    // 返回
	    document.querySelectorAll('.addEdit-block .btn .btn-close').forEach(el=>{
	      el.style.width = "88px"
	      el.style.height = "44px"
	    })
	  })
	},
  }
};
</script>
<style lang="scss">
.editor{
  height: 500px;
  
  & /deep/ .ql-container {
	  height: 310px;
  }
}
.amap-wrapper {
  width: 100%;
  height: 500px;
}
.search-box {
  position: absolute;
}
.addEdit-block {
	margin: -10px;
}
.detail-form-content {
	padding: 12px;
	background-color: transparent;
}
.btn .el-button {
  padding: 0;
}
</style>
