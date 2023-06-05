<template>
  <div class="main-content" v-if="this.flag === 'users'">
    <!-- 列表页 -->
    <div v-if="showFlag">
      <div class="table-content">
        <el-table class="tables" size="medium" show-header="true"
            :header-row-style="{color:'rgba(0, 0, 0, 1)'}" :header-cell-style="{backgroundColor:'rgba(255, 219, 226, 0.459)'}"
            :border="true"
            fit="true"
            stripe="true"
            :style="{width: '100%',fontSize:'16px',color:'rgba(0, 0, 0, 1)'}"
            :data="dataList"
            v-loading="dataListLoading">
          <el-table-column prop="ask" header-align="center" align="center" sortable label="新消息"></el-table-column>
          <el-table-column
            prop="allnode"
            header-align="center"
            align="center"
            sortable
            label="状态"
            width="150"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isreply==1" type="success">未回复</el-tag>
              <el-tag v-if="scope.row.isreply==0" type="info">已回复</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="300" align="center" 
               header-align="center"
                label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="addOrUpdateHandler(scope.row)">回复</el-button>
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
    <add-or-update v-else :parent="this" ref="addOrUpdate"></add-or-update>
  </div>
</template>
<script>
import AddOrUpdate from "./chat-add-or-update";
import { setInterval } from 'timers';
export default {
  data() {
    return {
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      showFlag: true,
      inter: null,
      layouts: '',

      flag:'',
    };
  },
  created() {
    var that = this;
    var inter = setInterval(function(){
        that.getDataList();
    },5000);
    this.inter = inter;
    this.contentPageStyleChange()
  },
  components: {
    AddOrUpdate
  },
  methods: {
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
    getDataList() {
      var table = this.$storage.get("sessionTable");
      this.flag = table;

      this.dataListLoading = true;
      this.$http({
        url: this.$api.chatpage,
        method: "get",
        params: {
          page: this.pageIndex,
          limit: this.pageSize,
          sort: 'id'
        }
      }).then(({ data }) => {
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
    // 回复
    addOrUpdateHandler(row) {
      this.showFlag = false;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(row.userid);
      });
    }
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
