<template>
    <!-- activityList.wxml -->
    <view class="container">
        <block v-for="(item, index) in activities" :key="item.id">
            <view class="activity-item" :data-id="item.id" @tap="viewActivity">
                <text>{{ item.activityName }}</text>
                <text>{{ item.prizes.length }}种</text>
                <button type="warn" size="mini" class="remove-button" :data-id="item.id" @tap.stop.prevent="deleteActivity">删除活动</button>
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
