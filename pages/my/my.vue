<template>
	<view class="container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		  <!-- 循环渲染轮播图的 item 项 -->
		  <swiper-item v-for="(item, i) in swiperList" :key="i">
			<view class="swiper-item">
			  <!-- 动态绑定图片的 src 属性 -->
			  <image :src="item.image_src"></image>
			</view>
		  </swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: []
			};
		},
		onLoad() {
			// this.getSwiperList();
		},
		methods: {
			
			// 3. 获取轮播图数据的方法
			async getSwiperList() {
			  // 3.1 发起请求
			  const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
			  // 3.2 请求失败
			  if (res.meta.status !== 200) {
				return uni.showToast({
				  title: '数据请求失败！',
				  duration: 1500,
				  icon: 'none',
				})
			  }
			  // 3.3 请求成功，为 data 中的数据赋值
			  this.swiperList = res.message
			},
			
			// 发送请求
			// getSwiperList() {
			// 	var that = this;
			// 	uni.request({
			// 		url: "https://www.uinav.com/api/public/v1/home/swiperdata",
			// 		method: "GET",
			// 		header: {
			// 			"content-type": "application/json"
			// 		},
			// 		success: function(res) {
			// 			console.log(res.data);
			// 			if (res.data.meta.status === 200) {
			// 				that.swiperList = res.data.message;
			// 				console.log(that.swiperList)
							
			// 			} else {
			// 				that._showToast("网络错误");
			// 			}
			// 		}
			// 	})
			// },
			_showToast(msg) {
				uni.showToast({
					title: msg,
					icon: 'none',
					duration: 2000
				});
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
</style>
