import { DataTypes } from 'sequelize'
import sequelize from './sequelize'

//轮播图
const ConfigModel = sequelize.define('ConfigModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: '图片名称'
	},
	value: {
		type: DataTypes.STRING,
		allowNull: true,
		comment: '图片地址'
	} 
}, {
	timestamps: false,
	freezeTableName: true,
	tableName: 'config'
})

export default ConfigModel
