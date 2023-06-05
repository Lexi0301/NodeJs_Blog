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
      <el-col :span="12">
          <!-- 不可编辑 -->
          <el-form-item class="input" label="标题" prop="biaoti">
              <el-input v-model="ruleForm2.biaoti" 
                placeholder="标题" readonly></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="12">
          <!-- 不可编辑 -->
          <el-form-item class="input" label="标签" prop="biaoqian">
              <el-input v-model="ruleForm2.biaoqian" 
                placeholder="标签" readonly></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="12">
          <el-form-item class="input" label="博文分类" prop="bowenfenlei">
	          <el-input v-model="ruleForm2.bowenfenlei" placeholder="博文分类" readonly></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="24">  
          <el-form-item v-if="ruleForm2.tupian" label="图片" prop="tupian">
            <img style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm2.tupian.split(',')" :src="$base.url+item" width="100" height="100">
          </el-form-item>
      </el-col>
      <el-col :span="12">
          <el-form-item class="input" v-if="ruleForm2.faburiqi" label="发布日期" prop="faburiqi">
              <el-input v-model="ruleForm2.faburiqi" 
                placeholder="发布日期" readonly></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="12">
          <el-form-item class="input" label="用户名" prop="yonghuming">
              <el-input v-model="ruleForm2.yonghuming" 
                placeholder="用户名" readonly></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="12">
          <el-form-item class="input" label="姓名" prop="xingming">
              <el-input v-model="ruleForm2.xingming" 
                placeholder="姓名" readonly></el-input>
          </el-form-item>
      </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
            <el-form-item v-if="ruleForm2.neirong" label="内容" prop="neirong">
                <span v-html="ruleForm2.neirong"></span>
            </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="btn">
        <el-button  v-if="type!='info'" type="primary" class="btn-success">提交</el-button>
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
      id: '',
      type: '',
      refid:'',
      ruleForm: {
        userid: '',
        refid: '',
        tablename: '',
        name: '',
        picture: '',
      },
      ruleForm2: {
        biaoti: '',
        biaoqian: '',
        bowenfenlei: '',
        tupian: '',
        neirong: '',
        faburiqi: '',
        yonghuming: '',
        xingming: '',
        clicktime: '',
      },
    };
  },
  props: ["parent"],
  created() {
	this.addEditStyleChange()
	this.addEditUploadStyleChange()
  },
  methods: {
    // 初始化
    init(id,type,refid) {
      if (id) {
        this.id = id;
        this.type = type;
        this.refid = refid;
        console.log(this.id);
      }
      if(this.type=='info'||this.type=='else'){
        this.info(id,refid);
      }
    },
    // 多级联动参数
    info(id,refid) {
      this.$http({
        url: `storeup/info/${id}`,
        method: "get"
      }).then(({ data }) => {
            if (data && data.code === 0) {
            this.ruleForm = data.data;
            console.log('refid'+refid);

            this.$http({
            url: `bowenxinxi/info/${refid}`,
            method: "get"
          }).then(({ data }) => {
            if (data && data.code === 0) {
              console.log('2222');
              this.ruleForm2 = data.data;
              console.log(this.ruleForm2);
            }
          
          });
        } else {
          this.$message.error(data.msg);
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
      this.parent.storeupCrossAddOrUpdateFlag = false;
      this.parent.contentStyleChange();
    },
    pictureUploadChange(fileUrls) {
	this.ruleForm.picture = fileUrls;
	this.addEditUploadStyleChange()
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
