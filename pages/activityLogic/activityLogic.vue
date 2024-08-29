<template>
	<view class="container">
		<!-- 当前正在博饼的人 -->
		<view class="round-title">第{{round}}轮</view>
		<view class="current-person">{{ currentPerson }}</view>

		<!-- 奖项类别单选列表 -->
		<radio-group class="prize-category" @change="onPrizeCategoryChange">
			<label class="category-item" v-for="(prizeType, index) in prizeTypes" :key="index">
				<radio :value="prizeType" :checked="prizeType === selectedPrizeType">{{ prizeType }}</radio>
			</label>
		</radio-group>

		<!-- 根据奖项类型筛选后的奖项列表 -->
		<radio-group class="prize-list" @change="onPrizeSelect">
			<label class="prize-item" v-for="(prize, index) in filteredPrizes" :key="prize.name">
				<radio :disabled="prize.amount == 0" :value="prize.name" :checked="prize.name === selectedPrize">
					{{ prize.name }} x {{ prize.amount }}
				</radio>
			</label>
		</radio-group>
		<button class="save-btn" type="primary" @tap="saveResult">保存结果</button>

		<!-- 参与者列表 -->
		<view class="participants">
			<view :class="'participant ' + (person === currentPerson ? 'highlight' : '')" v-for="(person, index) in participants" :key="index">{{ index + 1 }}. {{ person }}</view>
		</view>

		<!-- 日志列表 -->
		<scroll-view class="records" :scroll-y="true" :scroll-with-animation="true">
			<view v-for="(item, index) in records" :key="index">
				第{{item.round}}轮{{ item.person }}掷出{{ item.prizeType }}获得{{ item.prize }}
			</view>
		</scroll-view>
	</view>
</template>

<style>
	/* 样式设置 */
	.container {
		padding: 10px;
	}

	.round-title {
		font-size: 24px;
		text-align: center;
	}
	.current-person {
		font-size: 24px;	
		color: chocolate;
		text-align: center;
	}

	.prize-category {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		justify-content: left;
		background-color: #f9f9f9;
	}

	.category-item, radio {
		margin: 5px 10px;
		width: 80px;
	}

	.prize-list {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		justify-content: center;
		background-color: #f9f9f9;
		margin: 10px;
	}

	.prize-item, radio {
		margin: 5px 10px;
		width: 150px;
	}

	.participants {
		display: flex;
		flex-wrap: wrap;
		justify-content: left;
		width: 100%;
		margin-top: 20px;
		background-color: beige;
		padding: 5px;
	}

	.participant {
		padding: 2px;
		margin: 0 10px;
	}

	.highlight {
		background-color: #fdd835;
		border-radius: 5px;
	}

	.save-btn {
		margin-top: 20px;
	}
</style>


<script>
	export default {
		data() {
			return {
				prizeTypes: ['无', '一秀', '二举', '四进', '三红', '对堂', '状元'],
				activityId: '',
				round: 1,
				activityName: '',
				participants: [],
				prizes: [],
				currentPerson: '',
				selectedPrizeType: '无',
				selectedPrize: '无',
				records: []
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
		computed: {
			filteredPrizes: function() {
				let filterdPrizes = this.prizes.filter(prize => prize.type === this.selectedPrizeType);
				filterdPrizes.unshift({
					"name": "无",
					"amount": 1000
				})
				return filterdPrizes;
			}
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
				this.participants = activityDetail.participants || []
				this.prizes = activityDetail.prizes
				this.currentPerson = this.participants[0]
			},

			onPrizeCategoryChange: function(event) {
				this.selectedPrizeType = event.detail.value;
				this.selectedPrize = "无"
			},
			onPrizeSelect: function(event) {
				this.selectedPrize = event.detail.value;
			},
			saveResult() {
				this.records.push({
					"person": this.currentPerson,
					"prize": this.selectedPrize,
					"prizeType": this.selectedPrizeType,
					"round": this.round,
				})
				let prizeList= this.prizes.filter((value) => value.name == this.selectedPrize)
				if(prizeList.length > 0)
					prizeList[0].amount -= 1 
				
				let canSelectPrize = this.prizes.filter((value) => value.amount > 0)
				if(canSelectPrize.length == 0) {
					uni.showModal({
						content: "所有奖品都已经领完",
						showCancel: false,
						success: () => {
							
							let activityDetail = uni.getStorageSync(this.activityId);
							activityDetail.records = this.records
							activityDetail.finished = true
							uni.setStorageSync(this.activityId, activityDetail)
							
							this.$Utils.saveToDB("activitys", activityDetail).then(() => {
								uni.redirectTo({
									url: `/pages/activityResult/activityResult?id=${this.activityId}`
								})
							})
						}
					})
					return
				}
				let old_index = this.participants.indexOf(this.currentPerson)
				let new_index = (old_index + 1) % this.participants.length
				if(new_index == 0) {
					this.round += 1
				}
				this.currentPerson = this.participants[new_index],
				this.selectedPrizeType = '无'
				this.selectedPrize = "无"
			}
		}
	}
</script>