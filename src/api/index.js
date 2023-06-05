import { Router } from 'express'
import UsersController from './Users'
import FileController from './File'
import ConfigController from './Config'
import CommonController from './Common'
import YonghuController from './Yonghu'
import BowenfenleiController from './Bowenfenlei'
import BowenxinxiController from './Bowenxinxi'
import ChatController from './Chat'
import StoreupController from './Storeup'
import NewsController from './News'
import DiscussbowenxinxiController from './Discussbowenxinxi'
 
export default ({ config, db }) => {
	let api = Router()

	api.use('/users', UsersController({ config, db }))

	api.use('/file', FileController({ config, db }))

	api.use('/config', ConfigController({ config, db }))

	api.use('/', CommonController({ config, db }))

	api.use('/yonghu', YonghuController({ config, db }))

	api.use('/bowenfenlei', BowenfenleiController({ config, db }))

	api.use('/bowenxinxi', BowenxinxiController({ config, db }))

	api.use('/chat', ChatController({ config, db }))

	api.use('/storeup', StoreupController({ config, db }))

	api.use('/news', NewsController({ config, db }))

	api.use('/discussbowenxinxi', DiscussbowenxinxiController({ config, db }))

	return api
}
