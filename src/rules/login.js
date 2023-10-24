formRules: {
    account: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 7, message: '长度必须大于6', trigger: 'change'}
    ],
    password: [
        { required: true, message: '验证码不能为空', trigger: 'change' },
        { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
    ],
}