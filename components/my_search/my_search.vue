<template>
	<view class="my-search-container" :style="{'background-color': bg}">
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}" @click="searchBoxHandler">
			<uni-icons type="search"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my_search",
		props: {
			
			radius: {
				type: Number,
				default: 10
			},
			
			bg: {
				type: String,
				default: '#C00000'
			},

		},
		data() {
			return {

			};
		},
		methods:{
			//自定义点击事件
			searchBoxHandler(){
				// 触发外界通过 @click 绑定的 click 事件处理函数
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		width: 100%;
		// background-color: #C00000;
		height: 50px;
		display: flex;
		align-items: center;

		.my-search-box {
			height: 36px;
			background-color: #ffffff;
			// border-radius: 10px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 20rpx;

			.placeholder {
				font-size: 15px;
				margin-left: 5px;
			}
		}
	}
</style>
