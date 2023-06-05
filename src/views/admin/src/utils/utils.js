import storage from './storage';
import menu from './menu';
/**
 * 可以传入任何类型的值作为 key 参数
 * @param {*} key
 */
//Authorization权限
export function isAuth(tableName,key) {
    let role = storage.get("role");
    if(!role){
        role = '管理员';
    }
    let menus = menu.list();
    for(let i=0;i<menus.length;i++){
        if(menus[i].roleName==role){
            for(let j=0;j<menus[i].backMenu.length;j++){
                for(let k=0;k<menus[i].backMenu[j].child.length;k++){
                    if(tableName==menus[i].backMenu[j].child[k].tableName){
                        let buttons = menus[i].backMenu[j].child[k].buttons.join(',');
                        return buttons.indexOf(key) !== -1 || false
                    }
                }
            }
        }
    }
    return false;
}