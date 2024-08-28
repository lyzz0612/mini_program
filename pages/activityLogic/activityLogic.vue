<template>
    <view class="container">
        <!-- 当前正在博饼的人 -->
        <view class="current-person">{{ currentPerson }}正在博饼</view>

        <!-- 奖项类别单选列表 -->
        <radio-group class="prize-category" @change="onPrizeCategoryChange">
            <label class="category-item" v-for="(prizeType, index) in prizeTypes" :key="index">
                <radio :value="prizeType" :checked="prizeType === selectedPrizeType">{{ prizeType }}</radio>
            </label>
        </radio-group>

        <!-- 根据奖项类型筛选后的奖项列表 -->
        <radio-group class="prize-list" @change="onPrizeSelect">
            <label class="prize-item" v-for="(prize, index) in filteredPrizes" :key="prize.name">
                <radio :disabled="prize.amount == 0" :value="prize.name" :checked="prize.name === selectedPrize">{{ prize.name }} x {{ prize.amount }}</radio>
            </label>
        </radio-group>
        <button class="save-btn" type="primary" @tap="saveResult">保存结果</button>

        <!-- 参与者列表 -->
        <scroll-view class="participants" :scroll-y="true" :scroll-with-animation="true">
            <view :class="'participant ' + (person === currentPerson ? 'highlight' : '')" v-for="(person, index) in participants" :key="index">{{ index + 1 }}. {{ person }}</view>
        </scroll-view>

        <!-- 日志列表 -->
        <scroll-view class="logs" :scroll-y="true" :scroll-with-animation="true">
            <view v-for="(item, index) in logs" :key="index">{{ item.person }}掷出{{ item.prizeType }}获得{{ item.prize }}</view>
        </scroll-view>
    </view>
</template>

<style>
/* 样式设置 */
.container {
    padding: 10px;
}

.current-person {
    font-size: 24px;
    margin: 20px 0;
}

.prize-category {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: left;
    background-color: #f9f9f9;
}
.category-item,
radio {
    margin: 5px 10px;
    width: 100px;
}

.prize-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    background-color: #f9f9f9;
    margin: 10px;
}
.prize-item,
radio {
    margin: 5px 10px;
    width: 150px;
}

.participants {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    width: 100%;
    margin-top: 20px;
}

.participant {
    padding: 10px;
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
