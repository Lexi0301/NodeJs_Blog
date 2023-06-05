<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
    >
      <el-row >
        <el-col :span="12">
          <el-form-item class="input" v-if="type!='info'"  label="博文分类" prop="bowenfenlei">
            <el-input v-model="ruleForm.bowenfenlei" 
                placeholder="博文分类" clearable  :readonly="ro.bowenfenlei"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="btn">
        <el-button  v-if="type!='info'" type="primary" class="btn-success" @click="onSubmit">提交</el-button>
        <el-button v-if="type!='info'" class="btn-close" @click="back()">取消</el-button>
      </el-form-item>
    </el-form>
  
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: '',//存储博文的ID
      type: '',//用于标识博文的类型
      ro:{//标识博文分类是否只读
	      bowenfenlei : false,
      },
      ruleForm: {
        bowenfenlei: '',
      },
      rules: {
        bowenfenlei: [
            { required: true, message: '博文分类不能为空', trigger: 'blur' },
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
      console.log(id,type);

      // 获取用户信息
      this.$http({
        url: `${this.$storage.get('sessionTable')}/session`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data);
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    info(id) {//获取关于特定id的博文分类信息
      this.$http({
        url: `bowenfenlei/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
        this.ruleForm = data.data;
        } else {
          this.$message.error(data.msg);
        }
      });
    },

    // 提交
    onSubmit() {
       this.$refs["ruleForm"].validate(valid => {
         if (valid) 
         {
          this.$http({
            //没id就保存，有id就修改
            url: `bowenfenlei/${!this.ruleForm.id ? "save" : "update"}`,
            method: "post",
            data: this.ruleForm
          }).then(({ data }) => {
            if (data && data.code === 0) {
              console.log(this.ruleForm);
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                    this.parent.showFlag = true;
                    this.parent.addOrUpdateFlag = false;
                    this.parent.bowenfenleiCrossAddOrUpdateFlag = false;
                    this.parent.search();
                    this.parent.contentStyleChange();
                    console.log(this.parent);
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
	  this.$nextTick(()=>{//$nextTick方法允许延迟执行代码，直到Vue实例完成DOM更新
	    // input
	    document.querySelectorAll('.input .el-input__inner').forEach(el=>{
	      el.style.height = "40px"
	    })
	    document.querySelectorAll('.input .el-form-item__label').forEach(el=>{
	      el.style.lineHeight = "40px"
	    })
	    // 保存
	    document.querySelectorAll('.btn .btn-success').forEach(el=>{
	      el.style.width = "88px"
	      el.style.height = "44px"
	    })
	    // 返回
	    document.querySelectorAll('.btn .btn-close').forEach(el=>{
	      el.style.width = "88px"
	      el.style.height = "44px"
	    })
	  })
	},
  }
};
</script>
<style lang="scss">
</style>
