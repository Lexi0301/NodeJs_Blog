<template>
  <div id="app" class="">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang="scss">
.el-form-item--medium{
    display: flex !important;
}
*{
  padding: 0;
  margin:0;
}
html,body{
  width: 100%;
  height: 100%;
}
#app{
  height:100%;
}
body {
  padding: 0;
  margin: 0;
}
.index-aside .menulist-item[data-v-0175fa3e]{
    padding: 0 !important;
}
.index-aside .index-aside-inner[data-v-0175fa3e] .el-menu{
    	background-color: #fff !important;
}
.loginIn .left{
	width: 400px !important;
	border-width: 0 !important;
	border-radius: 12px !important;
	margin: 0 auto !important;
	padding: 30px 40px 16px !important;
	box-shadow: 0 0 10px rgba(0, 0, 0, .15) !important;
    opacity: 0.95 !important;
	
}
.loginIn .left .title-container .title {
	width: 100% !important;
	margin: 0 auto 40px !important;
	font-size: 28px !important;
	background-color: unset !important;
	color: #333333 !important;
	padding: 0 !important;
    font-family: cursive !important;
}

.loginIn .loginInBt {
	background-color: #f56c6c !important;
	color: white !important;
	border-radius: 8px !important;
	width: 200px !important;
	height: 44px !important;
	font-size: 18px !important;
	letter-spacing: 5px !important;
	padding: 0 !important;
        margin: 0 67px !important;
}

.loginIn .left .el-form-item .el-radio.is-checked .el-radio__inner {
	background-color: #f56c6c !important;
	border-color: #f56c6c !important;
}
.loginIn .left .el-form-item .el-radio.is-checked .el-radio__label {
	color: #f56c6c !important;
}

.navbar {
	background-image: unset !important;
	background-color: #fff !important;
        box-shadow: 0px 0px 12px 0px #ebedf8 !important;
}
.navbar .title-menu .title-name {
	color: black !important;
}
.navbar .right-menu div {
	color: black !important;
	background-color: #fff !important;
}
.navbar .right-menu div.logout:hover {
	background-color: white !important;
	color: #f56c6c !important;
}
.app-breadcrumb {
	background-color: white !important;
	border-radius: 8px !important;
}
.index-aside .menulist-item {
	background-image: unset !important;
	background-color: #222d32 !important;
}

.index-aside .el-menu-demo .el-menu.el-menu--inline {
	width: 100% !important;
	margin: 0 !important;
	color: white !important;
	border-width: 0 !important;
	text-align: left !important;
	padding: 0 !important;
	text-indent: 35px !important;
}
.index-aside .el-menu-demo .el-menu.el-menu--inline .el-menu-item {
	text-align: left !important;
	padding: 0 !important;
	text-indent: 35px !important;
	color: white !important;
	height: 44px !important;
	line-height: 44px !important;
	border-radius: 0 !important;
	box-shadow: unset !important;
}
.index-aside .el-menu-demo .el-menu.el-menu--inline .el-menu-item:hover {
	height: 44px !important;
	border: 0 !important;
	border-radius: 0 !important;
	background-color: #f56c6c !important;
	line-height: 44px !important;
}
.index-aside .el-menu-demo .el-menu.el-menu--inline .el-menu-item.is-active{
	height: 44px !important;
	border: 0 !important;
	border-radius: 0 !important;
	background-color: #f56c6c !important;
	line-height: 44px !important;
}
.index-aside .el-menu-demo .el-submenu__title .el-submenu__icon-arrow{
	color: white !important;
}

.el-button {
	border-radius: 6px !important;
	border: 1px solid transparent !important;
	background-color: #fff !important;
	color: #f56c6c !important;
	margin-right: 5px !important;
    border: 1px solid #f56c6c !important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
	background-color: #f56c6c !important;
}

.el-button.el-button--danger {
	background-color: white !important;
    border: 1px solid red !important;
     color: red !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
	background-color: #f56c6c !important;
	border-color: #f56c6c !important;
}
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
	background-color: #f56c6c !important;
	border-color: #f56c6c !important;
}
.el-checkbox__inner:hover {
	border-color: #f56c6c !important;
}
.el-input__inner {
	border-color: #d9d9d9 !important;
	border-radius: 6px !important;
} 
.el-input__inner:focus {
	border-color: #f56c6c !important;
}
.el-textarea__inner {
	border-color: #d9d9d9 !important;
	border-radius: 6px !important;
}
.el-textarea__inner:focus {
	border-color: #f56c6c !important;
}
.el-form-item__content{
    display: flex !important;
    justify-content: center !important;
}
.menulist-item{
    height: 100% !important;
}
.loginIn{
    background-image: url("https://gd-hbimg.huaban.com/5406523ece72e46c2f78e415216191a1ebb362251d3d4-kRfdcO_fw1200webp") !important;
}
.bread-crumbs{
        box-shadow: 0px 0px 8px 0px #f56c6c !important;
}
.el-form--inline{
        box-shadow: 0px 0px 8px 0px #f56c6c !important;
        border-radius: 10px !important;
}
.table-content{
    margin-top: 30px !important;
        box-shadow: 0px 0px 8px 0px #f56c6c !important;
        border-radius: 10px;

}
.bread-crumbs{
    border-style: none !important;
}
.content .text[data-v-7eb2bc79]{
    border-style: none !important;
}
</style>
