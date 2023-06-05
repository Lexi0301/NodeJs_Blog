<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/"
    style="
      height: 50px;
      borderradius: 0;
      padding: 0px 20px 0px 20px;
      box-shadow: 0px 0px 8px 0px #f56c6c !important;
      borderwidth: 0;
    "
  >
    <transition-group
      name="breadcrumb"
      class="box"
      :style=" 'justifyContent:flex-start;'"
    >
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          style="color: rgba(0, 0, 0, 1)"
          >{{ item.name }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.name }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { generateTitle } from "@/utils/i18n";
export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
    this.breadcrumbStyleChange();
  },
  methods: {
    generateTitle,
    getBreadcrumb() {
      //meta.title
      // 获取当前路由对象：
      let route = this.$route;
      // 使用 filter() 方法过滤出具有元信息(meta)的路由记录
      let matched = route.matched.filter((item) => item.meta);
      // 将一个首页路由记录添加到过滤后的路由记录列表的开头：
      matched = [{ path: "/index" }].concat(matched);
      // 将过滤后的路由记录列表赋值给 levelList 数组，用于生成面包屑导航：
      this.levelList = matched.filter((item) => item.meta);
      console.log(this.levelList);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(path);
    },
    breadcrumbStyleChange(val) {
      this.$nextTick(() => {
        document
          .querySelectorAll(".app-breadcrumb .el-breadcrumb__separator")
          .forEach((el) => {
            el.innerText = "/";
            el.style.color = "rgba(0, 0, 0, 1)";
          });
        document
          .querySelectorAll(".app-breadcrumb .el-breadcrumb__inner a")
          .forEach((el) => {
            el.style.color = "rgba(58, 58, 58, 1)";
          });
        document
          .querySelectorAll(
            ".app-breadcrumb .el-breadcrumb__inner .no-redirect"
          )
          .forEach((el) => {
            el.style.color = "rgba(0, 0, 0, 1)";
          });

        let str = "2";
        if (2 == str) {
          let headHeight = "60px";
          headHeight = parseInt(headHeight) + 10 + "px";
          document.querySelectorAll(".app-breadcrumb").forEach((el) => {
            el.style.marginTop = headHeight;
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  display: block;
  font-size: 14px;
  line-height: 50px;

  .box {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
  }

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
