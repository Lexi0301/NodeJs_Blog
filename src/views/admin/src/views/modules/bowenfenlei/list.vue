<template>
  <div class="main-content">
    <!-- 列表页 -->
    <div v-if="showFlag && this.flag === 'users'">
      <el-form :inline="true" :model="searchForm" class="form-content">
        <el-row  :gutter="20" class="slt" :style="{justifyContent:'flex-start'}">
          <el-form-item>
            <el-input v-model="searchForm.bowenfenlei" placeholder="博文分类" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="success" @click="search()">查询</el-button>
          </el-form-item>
        </el-row>

        <el-row class="ad" :style="{justifyContent:'flex-start'}">
          <el-form-item>
            <el-button
              type="success"
              icon="el-icon-plus"
              @click="addOrUpdateHandler()"
            >新增</el-button>
            <el-button
              :disabled="dataListSelections.length <= 0"
              type="danger"
              icon="el-icon-delete"
              @click="deleteHandler()"
            >删除</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="table-content">
        <el-table class="tables" size="medium" show-header="true"
            :header-row-style="{color:'rgba(0, 0, 0, 1)'}" :header-cell-style="{backgroundColor:'rgba(255, 219, 226, 0.459)'}"
            border="true"
            fit="true"
            stripe="true"
            :style="{width: '100%',fontSize:'16px',color:'rgba(0, 0, 0, 1)'}"
            :data="dataList"
            v-loading="dataListLoading"
            @selection-change="selectionChangeHandler">
            <!-- 选项列 -->
            <el-table-column 
                type="selection"
                header-align="center"
                align="center"
                width="50">
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column label="索引" align="center" type="index" width="50" />
            <!-- 博文分类列 -->
            <el-table-column sortable="true" align="center" 
                prop="bowenfenlei"
                header-align="center"
                label="博文分类">
              <template slot-scope="scope">
                  {{scope.row.bowenfenlei}}
              </template>
            </el-table-column>
            <!-- 操作列 -->
            <el-table-column width="300" align="center" 
               header-align="center"
                label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteHandler(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页功能区 -->
        <el-pagination
          clsss="pages"
          :layout="layouts"
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          :total="totalPage"
          :background="true"
          :style="{textAlign:'left'}"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加/修改页面  将父组件的search方法传递给子组件-->
    <add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>
  </div>
</template>
<script>
import AddOrUpdate from "./add-or-update";
export default {
  data() {
    return {
      searchForm: {
        key: ""
      },
      form:{},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: true,
      addOrUpdateFlag:false,
      layouts: '',

      flag:'',
    };
  },
  created() {
    this.getDataList();
    this.contentStyleChange()
  },
  components: {
    AddOrUpdate,
  },
  methods: {
    contentStyleChange() {
      this.contentSearchStyleChange()
      this.contentBtnAdAllStyleChange()
      this.contentPageStyleChange()
    },
    //搜索框样式
    contentSearchStyleChange() {
      this.$nextTick(()=>{
        document.querySelectorAll('.form-content .slt .el-input__inner').forEach(el=>{
          el.style.height = "40px"
          el.style.lineHeight = "40px"
        })
        setTimeout(()=>{
          document.querySelectorAll('.form-content .slt .el-input__prefix').forEach(el=>{
            el.style.lineHeight = "40px"
          })
          document.querySelectorAll('.form-content .slt .el-input__suffix').forEach(el=>{
            el.style.lineHeight = "40px"
          })
          document.querySelectorAll('.form-content .slt .el-input__icon').forEach(el=>{
            el.style.lineHeight = "40px"
          })
        },10)

      })
    },
    // 新增、批量删除
    contentBtnAdAllStyleChange() {
      this.$nextTick(()=>{
        document.querySelectorAll('.form-content .ad .el-button--success').forEach(el=>{
          el.style.height = "40px"
        })
        document.querySelectorAll('.form-content .ad .el-button--danger').forEach(el=>{
          el.style.height = "40px"
        })
      })
    },
    // 分页
    contentPageStyleChange(){
      let arr = []
      arr.push('total')
      arr.push('sizes')
      arr.push('prev')
      arr.push('pager')
      arr.push('next')
      arr.push('jumper')
      this.layouts = arr.join()
    },
    //搜索
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },
    // 获取数据列表
    getDataList() {
      var table = this.$storage.get("sessionTable");
      this.flag = table;
      
      this.dataListLoading = true;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: 'id',
      }
      if(this.searchForm.bowenfenlei!='' && this.searchForm.bowenfenlei!=undefined){
        params['bowenfenlei'] = '%' + this.searchForm.bowenfenlei + '%'
      }
      this.$http({
        url: "bowenfenlei/page",
        method: "get",
        params: params
      }).then(({ data }) => {
        // console.log(this.$data);
        if (data && data.code === 0) {
          this.dataList = data.data.list;
          this.totalPage = data.data.total;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id,type) {
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      type = 'else';
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,type);
      });
    },
    // 删除
    deleteHandler(id) {
      var ids = id ? [Number(id)] : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "bowenfenlei/delete",
          method: "post",
          data: ids
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },
  }

};
</script>
<style lang="scss" scoped>
  .slt {
    margin: 0 !important;
    display: flex;
  }

  .ad {
    margin: 0 !important;
    display: flex;
  }

  .pages {
    & /deep/ el-pagination__sizes{
      & /deep/ el-input__inner {
        height: 22px;
        line-height: 22px;
      }
    }
  }

  .el-button+.el-button {
    margin:0;
  } 

  .tables {
	& /deep/ .el-button--success {
		height: 40px;
		color: rgba(0, 0, 0, 1);
		font-size: 14px;
		border-width: 0 5px 5px;
		border-style: solid;
		border-color: rgba(109, 109, 148, 1);
		border-radius: 0;
		background-color: rgba(255, 219, 226, 0.459);
	}
	
	& /deep/ .el-button--primary {
		height: 40px;
		color: rgba(0, 0, 0, 1);
		font-size: 14px;
		border-width: 0 5px 5px;
		border-style: solid;
		border-color: rgba(109, 109, 148, 1);
		border-radius: 0;
		background-color: rgba(255, 219, 226, 0.459);
	}
	
	& /deep/ .el-button--danger {
		height: 40px;
		color: rgba(0, 0, 0, 1);
		font-size: 14px;
		border-width: 0 5px 5px;
		border-style: solid;
		border-radius: 0;
		background-color: rgba(255, 219, 226, 0.459);
	}

    & /deep/ .el-button {
      margin: 4px;
    }
  }
	.form-content {
		background: transparent;
	}
	.table-content {
    background: transparent;
	}
	
	.tables /deep/ .el-table__body tr {
				background-color: rgba(255, 255, 255, 0.459) !important;
				color: rgba(0, 0, 0, 1) !important;
	 }
	.tables /deep/ .el-table__body tr.el-table__row--striped td {
	    background: transparent;
	}
	.tables /deep/ .el-table__body tr.el-table__row--striped {
		background-color: rgba(255, 219, 226, 0.459) !important;
		color: rgba(0, 0, 0, 1) !important;
	}
	
	 .tables /deep/ .el-table__body tr:hover>td {
	   	   background-color: #f29d9d !important;
	   	   	   color: #333 !important;
	   	 }
	 
</style>
