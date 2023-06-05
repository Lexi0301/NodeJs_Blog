const menu = {
    list() {
        return [{
            "backMenu": [
                { "child": [{ "appFrontIcon": "cuIcon-qrcode", "buttons": ["新增", "查看", "修改", "删除"], "menu": "用户", "menuJump": "列表", "tableName": "yonghu" }], 
                  "menu": "用户管理" }, 
                { "child": [{ "appFrontIcon": "cuIcon-goodsnew", "buttons": ["新增", "查看", "修改", "删除"], "menu": "博文分类", "menuJump": "列表", "tableName": "bowenfenlei" }], 
                  "menu": "博文分类管理" },
                { "child": [{ "appFrontIcon": "cuIcon-shop", "buttons": ["查看", "删除"], "menu": "博文信息", "menuJump": "列表", "tableName": "bowenxinxi" }], 
                   "menu": "博文信息管理" },
                { "child": [{ "appFrontIcon": "cuIcon-service", "buttons": ["新增", "查看", "修改", "删除"], "menu": "客服留言", "tableName": "chat" }, 
                            // { "appFrontIcon": "cuIcon-flashlightopen", "buttons": ["新增", "查看", "修改", "删除"], "menu": "轮播图管理", "tableName": "config" }, 
                            { "appFrontIcon": "cuIcon-news", "buttons": ["新增", "查看", "修改", "删除"], "menu": "公告信息", "tableName": "news" }], 
                  "menu": "系统管理" }
            ],
            "frontMenu": [{ "child": [{ "appFrontIcon": "cuIcon-vipcard", "buttons": ["查看"], "menu": "博文信息列表", "menuJump": "列表", "tableName": "bowenxinxi" }], 
                            "menu": "博文信息模块" }],
            "hasBackLogin": "是",
            "hasBackRegister": "否",
            "hasFrontLogin": "否",
            "hasFrontRegister": "否",
            "roleName": "管理员",
            "tableName": "users"
        }, {
            "backMenu": [
                { "child": [{ "appFrontIcon": "cuIcon-shop", "buttons": ["新增", "查看", "修改", "删除", "查看评论"], "menu": "博文信息", "menuJump": "列表", "tableName": "bowenxinxi" }], 
                  "menu": "博文信息管理" },
                { "child": [{ "appFrontIcon": "cuIcon-favor", "buttons": ["查看", "删除"], "menu": "我的收藏管理", "tableName": "storeup" }], 
                  "menu": "我的收藏管理" }
            ],
            "frontMenu": [{ "child": [{ "appFrontIcon": "cuIcon-vipcard", "buttons": ["查看"], "menu": "博文信息列表", "menuJump": "列表", "tableName": "bowenxinxi" }], 
                            "menu": "博文信息模块" }],
            "hasBackLogin": "是",
            "hasBackRegister": "否",
            "hasFrontLogin": "是",
            "hasFrontRegister": "是",
            "roleName": "用户",
            "tableName": "yonghu"
        }]
    }
}
export default menu;
