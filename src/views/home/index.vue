<template>
    <div class="home-container">
        <el-row>
            <el-col :span="8">
                <el-card class="userCard" :body-style="{ padding: '0px' }">
                    <div class="user">
                        <img :src="user.avatar" class="avatar">
                        <div class="userInfo">
                            <div class="nickname">{{ user.nickname }}</div>
                            <p>超级管理员</p>
                        </div>
                    </div>
                    <hr />
                    <div style="padding: 14px;">
                        <span>好吃的汉堡</span>
                        <div class="bottom clearfix">
                            <time class="time">{{ currentDate }}</time>
                        </div>
                    </div>
                </el-card>
                <el-card style="height: 460px;">
                    <el-table :data="tableData" style="width: 100%" height="250">
                        <el-table-column fixed prop="date" label="日期" width="150">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="120">
                        </el-table-column>
                        <el-table-column prop="province" label="省份" width="120">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16">
                <div class="num">
                    <el-card v-for="(item, key) in countData" :key="key" :body-style="{ display: 'flex' }">
                        <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                        <div class="detail">
                            <p class="price">￥{{ item.value }}</p>
                            <p class="desc">{{ item.name }}</p>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getUserProfile, getData } from '@/api/user'
export default {
    name: 'HomeIndex',
    data() {
        return {
            user: {},
            currentDate: new Date(),
            tableData: [
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                },
                {
                    date: '2016-05-03',
                    name: '李小虎',
                    province: '北京',
                },
                {
                    date: '2016-05-03',
                    name: '陈小虎',
                    province: '广州',
                },
                {
                    date: '2016-05-03',
                    name: '林小虎',
                    province: '深圳',
                },

            ],
            countData: [
                {
                    name: '今日支付订单',
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9"
                },
                {
                    name: '今日收藏订单',
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980"
                },
                {
                    name: '今日未支付订单',
                    value: 110,
                    icon: "s-goods",
                    color: "#5ab1ef"
                },
                {
                    name: '本月支付订单',
                    value: 8234,
                    icon: "success",
                    color: "#2ec7c9"
                },
                {
                    name: '本月收藏订单',
                    value: 1110,
                    icon: "star-on",
                    color: "#ffb980"
                },
                {
                    name: '本月未支付订单',
                    value: 2110,
                    icon: "s-goods",
                    color: "#5ab1ef"
                },
            ]
        }
    },
    methods: {
        loadUserProfile() {
            getUserProfile().then(res => {
                this.user = res.result
            })
            getData().then(res=>{
                
            })
        }
    },
    created() {
        this.loadUserProfile()
    }
}
</script>

<style lang="less" scoped>
.home-container {
    .el-card {
        padding: 10px;
        .user {
            display: flex;
            align-items: center;

            .avatar {
                border-radius: 50%;
                margin-right: 40px;
            }

            .userInfo {
                .nickname {
                    font-size: 30px;
                    margin-bottom: 5px;
                }

                p {
                    color: #999;
                }
            }

        }

        .icon {
            width: 80px;
            height: 80px;
            font-size: 30px;
            color: white;
            text-align: center;
            line-height: 80px;
        }

        .detail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 15px;

            .price {
                font-size: 30px;
                margin-bottom: 4px;
                line-height: 30px;
                height: 30px;
            }

            .desc {
                font-size: 4px;
                color: #999;
                text-align: center;
            }
        }
    }
}
.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 15px;
    .el-card {
        width: 30%;
        margin-bottom: 20px;
    }
}
.userCard {
    margin-bottom: 20px;
}
</style>