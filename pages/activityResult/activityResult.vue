<template>
	<view class="container">
		<view class="input-section">
			<text class="result-label">{{activityName}}</text>
		</view>

		<!-- 日志列表 -->
		<scroll-view class="records" :scroll-y="true" :scroll-with-animation="true">
			<view v-for="(item, index) in records" :key="index">
				第{{item.round}}轮{{ item.person }}掷出{{ item.prizeType }}，获得{{ item.prize }}
			</view>
		</scroll-view>
		<button class="btn-back" type="primary" @tap="backToMain">返回主页面</button>
	</view>
</template>

<style>
	.container {
		padding: 10px;
	}

	.result-label {
		text-align: left;
		font-size: 26px;
	}

	.input-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		padding: 5px 0;
	}

	.btn-back {
		margin: 20rpx;
	}
</style>
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
				uni.reLaunch({
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
					uni.reLaunch({
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
				let finishedActivitys = uni.getStorageSync('finishedActivitys') || [];
				finishedActivitys.push(id)
				uni.setStorageSync('finishedActivitys', finishedActivitys);
			},
			backToMain() {
				uni.reLaunch({
					url: "/pages/index/index",

				})
			}
		}
	}
</script>