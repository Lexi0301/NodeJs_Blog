import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 博文分类
const BowenfenleiModel = sequelize.define('BowenfenleiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	bowenfenlei: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '博文分类'
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
	// 是否在表中添加自动生成的 createdAt 和 updatedAt 字段来记录数据的创建时间和最后更新时间
	timestamps: false,
	// 是否使用与模型名称完全相同的表名
	freezeTableName: true,
	tableName: 'bowenfenlei'
})

export default BowenfenleiModel
