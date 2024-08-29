<template>
	<!-- activityList.wxml -->
	<view class="container">
		<block v-if="activities.length == 0">
			<view>
				<text>暂无活动</text>
			</view>
		</block>
		<block v-for="(item, index) in activities" :key="item.id">
			<view class="activity-item" :data-id="item.id" @tap="viewActivity">
				<text>{{ item.activityName }}</text>
				<text>{{ item.prizesNum }}种</text>
				<button type="primary" size="mini" class="share-button" :data-id="item.id"
					@tap.stop.prevent="shareActivity">分享活动</button>
				<button v-if="!isFinished" type="warn" size="mini" class="remove-button" :data-id="item.id"
					@tap.stop.prevent="deleteActivity">删除活动</button>
			</view>
		</block>
	</view>
</template>

<style>
	/* activityList.wxss */
	.container {
		padding: 20px;
	}

	.activity-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
		width: 100%;
		border: 1px solid #ccc;
		padding: 10px;
	}
	text {
		margin: 10px;
	}
	.activity-item {
		flex: 1;
	}

	.remove-button {
		/* 修改删除按钮的样式 */
		margin-left: 10px;
		border: none;
		border-radius: 4px;
		font-size: 16px;
	}
</style>

<script>
	export default {
		data() {
			return {
				isFinished: false,
				activityListType: "activitys",
				activities: [],
			}
		},
		onLoad(options) {
			// 页面启动的生命周期，这里编写页面加载时的逻辑
			let keyName = options.key || "activitys"
			this.activityListType = keyName
			this.loadActivities(keyName);
			this.isFinished = (keyName != "activitys")
		},
		onShow() {
			// 页面启动的生命周期，这里编写页面加载时的逻辑
			this.loadActivities(this.activityListType); 
		},
		methods: {
			loadActivities(key) {
				this.activities.length = 0
				const activities = uni.getStorageSync(key) || [];
				for (let activity of activities) {
					this.activities.push(activity)
				}
			},
			viewActivity(event) {
				const id = event.currentTarget.dataset.id;
				if(this.isFinished) {
					uni.navigateTo({
						url: `/pages/activityResult/activityResult?id=${id}`,
					});
				} else {
					uni.navigateTo({
						url: `/pages/activityDetail/activityDetail?id=${id}`,
					});
				}
			},

			deleteActivity(event) {
				const id = event.currentTarget.dataset.id;
				let index = this.activities.findIndex((value) => value.id == id)
				if(index < 0) return
				let activity = this.activities.splice(index, 1)[0]
				
				let activitys = uni.getStorageSync('activitys') || [];
				activitys.splice(index, 1)
				uni.setStorageSync('activitys', activitys);
				uni.removeStorageSync(id)
				this.$Utils.deleteFromDB("activitys", activity).then(() => {
					uni.showToast({
						title: '活动已删除',
						icon: 'success',
						duration: 2000,
					});		
				})
			
			},
			shareActivity(event) {
				const id = event.currentTarget.dataset.id;
				let index = this.activities.findIndex((value) => value.id == id)
				if(index < 0) return
				let activity = this.activities[index]
				uni.previewImage({
					urls: [`https://qrcode.tec-it.com/API/QRCode?data=${JSON.stringify(activity)}&backcolor=%23ffffff"`]
				})
			},
		},
	}
</script>