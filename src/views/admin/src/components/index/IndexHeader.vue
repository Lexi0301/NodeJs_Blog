<template>
	<div class="navbar" >
		<div class="title-menu">
			<div class="title-name">博客系统</div>
		</div>
		<div class="right-menu">
			<div class="user-info">{{this.$storage.get('role')}} {{this.$storage.get('adminName')}}</div>
			<div class="logout" @click="onLogout">退出登录</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ruleForm: {},
				user: {},
			};
		},
		mounted() {
			let sessionTable = this.$storage.get("sessionTable")
			this.$http({
				url: sessionTable + '/session',
				method: "get"
			}).then(({data}) => {
				if (data && data.code === 0) {
					this.user = data.data;
					this.$storage.set('userid',data.data.id);
				} else {
					let message = this.$message
					message.error(data.msg);
				}
			});
		},
		methods: {
			onLogout() {
				let storage = this.$storage
				let router = this.$router
				storage.clear()
				router.replace({
					name: "login"
				});
			},
		}
	};
</script>


<style lang="scss" scoped>
	.navbar {
		height: 60px;
		line-height: 60px;
		width: 100%;
		padding: 0 34px;
		box-sizing: border-box;
		background-color: #F56C6C !important;
		position: relative;
		z-index: 111;
		
		.right-menu {
			position: absolute;
			right: 34px;
			top: 0;
			height: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			z-index: 111;
			
			.user-info {
				font-size: 16px;
				color: #fff !important;
				background-color: #F56C6C !important;
				padding: 0 12px;
			}
			
			.logout {
				font-size: 16px;
				color: #fff !important;
				background-color: #F56C6C !important;
				padding: 0 12px;
				cursor: pointer;

				
                &:hover {
					background-color: #F56C6C !important;
                    color: #000 !important;
                }
			}
		}
		
		.title-menu {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			width: 100%;
			height: 100%;

			.title-name {
				color: #fff !important;
				font-size: 30px;
				font-weight: bold;
				margin-left: 20px;
			}
		}
	}
	
</style>
