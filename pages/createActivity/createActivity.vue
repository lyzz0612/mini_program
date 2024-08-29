<template>
	<!-- createActivity.wxml -->
	<view class="container">
		<view class="input-section">
			<text class="label">活动名称</text>
			<input class="input-text" v-model="activityName" />
		</view>

		<view class="input-section">
			<text class="label">活动人数上限</text>
			<input class="max-part-input" type="number" v-model="maxParticipants">
		</view>

		<view class="prize-section">
			<view class="table-header">
				<text class="prize-type">次第</text>
				<text class="prize-name">奖品名称</text>
				<text class="prize-num">数量</text>
				<text class="prize-op">操作</text>
			</view>

			<block v-for="(item, index) in prizes" :key="index">
				<view class="table-row">
					<text class="prize-type">{{ item.type }}</text>
					<text class="prize-name">{{ item.name }}</text>
					<text class="prize-num">{{ item.amount }}</text>
					<view class="prize-op">
						<button type="warn" size="mini" class="remove-button" @tap="removePrize"
							:data-index="index">删除</button>
					</view>
				</view>
			</block>

			<view class="input-section">
				<view class="prize-type">
					<picker mode="selector" :range="prizeTypes" @change="onPickerChange">
						<view class="picker">
							{{ prizeType }}
						</view>
					</picker>
				</view>
				<input class="prize-input prize-name" placeholder="奖品名称" v-model="prizeName"/>
				<input class="prize-input prize-num" type="number" placeholder="数量" v-model="prizeAmount" />

				<view class="prize-op">
					<button type="primary" class="add-button" size="mini" @tap="addPrize">添加</button>
				</view>
			</view>
		</view>

		<view class="input-section">
			<button @tap="createActivity" class="save-button">创建活动</button>
			<button @tap="cloneActivity" class="clone-button">扫码复制</button>
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
		flex: 0 1 170rpx;
		align-items: center;
		margin-bottom: 10px;
		padding: 5px 0;
		text-align: center;
	}

	.prize-num {
		flex: 0 1 80rpx;
		align-items: center;
		margin-bottom: 10px;
		padding: 5px 0;
		text-align: center;
	}

	.prize-name {
		flex: 0 1 170rpx;
		align-items: center;
		margin-bottom: 10px;
		padding: 5px 0;
		text-align: center;
	}

	.prize-op {
		flex: 0 1 170rpx;
		align-items: center;
		margin-bottom: 10px;
		padding: 5px 0;
		text-align: center;
	}

	.add-button {
		margin-left: 10px;
	}

	.save-button {
		margin-left: 10px;
		padding: 5px 10px;
		width: 100px;
		background-color: #007aff;
		color: #fff;
		border: none;
		border-radius: 4px;
		font-size: 16px;
	}

	.clone-button {
		margin-left: 10px;
		padding: 5px 10px;
		width: 100px;
		background-color: indianred;
		color: #fff;
		border: none;
		border-radius: 4px;
		font-size: 16px;
	}

	.remove-button {
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
		min-height: 150px;
	}

	.table-header,
	.table-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.table-header {
		font-weight: bold;
		border-bottom: 1px solid #ccc;
	}

	.table-cell {
		flex: 1;
		text-align: center;
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
				prizeTypes: ['无', '一秀', '二举', '四进', '三红', '对堂', '状元'],
				activityName: '博饼活动',
				maxParticipants: 10,
				prizeName: '',
				prizeAmount: 1,
				prizeType: '一秀',
				prizes: [],
			}
		},
		onLoad() {
			// 页面启动的生命周期，这里编写页面加载时的逻辑
		},
		methods: {
			onPickerChange: function(e) {
				this.prizeType = this.prizeTypes[e.detail.value]
			},

			addPrize: function() {
				if (this.prizeName && this.prizeAmount) {
					this.prizes.push({
						name: this.prizeName,
						amount: this.prizeAmount,
						type: this.prizeType
					});
					this.prizeName = ''
				}
			},

			removePrize: function(e) {
				const { index } = e.currentTarget.dataset;				
				this.prizes.splice(index, 1);
			},
			newRandomId() {
				let id = Date.now().toString(20)
				id += Math.floor(Math.random() * 10000).toString(20)
				return id
			},
			createActivity: function() {
				if(this.prizes.length == 0) {
					uni.showToast({
						icon: "error",
						title: "请至少添加1种奖品"
					})
					return
				}
				if(this.maxParticipants <= 0) {
					uni.showToast({
						icon: "error",
						title: "人数上限至少为1"
					})
					return
				}
				const newActivity = {
					id: this.newRandomId(),
					activityName: this.activityName,
					maxParticipants: this.maxParticipants,
					participants: [],
					prizes: this.prizes,
					openid: this.$globals.openid || "anonymous",
					finished: false,
					records: []
				};
				this.$Utils.insertToDB("activitys", newActivity).then((result) => {
					newActivity["_id"] = result["_id"] 
					uni.setStorageSync(newActivity.id, newActivity);
					let activitys = uni.getStorageSync('activitys') || [];
					activitys.push({
						_id: newActivity["_id"],
						id: newActivity.id,
						activityName: newActivity.activityName,
						prizesNum: newActivity.prizes.length,
					})				
					uni.setStorageSync('activitys', activitys);
					uni.showToast({
						title: '活动保存成功',
						icon: 'success'
					});
					
					uni.redirectTo({
						url: `/pages/activityDetail/activityDetail?id=${newActivity.id}`
					});
				})

				
			},
			cloneActivity() {
				uni.scanCode({
					success: (res) => {
						let result = JSON.parse(res.result)
						uni.setClipboardData({
							data: res.result
						})
						this.activityName = result.activityName
						this.maxParticipants = result.maxParticipants
						this.$Utils.getFromDB("activitys", {id: result.id}).then((result_info) => {
							if(result_info) {
								this.prizes.length = 0
								for(let prize of result_info.prizes) {
									this.prizes.push(prize)
								}
							}
						})
					}
				})
			}
		},
	}
</script>