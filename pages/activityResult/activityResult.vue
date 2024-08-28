<template>
	<view class="container">
		<view class="input-section">
			<text class="label">{{activityName}}</text>
		</view>

		<!-- 日志列表 -->
		<scroll-view class="records" :scroll-y="true" :scroll-with-animation="true">
			<view v-for="(item, index) in records" :key="index">
				第{{item.round}}轮{{ item.person }}掷出{{ item.prizeType }}，获得{{ item.prize }}
			</view>
		</scroll-view>
		<button class="btn-back" @tap="backToMain">返回主页面</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activityName: "",
				records: "",
			}
		},
		onLoad(options) {
			if (!options.id) {
				uni.showToast({
					title: "参数错误"
				})
				uni.redirectTo({
					url: "/pages/index/index"
				})
				return
			}
			// 假设在页面加载时，从服务器或本地存储中获取活动详情
			this.loadActivityDetail(options.id);
			this.finishActivity(options.id)
		},
		methods: {

			loadActivityDetail: function(id) {
				const activityDetail = uni.getStorageSync(id);

				if (!activityDetail) {
					uni.showToast({
						title: "找不到该活动"
					})
					uni.redirectTo({
						url: "/pages/index/index"
					})
					return
				}

				this.activityId = id
				this.activityName = activityDetail.activityName
				this.records = activityDetail.records
			},
			finishActivity(id) {
				let activitys = uni.getStorageSync('activitys') || [];
				let index = activitys.indexOf(id)
				if (index < 0) return
				activitys.splice(index, 1)
				uni.setStorageSync('activitys', activitys);
				uni.setClipboardData({
					data: JSON.stringify(this.records)
				})
			},
			backToMain()
			{
				uni.redirectTo({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style>

</style>