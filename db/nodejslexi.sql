CREATE DATABASE `nodejslexi`;

USE `nodejslexi`;

CREATE TABLE `config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(100) NOT NULL COMMENT '配置参数名称',
  `value` varchar(100) DEFAULT NULL COMMENT '配置参数值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='配置文件';

LOCK TABLES `config` WRITE;
INSERT INTO `config` VALUES (1,'picture1','upload/banner1.jpg'),(2,'picture2','upload/banner2.jpg'),(3,'picture3','upload/banner3.jpg');
UNLOCK TABLES;

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(100) NOT NULL COMMENT '用户名',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `role` varchar(100) DEFAULT '管理员' COMMENT '角色',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '新增时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户表';

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1,'abo','123','管理员','2023-05-12 13:47:44');
UNLOCK TABLES;

CREATE TABLE `yonghu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `yonghuming` varchar(200) NOT NULL COMMENT '用户名',
  `xingming` varchar(200) NOT NULL COMMENT '姓名',
  `touxiang` varchar(200) DEFAULT NULL COMMENT '头像',
  `mima` varchar(200) NOT NULL COMMENT '密码',
  `shouji` varchar(200) DEFAULT NULL COMMENT '手机',
  PRIMARY KEY (`id`),
  UNIQUE KEY `yonghuming` (`yonghuming`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='用户';

LOCK TABLES `yonghu` WRITE;
INSERT INTO `yonghu` VALUES (11,'2023-05-12 13:47:44','用户名1','姓名1','upload/yonghu_touxiang1.jpg','123456','13333333333'),(12,'2023-05-12 13:47:44','用户名2','姓名2','upload/yonghu_touxiang2.jpg','123456','13333333333'),(13,'2023-05-12 13:47:44','用户名3','姓名3','upload/yonghu_touxiang3.jpg','123456','13333333333'),(14,'2023-05-12 13:47:44','用户名4','姓名4','upload/yonghu_touxiang4.jpg','123456','13333333333'),(15,'2023-05-12 13:47:44','用户名5','姓名5','upload/yonghu_touxiang5.jpg','123456','13333333333'),(16,'2023-05-12 13:47:44','用户名6','姓名6','upload/yonghu_touxiang6.jpg','123456','13333333333'),(17,'2023-05-12 13:47:44','用户名7','姓名7','upload/yonghu_touxiang7.jpg','123456','13333333333');
UNLOCK TABLES;

CREATE TABLE `bowenfenlei` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `bowenfenlei` varchar(200) NOT NULL COMMENT '博文分类',
  PRIMARY KEY (`id`),
  UNIQUE KEY `bowenfenlei` (`bowenfenlei`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COMMENT='博文分类';

INSERT INTO `bowenfenlei` VALUES (21,'2023-05-12 13:47:44','博文分类1'),(22,'2023-05-12 13:47:44','博文分类2'),(23,'2023-05-12 13:47:44','博文分类3'),(24,'2023-05-12 13:47:44','博文分类4'),(25,'2023-05-12 13:47:44','博文分类5'),(26,'2023-05-12 13:47:44','博文分类6'),(27,'2023-05-12 13:47:44','博文分类7');
UNLOCK TABLES;

CREATE TABLE `bowenxinxi` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `biaoti` varchar(200) NOT NULL COMMENT '标题',
  `biaoqian` varchar(200) DEFAULT NULL COMMENT '标签',
  `bowenfenlei` varchar(200) DEFAULT NULL COMMENT '博文分类',
  `tupian` varchar(200) DEFAULT NULL COMMENT '图片',
  `neirong` longtext COMMENT '内容',
  `faburiqi` datetime DEFAULT NULL COMMENT '发布日期',
  `yonghuming` varchar(200) DEFAULT NULL COMMENT '用户名',
  `xingming` varchar(200) DEFAULT NULL COMMENT '姓名',
  `clicktime` datetime DEFAULT NULL COMMENT '最近点击时间',
  `clicknum` int(11) DEFAULT '0' COMMENT '点击次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COMMENT='博文信息';

LOCK TABLES `bowenxinxi` WRITE;
INSERT INTO `bowenxinxi` VALUES (31,'2023-05-12 13:47:44','标题1','标签1','博文分类1','upload/bowenxinxi_tupian1.jpg','内容1','2023-05-12 13:47:44','用户名1','姓名1','2023-05-12 13:47:44',4),(32,'2023-05-12 13:47:44','标题2','标签2','博文分类2','upload/bowenxinxi_tupian2.jpg','内容2','2023-05-12 13:47:44','用户名2','姓名2','2023-05-12 13:47:44',4),(33,'2022-04-26 07:15:44','标题3','标签3','博文分类3','upload/bowenxinxi_tupian3.jpg','内容3','2023-05-12 13:47:44','用户名3','姓名3','2023-05-12 13:47:44',3),(34,'2023-05-12 13:47:44','标题4','标签4','博文分类4','upload/bowenxinxi_tupian4.jpg','内容4','2023-05-12 13:47:44','用户名4','姓名4','2023-05-12 13:47:44',4),(35,'2023-05-12 13:47:44','标题5','标签5','博文分类5','upload/bowenxinxi_tupian5.jpg','内容5','2023-05-12 13:47:44','用户名5','姓名5','2023-05-12 13:47:44',5),(36,'2023-05-12 13:47:44','标题6','标签6','博文分类6','upload/bowenxinxi_tupian6.jpg','内容6','2023-05-12 13:47:44','用户名6','姓名6','2023-05-12 13:47:44',7),(37,'2023-05-12 13:47:44','标题7','标签7','博文分类7','upload/bowenxinxi_tupian7.jpg','内容7','2023-05-12 13:47:44','用户名7','姓名7','2023-05-12 13:47:44',2);
UNLOCK TABLES;

CREATE TABLE `chat` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `userid` bigint(20) NOT NULL COMMENT '用户id',
  `adminid` bigint(20) DEFAULT NULL COMMENT '管理员id',
  `ask` longtext COMMENT '提问',
  `reply` longtext COMMENT '回复',
  `isreply` int(11) DEFAULT NULL COMMENT '是否回复',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 COMMENT='客服留言';

LOCK TABLES `chat` WRITE;
INSERT INTO `chat` VALUES (41,'2023-05-12 13:47:44',1,1,'提问1','回复1',1),(42,'2023-05-12 13:47:44',2,2,'提问2','回复2',2),(43,'2023-05-12 13:47:44',3,3,'提问3','回复3',3),(44,'2023-05-12 13:47:44',4,4,'提问4','回复4',4),(45,'2023-05-12 13:47:44',5,5,'提问5','回复5',5),(46,'2023-05-12 13:47:44',6,6,'提问6','回复6',6),(47,'2023-05-12 13:47:44',7,7,'提问7','回复7',7)
UNLOCK TABLES;

CREATE TABLE `storeup` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `userid` bigint(20) NOT NULL COMMENT '用户id',
  `refid` bigint(20) DEFAULT NULL COMMENT '收藏id',
  `tablename` varchar(200) DEFAULT NULL COMMENT '表名',
  `name` varchar(200) NOT NULL COMMENT '收藏名称',
  `picture` varchar(200) NOT NULL COMMENT '收藏图片',
  `inteltype` varchar(200) DEFAULT NULL COMMENT '推荐类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='收藏表';

LOCK TABLES `storeup` WRITE;
-- INSERT INTO `storeup` VALUES (51, '2023-05-12 13:47:44', 1, 1, 'article', '文章1', 'upload/storeup_picture1.jpg', '1', 'hot'),(52, '2023-05-12 13:47:44', 2, 2, 'article', '文章2', 'upload/storeup_picture2.jpg', '1', 'hot'),(53, '2023-05-12 13:47:44', 3, 3, 'article', '文章3', 'upload/storeup_picture3.jpg', '1', 'hot'),(54, '2023-05-12 13:47:44', 4, 4, 'article', '文章4', 'upload/storeup_picture4.jpg', '1', 'hot'),(55, '2023-05-12 13:47:44', 5, 5, 'article', '文章5', 'upload/storeup_picture5.jpg', '1', 'hot'),(56, '2023-05-12 13:47:44', 6, 6, 'article', '文章6', 'upload/storeup_picture1.jpg', '1', 'hot'),(57, '2023-05-12 13:47:44', 7, 7, 'article', '文章7', 'upload/storeup_picture7.jpg', '1', 'hot');
UNLOCK TABLES;

CREATE TABLE `news` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `title` varchar(200) NOT NULL COMMENT '标题',
  `introduction` longtext COMMENT '简介',
  `picture` varchar(200) NOT NULL COMMENT '图片',
  `content` longtext NOT NULL COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8 COMMENT='公告信息';

LOCK TABLES `news` WRITE;
INSERT INTO `news` VALUES (61,'2023-05-12 13:47:44','标题1','简介1','upload/news_picture1.jpg','内容1'),(62,'2023-05-12 13:47:44','标题2','简介2','upload/news_picture2.jpg','内容2'),(63,'2023-05-12 13:47:44','标题3','简介3','upload/news_picture3.jpg','内容3'),(64,'2023-05-12 13:47:44','标题4','简介4','upload/news_picture4.jpg','内容4'),(65,'2023-05-12 13:47:44','标题5','简介5','upload/news_picture5.jpg','内容5'),(66,'2023-05-12 13:47:44','标题6','简介6','upload/news_picture6.jpg','内容6'),(67,'2023-05-12 13:47:44','标题7','简介7','upload/news_picture7.jpg','内容7')
UNLOCK TABLES;

CREATE TABLE `discussbowenxinxi` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `refid` bigint(20) NOT NULL COMMENT '关联表id',
  `userid` bigint(20) NOT NULL COMMENT '用户id',
  `nickname` varchar(200) DEFAULT NULL COMMENT '用户名',
  `content` longtext NOT NULL COMMENT '评论内容',
  `reply` longtext COMMENT '回复内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8 COMMENT='博文信息评论表'; 

LOCK TABLES `discussbowenxinxi` WRITE;
INSERT INTO `discussbowenxinxi` VALUES (71,'2023-05-12 13:47:44',1,1,'用户名1','评论内容1','回复内容1'),(72,'2023-05-12 13:47:44',2,2,'用户名2','评论内容2','回复内容2'),(73,'2023-05-12 13:47:44',3,3,'用户名3','评论内容3','回复内容3'),(74,'2023-05-12 13:47:44',4,4,'用户名4','评论内容4','回复内容4'),(75,'2023-05-12 13:47:44',5,5,'用户名5','评论内容5','回复内容5'),(76,'2023-05-12 13:47:44',6,6,'用户名6','评论内容6','回复内容6'),(77,'2023-05-12 13:47:44',7,7,'用户名7','评论内容7','回复内容7');
UNLOCK TABLES;

