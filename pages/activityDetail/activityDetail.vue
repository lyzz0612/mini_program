<template>
	<view class="container">
		<view class="input-section">
			<text class="label">活动名称</text>
			<input disabled class="input-text" :value="activityName" />
		</view>

		<view class="input-section">
			<text class="label">活动人数上限</text>
			<input disabled class="max-part-input" :value="maxParticipants" />
		</view>

		<!-- 奖品列表（只读，不可修改） -->

		<view class="prize-section">
			<view class="table-header">
				<text class="prize-type">次第</text>
				<text class="prize-name">奖品名称</text>
				<text class="prize-num">数量</text>
			</view>

			<block v-for="(item, index) in prizes" :key="index">
				<view class="table-row">
					<text class="prize-type">{{ item.type }}</text>
					<text class="prize-name">{{ item.name }}</text>
					<text class="prize-num">{{ item.amount }}</text>
				</view>
			</block>
		</view>

		<!-- 参与者展示列表（表格样式） -->
		<view class="participant-section">
			<view class="table-header participant-header">
				<text class="table-cell">参与者名称</text>
				<text class="table-cell">操作</text>
			</view>
			<view class="table-row" v-for="(item, index) in participants" :key="index">
				<text class="table-cell">{{ item }}</text>

				<button type="warn" size="mini" class="remove-button" :data-index="index"
					@tap="removeParticipant">移除</button>
			</view>

			<!-- 参与者表格输入 -->
			<view v-if="participants.length < maxParticipants" class="table-row">
				<input class="input-text participant-name" placeholder="请输入参与者名称" v-model="newParticipantName" />
				<button size="mini" type="primary" class="add-button" @tap="addParticipant">添加</button>
			</view>
		</view>

		<view class="input-section">
			<button class="save-btn" type="warn" @tap="saveActivity">保存</button>		
			<button class="start-btn" type="primary" @tap="startActivity">开始博饼</button>		
			</view>
	</view>
</template>

<style>
	/* createActivity.wxss */
	.container {
		padding: 10px;
	}
	
	.input-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		padding: 5px 0;
	}

	.label {
		width: 100px;
		text-align: left;
		font-size: 16px;
	}

	.input-text,
	.prize-input,
	.max-part-input {
		flex: 1;
		margin-left: 10px;
		padding: 5px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 16px;
	}

	.prize-type {
		align-items: center;
		margin-bottom: 10px;
		padding: 5px 0;
		text-align: center;
	}

	.prize-num {
		align-items: center;
		margin-bottom: 10px;
		padding: 5px 0;
		text-align: center;
	}

	.prize-name {
		align-items: center;
		margin-bottom: 10px;
		padding: 5px 0;
		text-align: center;
	}

	.add-button {
		margin-left: 10px;
		padding: 5px 10px;
		color: #fff;
		border: none;
		border-radius: 4px;
		font-size: 10px;
	}

	.start-btn {
		margin: 10px;
		text-align: center;
		width: 100px;
	}
	.save-btn {
		margin: 10px;
		text-align: center;
		width: 100px;
	}

	.remove-button {
		/* 修改删除按钮的样式 */
		margin-left: 10px;
	}
	.add-button {
		/* 修改删除按钮的样式 */
		margin-left: 10px;
	}

	.picker {
		border: 1px solid #ddd;
		padding: 20rpx;
		border-radius: 5rpx;
	}

	/* 奖品列表样式 */
	.prize-section {
		background-color: #f9f9f9;
		padding: 10px;
		border-radius: 5px;
		min-width: 280px;
		min-height: 150px;
	}

	.table-header,
	.table-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 5px;
	}

	.table-header {
		font-weight: bold;
		border-bottom: 1px solid #ccc;
	}

	.table-cell {
		flex: 1;
		text-align: center;
	}


	.participant-section {
		background-color: #f9f9f9;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		min-width: 280px;
		min-height: 150px;
	}

	.participant-header {
		margin-bottom: 10px;
	}

	.participant-name {
		width: 100px;
		margin-right: 10px;
	}

	.table-header-text {
		flex: 1;
		text-align: center;
	}
</style>
<script>
	export default {
		data() {
			return {
				activityId: '',
				activityName: '',
				participants: [],
				maxParticipants: 10,
				prizes: [],
				newParticipantName: ''
			}
		},
		onLoad(options) {
			if(!options.id) {
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
				this.maxParticipants = activityDetail.maxParticipants
				this.participants = activityDetail.participants
				this.prizes = activityDetail.prizes
			},
			addParticipant: function() {
				if (this.newParticipantName) {
					this.participants.push(this.newParticipantName)
					this.newParticipantName = ""
				} else {
					uni.showToast({
						title: '请输入参与者名称',
						icon: 'none'
					});
				}
			},

			removeParticipant: function(e) {
				const {
					index
				} = e.currentTarget.dataset;
				this.participants.splice(index, 1);
			},

			startActivity: function() {
				if(this.participants.length == 0) {					
					uni.showToast({
						icon: "error",
						title: "请至少添加1位参与者"
					})
					return
				}
				// 启动活动逻辑
				const id = this.activityId;
				let activityDetail = uni.getStorageSync(id);
				activityDetail.participants = this.participants;
				uni.setStorageSync(id, activityDetail);
				this.$Utils.saveToDB("activitys", activityDetail)
				uni.redirectTo({
					url: `/pages/activityLogic/activityLogic?id=${id}`,
				});
			},
			saveActivity: function() {
				// 启动活动逻辑
				const id = this.activityId;
				let activityDetail = uni.getStorageSync(id);
				activityDetail.participants = this.participants;
				uni.setStorageSync(id, activityDetail);
				
				this.$Utils.saveToDB("activitys", activityDetail).then(() => {
					uni.showToast({
						title: '保存成功',
						icon: 'none'
					});
					
				})
			}
		}
	}
</script>