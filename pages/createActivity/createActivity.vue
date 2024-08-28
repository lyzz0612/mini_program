<template>
    <!-- createActivity.wxml -->
    <view class="container">
        <view class="input-section">
            <text class="label">活动名称</text>
            <input class="input-text" :value="activityName" @input="bindInputActivityName" />
        </view>

        <view class="input-section">
            <text class="label">活动人数上限</text>
            <input class="max-part-input" type="number" :value="maxParticipants" @input="bindMaxParticipantsInput" />
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
                        <button type="warn" size="mini" class="remove-button" @tap="removePrize" :data-index="index">删除</button>
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
                <input class="prize-input prize-name" placeholder="奖品名称" :value="prizeName" @input="bindPrizeNameInput" />
                <input class="prize-input prize-num" type="number" placeholder="数量" :value="prizeQuantity" @input="bindPrizeQuantityInput" />

                <view class="prize-op">
                    <button type="primary" size="mini" @tap="addPrize">添加奖品</button>
                </view>
            </view>
        </view>

        <view class="input-section">
            <button @tap="saveActivityDetail" class="save-button">保存活动</button>
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
    padding: 5px 10px;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 10px;
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

.remove-button {
    /* 修改删除按钮的样式 */
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
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
