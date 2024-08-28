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
				<text>{{ item.prizes.length }}种</text>
				<button type="warn" size="mini" class="remove-button" :data-id="item.id"
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

	.activity-item text {
		flex: 1;
	}

	.remove-button {
		/* 修改删除按钮的样式 */
		margin-left: 10px;
		padding: 5px 10px;
		border: none;
		border-radius: 4px;
		font-size: 16px;
	}
</style>

<script>
	export default {
		data() {
			return {
				activities: [],
			}
		},
		onLoad() {
			// 页面启动的生命周期，这里编写页面加载时的逻辑
			this.loadActivities();
		},
		onShow() {
			// 页面启动的生命周期，这里编写页面加载时的逻辑
			this.loadActivities(); 
		},
		methods: {
			loadActivities() {
				this.activities.length = 0
				const activities = uni.getStorageSync('activitys') || [];
				for (let id of activities) {
					let activity = uni.getStorageSync(id)
					if(activity)
						this.activities.push(activity)
				}
			},
			viewActivity(event) {
				const id = event.currentTarget.dataset.id;
				uni.navigateTo({
					url: `/pages/activityDetail/activityDetail?id=${id}`,
				});
			},

			deleteActivity(event) {
				const id = event.currentTarget.dataset.id;
				let index = this.activities.findIndex((value) => value.id == id)
				if(index < 0) return
				this.activities.splice(index, 1)
				
				let activitys = uni.getStorageSync('activitys') || [];
				index = activitys.indexOf(id)
				if(index < 0) return
				activitys.splice(index, 1)
				uni.setStorageSync('activitys', activitys);
				uni.removeStorageSync(id)
				
				uni.showToast({
					title: '活动已删除',
					icon: 'success',
					duration: 2000,
				});
				
			},
		},
	}
</script>