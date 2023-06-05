<template>
    <el-aside class="index-aside" width="280px">
        <div class="index-aside-inner menulist">
            <div v-for="item in menuList" :key="item.roleName" v-if="role==item.roleName" class="menulist-item">
                <el-menu :mode="vertical" :unique-opened="true" class="el-menu-demo" default-active="0">
                    <el-menu-item index="0" @click="menuHandler('')"><i class="el-icon-menu el-icon-s-home" />首页</el-menu-item>
                    <el-submenu :index="1+''">
                        <template slot="title">
                            <i class="el-icon-menu el-icon-user-solid" />
                            <span>个人中心</span>
                        </template>
                        <el-menu-item :index="1-1" @click="menuHandler('updatePassword')">修改密码</el-menu-item>
                        <el-menu-item :index="1-2" @click="menuHandler('center')">个人信息</el-menu-item>
                    </el-submenu>
                    <el-submenu v-for=" (menu,index) in item.backMenu" :key="menu.menu" :index="index+2+''">
                        <template slot="title">
                            <i class="el-icon-menu" :class="icons[index]" />
                            <span>{{ menu.menu }}</span>
                        </template>
                        <el-menu-item v-for=" (child,sort) in menu.child" :key="sort" :index="(index+2)+'-'+sort" @click="menuHandler(child.tableName)">{{ child.menu }}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </div>
    </el-aside>
</template>

<script>
import menu from '@/utils/menu'
export default {
    data() {
        return {
            menuList: [],
            role: '',
            icons: [
                'el-icon-s-cooperation',
                'el-icon-s-order',
                'el-icon-s-platform',
                'el-icon-s-fold',
            ],
        }
    },
    mounted() {
        const menus = menu.list()
        if (menus) {
            this.menuList = menus
        } else {
            let params = {
                page: 1,
                limit: 1,
                sort: 'id',
            }
            this.$http({
                url: "menu/list",
                method: "get",
                params: params
            }).then(({
                data
            }) => {
                if (data && data.code === 0) {
                    this.menuList = JSON.parse(data.data.list[0].menujson);
                    this.$storage.set("menus", this.menuList);
                }
            })
        }
        this.role = this.$storage.get('role')
    },
    methods: {
        menuHandler(name) {
            let router = this.$router
            name = '/' + name
            router.push(name)
        },
    }
}
</script>
<style lang="scss" scoped>
.el-container {
    display: block;
}
.index-aside {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;

    .index-aside-inner {
        height: 100%;
        margin-right: -17px;
        margin-bottom: -17px;
        padding-top: 60px;
        box-sizing: border-box;

        &:focus {
            outline: none;//获取焦点时不会显示默认的外边框
        }

        & /deep/ .el-menu {
            border: 0;
            background-color: transparent;
        }
    }

    .index-aside .index-aside-inner.menulist {
        height: auto !important;
    }
    .menulist-item {
        width: 280px;
        padding: 15px 20px;
        margin: 0;
        border-radius: 0;
        border-width: 0 !important;
        border-style: solid !important;
        background: #fff !important;
        box-sizing: border-box;
    }
    .el-menu-demo {
        box-sizing: border-box;
        min-height: calc(100vh - 80px);

        & > .el-menu-item {
            width: 100%;
            height: auto !important;
            line-height: 24px !important;
            padding: 10px 15px;
            margin: 0 10px 0 0;
            color: #eda8a8;
            font-size: 14px;
            box-sizing: initial;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            box-sizing: border-box;

            .el-icon-menu {
                margin: 0 5px 0 0;
                padding: 0;
                width: 24px;
                line-height: 24px;
                color: #eda8a8;
                font-size: 16px;
            }
        }
        .el-submenu {
            margin-top: 30px;
        }

        & /deep/ .el-submenu__title {
            width: 100%;
            height: auto !important;
            line-height: 24px !important;
            padding: 10px 15px;
            color: #eda8a8;
            font-size: 14px;
            background-color: #fff !important;
            box-sizing: initial;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            box-sizing: border-box;

            .el-icon-menu {
                margin: 0 5px 0 0;
                padding: 0;
                width: 24px;
                line-height: 24px;
                color: #eda8a8;
                font-size: 16px;
            }

            .el-submenu__icon-arrow {
                margin: 0 10px 0 0;
                padding: 0;
                width: 12px;
                line-height: 12px;
                font-size: 12px;
                background-color: rgba(255, 255, 255, 0);
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                text-align: center;
                display: block;
            }
        }

        & /deep/ .el-menu.el-menu--inline {
            width: 100%;
            height: auto;
            padding: 0;
            margin: 0;
            background-color: #fff;
            // box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);/////

            .el-menu-item {
                width: 100%;
                height: 44px;
                line-height: 44px;
                padding: 0 10px !important;
                margin: 0;
                color: #F56C6C !important;
                font-size: 14px;
                background-color: #fff !important;
                box-shadow: 0 0 6px rgba(30, 144, 255, 0);
                text-align: center;
                min-width: auto;

                &.is-active {
                    width: 100%;
                    height: 44px;
                    line-height: 44px;
                    padding: 0 !important;
                    margin: 0;
                    color: rgb(255, 255, 255) !important;
                    font-size: 14px;
                    background-color: #eda8a8 !important;
                    box-shadow: 0 0 6px rgba(255, 30, 49, 0);
                    text-align: center;
                    border-left: 5px solid #F56C6C !important;
                }

                &:hover {
                    width: auto;
                    height: 44px;
                    line-height: 44px;
                    margin: 0;
                    color: rgb(255, 255, 255) !important;
                    font-size: 14px;
                    background-color: #edd2d2 !important;
                    text-align: center;
                    border-left: 5px solid #F56C6C !important;
                }
            }
        }
    }
}
</style>
