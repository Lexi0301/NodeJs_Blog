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
        <!-- 可编辑 -->
        <el-form-item class="input" v-if="type!='info'"  label="标题" prop="biaoti">
          <el-input v-model="ruleForm.biaoti" 
              placeholder="标题" clearable  :readonly="ro.biaoti"></el-input>
        </el-form-item>
        <div v-else>
          <!-- 不可编辑 -->
          <el-form-item class="input" label="标题" prop="biaoti">
              <el-input v-model="ruleForm.biaoti" 
                placeholder="标题" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <!-- 可编辑 -->
        <el-form-item class="input" v-if="type!='info'"  label="标签" prop="biaoqian">
          <el-input v-model="ruleForm.biaoqian" 
              placeholder="标签" clearable  :readonly="ro.biaoqian"></el-input>
        </el-form-item>
        <div v-else>
          <!-- 不可编辑 -->
          <el-form-item class="input" label="标签" prop="biaoqian">
              <el-input v-model="ruleForm.biaoqian" 
                placeholder="标签" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="select" v-if="type!='info'"  label="博文分类" prop="bowenfenlei">
          <el-select :disabled="ro.bowenfenlei" v-model="ruleForm.bowenfenlei" placeholder="请选择博文分类">
            <el-option
                v-for="(item,index) in bowenfenleiOptions"
                v-bind:key="index"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="博文分类" prop="bowenfenlei">
	          <el-input v-model="ruleForm.bowenfenlei" placeholder="博文分类" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="24">  
        <el-form-item class="upload" v-if="type!='info' && !ro.tupian" label="图片" prop="tupian">
          <file-upload
          tip="点击上传图片"
          action="file/upload"
          :limit="3"
          :multiple="true"
          :fileUrls="ruleForm.tupian?ruleForm.tupian:''"
          @change="tupianUploadChange"
          ></file-upload>
        </el-form-item>
        <div v-else>
          <el-form-item v-if="ruleForm.tupian" label="图片" prop="tupian">
            <img style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.tupian.split(',')" :src="$base.url+item" width="100" height="100">
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="date" v-if="type!='info'" label="发布日期" prop="faburiqi">
            <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="ruleForm.faburiqi" 
                type="datetime"
                :readonly="ro.faburiqi"
                placeholder="发布日期">
            </el-date-picker>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" v-if="ruleForm.faburiqi" label="发布日期" prop="faburiqi">
              <el-input v-model="ruleForm.faburiqi" 
                placeholder="发布日期" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="input" v-if="type!='info'"  label="用户名" prop="yonghuming">
          <el-input v-model="ruleForm.yonghuming" 
              placeholder="用户名" clearable  :readonly="true"></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="用户名" prop="yonghuming">
              <el-input v-model="ruleForm.yonghuming" 
                placeholder="用户名" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="input" v-if="type!='info'"  label="姓名" prop="xingming">
          <el-input v-model="ruleForm.xingming" 
              placeholder="姓名" clearable  :readonly="true"></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="姓名" prop="xingming">
              <el-input v-model="ruleForm.xingming" 
                placeholder="姓名" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item v-if="type!='info'"  label="内容" prop="neirong">
            <editor 
                style="min-width: 200px; max-width: 600px;"
                v-model="ruleForm.neirong" 
                class="editor" 
                action="file/upload">
            </editor>
          </el-form-item>
          <div v-else>
            <el-form-item v-if="ruleForm.neirong" label="内容" prop="neirong">
                <span v-html="ruleForm.neirong"></span>
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
// 数字校验
import { isIntNumer } from "@/utils/validate";
export default {
  data() {
    var validateIntNumber = (rule, value, callback) => {
      if(!value){
        callback();
      } else if (!isIntNumer(value)) {
        callback(new Error("请输入整数"));
      } else {
        callback();
      }
    };
    return {
      id: '',
      type: '',
      ro:{
        biaoti : false,
        biaoqian : false,
        bowenfenlei : false,
        tupian : false,
        neirong : false,
        faburiqi : false,
        yonghuming : false,
        xingming : false,
        clicktime : false,
        clicknum : false,
      },
      ruleForm: {
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
      bowenfenleiOptions: [],
      rules: {
          biaoti: [
            { required: true, message: '标题不能为空', trigger: 'blur' },
          ],
          clicknum: [
            { validator: validateIntNumber, trigger: 'blur' },
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
      // 获取用户信息
      this.$http({
        url: `${this.$storage.get('sessionTable')}/session`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          var json = data.data;
          console.log(data);
          if(json.yonghuming!=''&&json.yonghuming){
            this.ruleForm.yonghuming = json.yonghuming
          }
          if(json.xingming!=''&&json.xingming){
            this.ruleForm.xingming = json.xingming
          }
        } else {
          this.$message.error(data.msg);
        }
      });
      this.$http({
        url: `option/bowenfenlei/bowenfenlei`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.bowenfenleiOptions = data.data;
        } else {
          this.$message.error(data.msg);
        }
      });
    },

    info(id) {
      this.$http({
        url: `bowenxinxi/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
        this.ruleForm = data.data;
        //解决前台上传图片后台不显示的问题
        let reg=new RegExp('../../../upload','g')//g代表全部
        this.ruleForm.neirong = this.ruleForm.neirong.replace(reg,'../../../nodejslexi/upload');
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 提交
    onSubmit() {
      if(this.ruleForm.tupian!=null) {
        this.ruleForm.tupian = this.ruleForm.tupian.replace(new RegExp(this.$base.url,"g"),"");
      }
       this.$refs["ruleForm"].validate(valid => {
         if (valid) {
            this.$http({
              url: `bowenxinxi/${!this.ruleForm.id ? "save" : "update"}`,
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
    tupianUploadChange(fileUrls) {
	    this.ruleForm.tupian = fileUrls;
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
