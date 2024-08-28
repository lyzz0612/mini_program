<template>
    <!-- index.wxml -->
    <view class="container">
        <button @tap="createActivity">创建博饼活动</button>
        <button @tap="activityList">查看活动</button>
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
			// 页面启动的生命周期，这里编写页面加载时的逻辑
		},
		methods: {
			createActivity: function () {
				uni.navigateTo({
					url: "/pages/createActivity/createActivity"
				})
			},
			activityList: function () {
				uni.navigateTo({
					url: "/pages/activityList/activityList"
				})
			},
		}
	}
</script>