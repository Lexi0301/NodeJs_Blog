import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 博文信息
const BowenxinxiModel = sequelize.define('BowenxinxiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	biaoti: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '标题'
	}, 
	biaoqian: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '标签'
	},
	bowenfenlei: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '博文分类'
	},
	tupian: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '图片'
	},
	neirong: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '内容'
	},
	faburiqi: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('faburiqi')).format('YYYY-MM-DD HH:mm:ss')
        },
		comment: '发布日期'
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
	clicktime: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('clicktime')).format('YYYY-MM-DD HH:mm:ss')
        },
		comment: '最近点击时间'
	},
	clicknum: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '点击次数'
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
	tableName: 'bowenxinxi'
})

export default BowenxinxiModel
