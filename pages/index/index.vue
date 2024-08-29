<template>
    <!-- index.wxml -->
    <view class="container">
        <button @tap="createActivity">创建博饼活动</button>
        <button @tap="activityList">查看活动</button>
        <button @tap="finishedActivityList">查看已结束活动</button>
    </view>
</template>

<style>
/* index.wxss */
.container {
    padding: 20px;
}
.user-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}
button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
}
</style>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			uni.showLoading({
				title: "登录中"
			})
			this.$Utils.login().then((result) => {
				console.log("login result", result)
				uni.hideLoading()
				this.$globals.openid = result.openid || "anonymous"
				this.$Utils.getFromDB("activitys", {openid: this.$globals.openid}).then((results) => {
					let activitys = []
					let finishedActivitys = []
					for(let activity of results) {
						uni.setStorageSync(activity.id, activity)
						if(activity.finished) {
							finishedActivitys.push({													_id: activity._id,
								id: activity.id,
								activityName: activity.activityName,
								prizesNum: activity.prizes.length,
							})
						} else {
							activitys.push({															_id: activity._id,
								id: activity.id,
								activityName: activity.activityName,
								prizesNum: activity.prizes.length,
							})
						}
					}
					uni.setStorageSync("activitys", activitys)
					uni.setStorageSync("finishedActivitys", finishedActivitys)
				})
			})
		},
		methods: {
			createActivity: function () {
				uni.navigateTo({
					url: "/pages/createActivity/createActivity"
				})
			},
			activityList: function () {
				uni.navigateTo({
					url: "/pages/activityList/activityList?key=activitys"
				})
			},
			finishedActivityList: function () {
				uni.navigateTo({
					url: "/pages/activityList/activityList?key=finishedActivitys"
				})
			},
		}
	}
</script>