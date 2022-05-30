<template>
	<view>
		<view class="search-box">
			<!-- 使用 uni-ui 提供的搜索组件 -->
			<uni-search-bar @input="input" :radius="100" :cancelButton="none" placeholder="请输入您要搜索的内容" :focus="true">
			</uni-search-bar>
		</view>

		<view class="goods-list">
			<view class="goods-item" v-for="(item,index) in searchResult" :key="index"
				@click="gotoDetail(item.goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>

				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器的 timerId
				timer: null,
				kw: '',
				searchResult: []

			};
		},
		methods: {
			input(e) {

				// 如果在连续输入，就清除掉延时器
				clearTimeout(this.timer);

				// 设置一个500毫秒的延时器
				this.timer = setTimeout(() => {
					// e=value
					console.info(e);
					this.kw = e;

					this.getSearchResult();
				}, 500)
			},

			async getSearchResult() {
				if (this.kw.length === 0) {
					this.searchResult = []
					return
				}

				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.kw
				})
				if (res.meta.status !== 200) {
					this.$util._showToast("请求错误")
				} else {
					this.searchResult = res.message;
				}

			},

			gotoDetail(goods_id) {
				uni.navigateTo({
					// 指定详情页面的 URL 地址，并传递 goods_id 参数
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-searchbar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		position: relative;
		padding: 16rpx;
		/* 将默认的 #FFFFFF 改为 #C00000 */
		background-color: #c00000;
	}

	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.goods-list {
		margin: 0 5px;

		.goods-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods-name {
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出部分隐藏
				overflow: hidden;
				// 文本溢出后，使用 ... 代替
				text-overflow: ellipsis;
				margin-right: 3px;
			}

		}
	}
</style>
