
export default {
	//返回一个包含会话信息的 JSON 响应
	session (res, code=0, msg='操作成功！', token='', status=200) {
		let result = {
			code,
			msg
		}
		if (token !== '') result.token = token
		res.status(status).json(result)
	},
	//返回一个包含文件信息的 JSON 响应
	file (res, code=0, file='', msg='上传成功！', status=200) {
		res.status(status).json({
			code,
			file,
			msg
		})
	},
	//返回一个包含计数信息的 JSON 响应
	count (res, code=0, count='', msg='请求成功！', status=200) {
		res.status(status).json({
			code,
			count,
			msg
		})
	},
	//返回一个包含记录信息的 JSON 响应
	record (res, code=0, data={}, msg='请求成功！', status=200) {
		res.status(status).json({
			code,
			msg,
			data
		})
	},
	//返回一个包含分页信息的 JSON 响应
	page (res, code=0, result={}, msg='请求成功！', status=200) {
		res.status(status).json({
			code,
			msg,
			data: {
				total: result.count,
				pageSize: result.pageSize,
				totalPage: result.count % result.pageSize == 0 ? result.count / result.pageSize : Math.ceil(result.count / result.pageSize) ,
				currPage: result.currPage,
				list: result.rows
			}
		})
	},
	// 用于验证用户的权限
	auth (req, res, role) {
		if (req.session.userinfo && !role.split(',').find(item => {return item === req.session.userinfo.role})) {
			res.status(200).json({
				code: 401,
				msg: '您的权限不够！'
			})
			return false
		}
		return true
	}
}
