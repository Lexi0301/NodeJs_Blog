Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(), 
        "m+": this.getMinutes(),
        "s+": this.getSeconds(), 
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export default {
    //判断给定的属性是否为空
	isNothing (prop) {
		return prop === null || prop === undefined || prop === ''
	},
    //返回指定天数后的日期和时间的格式化字符串
	getDateTimeFormat (days=0, fmt='yyyy-MM-dd hh:mm:ss') {
		return new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * days).Format(fmt)
	},
    // //将给定的数据转换为树状结构
    // translateDataToTree(data) {
    //     let parents = data.filter(value => value.parentid == 0)
    //     let children = data.filter(value => value.parentid != 0)
    //     let translator = (parents, children) => {
    //         parents.forEach((parent) => {
    //             children.forEach((current, index) => {
    //                 if (current.parentid === parent.id) {
    //                     let temp = JSON.parse(JSON.stringify(children))
    //                     temp.splice(index, 1)
    //                     translator([current], temp)
    //                     typeof parent.childs !== 'undefined' ? parent.childs.push(current) : parent.childs = [current]
    //                 }
    //             })}
    //         )
    //     }
    //     translator(parents, children)
    //     return parents
    // }
}
