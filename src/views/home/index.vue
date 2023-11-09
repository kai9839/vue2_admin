<template>
    <div class="home-container">
        <el-row :gutter="20">
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
                    <el-table :data="tableData" style="width: 100%" height="350px">
                        <el-table-column fixed prop="name" label="品牌">
                        </el-table-column>
                        <el-table-column prop="todaySale" label="今日销售">
                        </el-table-column>
                        <el-table-column prop="monthSale" label="本月销售">
                        </el-table-column>
                        <el-table-column prop="totalSale" label="总销售">
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
                <el-card style="height: 280px;">
                    <div ref="lineChart" style="height: 280px"></div>
                    <!-- <div id="main" ref="lineChart" style="width: 600px;height:400px;"></div> -->
                </el-card>
                <div class="graph">
                    <el-card style="height: 260px;">
                        <div ref="barChart" style="height: 260px"></div>
                    </el-card>
                    <el-card>
                        <div ref="pieCharts" style="height: 260px;"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getUserProfile, getData } from '@/api/user'
import * as echarts from 'echarts'
export default {
    name: 'HomeIndex',
    data() {
        return {
            user: {},
            currentDate: new Date(),
            tableData: [],
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
            ],
        }
    },
    methods: {
        drawLineChart(orderData) {
            const legendData = Object.keys(orderData.data[0])
            const seriesData = []
            legendData.forEach(key => {
                seriesData.push({
                    name: key,
                    type: 'line',
                    data: orderData.data.map(item => item[key])
                })
            })
            // 指定图表的配置项和数据
            var option = {
                // title: {
                //     text: 'ECharts 入门示例'
                // },
                tooltip: {},
                legend: {
                    data: Object.keys(orderData.data[0])
                },
                xAxis: {
                    data: orderData.date
                },
                yAxis: {},
                series: seriesData
            };
            // 使用刚指定的配置项和数据显示图表。
            this.charts[0].setOption(option);
            // this.lineChart.hideLoading();
        },
        drawBarCharts(userData) {
            // 指定图表的配置项和数据
            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '20%'
                },
                legend: {
                    data: ['新增用户', '活跃用户']
                },
                xAxis: {
                    data: userData.map(item => item.date)
                },
                yAxis: {},
                series: [
                    {
                        name: '新增用户',
                        type: 'bar',
                        data: userData.map(item => item.new)
                    },
                    {
                        name: '活跃用户',
                        type: 'bar',
                        data: userData.map(item => item.active)
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            this.charts[1].setOption(option);
            // this.barChart.hideLoading();
        },
        drawPieCharts(videoData) {
            const option = {
                tooltip: {},
                series: [
                    {
                        type: 'pie',
                        data: videoData,
                        label: {
                            show: true,
                            formatter: '{b}: {d}%'
                        },
                        radius: ['40%', '60%']
                    }
                ],
            }
            this.charts[2].setOption(option)
            // this.pieCharts.hideLoading();
        }
    },
    created() {
        getUserProfile().then(res => {
            this.user = res.result
        })
    },
    mounted() {
        // 定义要渲染图表的 DOM 元素引用
        const refs = ['lineChart', 'barChart', 'pieCharts'].map(ref => this.$refs[ref]);
        // 显示loading动画
        this.charts = refs.map(ref => {
            const chart = echarts.init(ref);
            chart.showLoading();
            return chart;
        });
        getData().then(({ data }) => {
            const { orderData, userData, videoData } = data
            this.tableData = data.PhoneSale

            this.drawLineChart(orderData)
            this.drawBarCharts(userData)
            this.drawPieCharts(videoData)
        })
        this.charts.forEach(chart => chart.hideLoading());
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
                font-size: 14px;
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

    .el-card {
        width: 30%;
        margin-bottom: 20px;
    }
}

.userCard {
    margin-bottom: 20px;
}

.graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .el-card {
        height: 260px;
        width: 46%;

    }
}
</style>