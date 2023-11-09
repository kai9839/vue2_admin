import Mock from 'mockjs'

// 图表数据
let list = []
let PhoneSale = []
let userData = []
let phoneTypes = ['苹果', 'vivo', 'oppo', '魅族', '三星', '小米']
let weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

for (let i = 0; i < 7; i++) {
    list.push(
        Mock.mock({
            苹果: Mock.Random.float(100, 8000, 0, 0),
            vivo: Mock.Random.float(100, 8000, 0, 0),
            oppo: Mock.Random.float(100, 8000, 0, 0),
            魅族: Mock.Random.float(100, 8000, 0, 0),
            三星: Mock.Random.float(100, 8000, 0, 0),
            小米: Mock.Random.float(100, 8000, 0, 0)
        })
    )
}
phoneTypes.forEach(phone => {
    PhoneSale.push(
        Mock.mock({
            name: phone,
            todaySale: Mock.Random.float(100, 1000, 0, 0),
            monthSale: Mock.Random.float(1000, 8000, 0, 0),
            totalSale: Mock.Random.float(8000, 30000, 0, 0)
        })
    )
})
weeks.forEach(item => {
    userData.push({
        date: item,
        new: Mock.Random.float(0, 5, 0, 0),
        active: Mock.Random.float(20, 500, 0, 0)
    })
})

export default {
    getStatisticalData: () => {
        return {
            code: 20000,
            data: {
                // 饼图
                videoData: [
                    {
                        name: '苹果',
                        value: 6999
                    },
                    {
                        name: 'vivo',
                        value: 2999
                    },
                    {
                        name: 'oppo',
                        value: 3199
                    },
                    {
                        name: '魅族',
                        value: 2699
                    },
                    {
                        name: '三星',
                        value: 3099
                    },
                    {
                        name: '小米',
                        value: 3499
                    }
                ],
                // 柱状图
                userData,
                // 折线图
                orderData: {
                    date: ['20231021','20231022','20231023','20231024','20231025','20231026','20231027'],
                    data: list
                },
                PhoneSale
            }
        }
    }
}