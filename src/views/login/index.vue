<template>
    <div class="login-bg">
        <h2 class="logo">
            Logo
        </h2>
        <div class="login-container">
            <div class="login_left">
                <img class="login_pic" src="../../assets/img/a.png">
            </div>
            <div class="login_right">
                <h2>欢迎登录</h2>
                <el-form :model="user" :rules="formRules" ref="login-form" label-width="80px" :inline="false" size="normal">
                    <el-form-item prop="account">
                        <el-input v-model="user.account" placeholder="请输入您的用户名/手机号" clearable
                            prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="user.password" placeholder="请输入您的密码" show-password
                            prefix-icon="el-icon-unlock"></el-input>
                    </el-form-item>
                    <el-form-item prop="checked">
                        <el-checkbox v-model="user.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login_btn" type="primary" :loading="loginLoading" @click="onSubmit">登录</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>
    </div>
</template>

<script>
import { login } from '@/api/user'
export default {
    name: 'LoginIndex',
    data() {
        return {
            user: {
                account: '',
                password: '',
                checked: false,
            },
            checked: false, // 是否同意协议的选中状态,
            loginLoading: false,
            formRules: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'change' },
                    { min: 4, message: '长度必须大于4', trigger: 'submit' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'change' },
                    { min: 6, message: '长度必须大于6', trigger: 'submit' }
                ],
                checked: [
                    {
                        validator: (rule, value, callback) => {
                            if (value) {
                                callback()
                            } else {
                                callback(new Error('请同意用户协议'))
                            }
                        },
                        trigger: 'submit'
                    }
                ]
            }
        }
    },
    methods: {
        onSubmit() {
            // 表单检验
            this.$refs['login-form'].validate(valid => {
                if (!valid) {
                    return
                }

                // 检验通过，请求登录
                this.login()
            })
        },
        login() {
            this.loginLoading = true

            login(this.user).then(res => {
                this.$message({
                    message: '登录成功',
                    type: 'success'
                })
                this.$router.push({
                    name: 'home'
                })
                // 成功
                // 1. 存储信息
                const { id, account, nickname, avatar, token, mobile } = res.result
                // console.log(id, account, nickname, avatar, token, mobile)
                this.$store.commit('user/setUser', { id, account, nickname, avatar, token, mobile })
                // 登录成功
                this.loginLoading = false
            }).catch(err => {
                console.log('登录失败', err)
                this.$message.error('登录失败，账号或者密码错误')
                this.loginLoading = false
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login-bg {
    background: #fff url(@/assets/img/bg.png) no-repeat;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
        position: absolute;
        top: 0;
        left: 0;
    }

    .login-container {
        width: 60%;
        min-width: 1125px;
        height: calc(100%*9/16);
        border-radius: 80px 8px 80px 8px;
        background-color: #fff;
        display: flex;

        .login_left {
            width: 60%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .login_pic {
                width: 492px;
                height: 344.39px;
                background-position: no-repeat;
            }
        }

        .login_right {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>
