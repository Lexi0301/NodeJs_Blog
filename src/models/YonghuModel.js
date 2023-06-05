import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 用户
const YonghuModel = sequelize.define('YonghuModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	yonghuming: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '用户名'
	},
	xingming: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '姓名'
	}, 
	touxiang: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '头像'
	},
	mima: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '密码'
	},
	shouji: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '手机'
	},
	addtime: {
  		type: DataTypes.DATE,
  		defaultValue: DataTypes.NOW,
    	allowNull: false,
    	get() {
            return moment(this.getDataValue('addtime')).format('YYYY-MM-DD HH:mm:ss')
        },
		comment: '添加时间'
	}
}, {
	timestamps: false,
	freezeTableName: true,
	tableName: 'yonghu'
})

export default YonghuModel
