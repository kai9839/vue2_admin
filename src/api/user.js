import request from "@/utils/request";

// 用户登录

export const login = (data) => {
    return request({
        method: 'POST',
        url: 'login',
        data
    })
}

// 获取用户信息
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/member/profile',
        // 后端要求把需要授权的用户身份放到请求头中
        // axios 可以通过 headers 选项设置请求头
        headers: {
            // 属性名和值都得看接口的要求
            // 属性名：Authorization，接口要求的
            // 属性值：Bearer空格token数据
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJpZFwiOlwiMTY3MTg2ODA3Nzg2NTcwMTM3OFwiLFwidXNlcm5hbWVcIjpcInVzZXIwMDFcIn0iLCJpYXQiOjE2OTgwNDUyMDEsImV4cCI6MTY5ODMwNDQwMX0.J0dFBBjdeR8MUNDzFZPiCyjK-V1Um7CGuSyVTblj-9U'
        }
    })
}