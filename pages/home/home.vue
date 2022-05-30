<template>
	<view class="container">
		<!-- 使用自定义属性 -->
		<!-- <my_search :radius=5 :bg="'#ff00ff'"></my_search> -->

		<view class="search-area">
			<my_search @click="searchClick"></my_search>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">

			<swiper-item v-for="(item, i) in swiperData" :key="i">
				<!-- <view class="swiper-item">
				  <image :src="item.image_src"></image>
				</view> -->
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<!-- 动态绑定图片的 src 属性 -->
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>

		</swiper>

		<view class="navData">
			<view v-for="(item,index) in navData" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src" class="navItemImage"></image>
			</view>
		</view>

		<view class="floordata">

			<view class="floor-item" v-for="(item,index) in floordata" :key="index">
				<!-- title -->
				<image class="floordataTitle" :src="item.floor_title.image_src"></image>

				<!-- 楼层图片区域，分为左右结构 -->
				<view class="floor-img-box">
					<!-- 左侧大图片的盒子 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧 4 个小图片的盒子 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2"
							v-if="i2 !== 0" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}">
							</image>
						</navigator>
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数据
				swiperData: [],
				// 分类框数据
				navData: [],
				// 楼层数据
				floordata: []
			};
		},
		onLoad() {

			// this.getData()
			this.getSwiperData()
			this.getNavData()
			this.getFloordata()
		},
		methods: {

			async getSwiperData() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				console.log(res)
				console.log(res.message)
				console.log(res.meta)
				if (res.meta.status !== 200) {
					this.$util._showToast("请求错误")
				} else {
					this.swiperData = res.message;
				}
			},

			async getNavData() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) {
					this.$util._showToast("请求错误")
				} else {
					this.navData = res.message;
				}
			},

			async getFloordata() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata');
				if (res.meta.status !== 200) {
					this.$util._showToast("请求错误")
				} else {

					// 对要跳转的页面url进行修改处理
					var data = res.message;
					data.forEach(floor => {
						floor.product_list.forEach(prod => {
							prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split(
								'?')[1]
						})
					})

					this.floordata = res.message;
					console.log("floordata", this.floordata)
				}
			},

			getData() {
				var that = this;
				uni.request({
					url: "https://geoapi.qweather.com/v2/city/lookup?location=shenzhen&key=4f27ec65289e43bab0a934a74f49f681",
					method: "GET",
					header: {
						"content-type": "application/json"
					},
					success: function(res) {
						console.log(res);
						that.locationData = res.data.location;
						console.log(that.locationData)
					}
				})
			},
			navClickHandler(item) {
				console.log(item)
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				} else {
					this.$util._showToast(item.name)
				}
			},
			searchClick() {
				console.info("点击了");
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.navData {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.navItemImage {
			width: 128rpx;
			height: 140rpx;
		}
	}


	.floordataTitle {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;
	}

	.search-area {
		// 设置定位效果为“吸顶”
		position: sticky;
		// 吸顶的“位置”
		top: 0;
		// 提高层级，防止被轮播图覆盖
		z-index: 999;
	}
</style>
