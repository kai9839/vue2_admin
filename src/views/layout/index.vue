<template>
    <el-container class="layout-container">
        <el-aside class="aside" width="auto">
            <AppAside class="aside-menu" :is_Collapse="isCollapse" />
        </el-aside>
        <el-container>
            <el-header class="header">
                <div class="header-container">
                    <div>
                        <i :class="{
                            'el-icon-s-fold': isCollapse,
                            'el-icon-s-unfold': !isCollapse
                        }"
                        @click="isCollapse = !isCollapse"
                        ></i>
                    </div>
                    <el-dropdown>
                        <div class="avatar-wrap">
                            <img class="avatar" :src="user.avatar" alt="">
                            <span>{{ user.nickname }}</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>设置</el-dropdown-item>
                            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main class="main">
                <!-- 子路由出口 -->
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>
  
<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
export default {
    name: 'LayoutIndex',
    components: {
        AppAside,
    },
    data() {
        return {
            user: {},
            isCollapse: false // 侧边菜单栏的展示状态
        }
    },
    created() {
        this.loadUserProfile()
    },
    methods: {
        loadUserProfile() {
            getUserProfile().then(res => {
                this.user = res.result
            })
        },
        onLogout(){
            this.$confirm('确认退出吗？', '退出提示', {
                confirmButtonText: '确认',
                cancelButtonClass: '取消',
                type: 'warning'
            }).then(() => {
                console.log(localStorage.getItem('article_admin_system'))
                localStorage.removeItem('article_admin_system')
                this.$router.push('/login')
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消退出'
                })
            })
        }
    }
}
</script>
  
<style scoped lang="less">
.layout-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.header {
    background-color: #b3c0d1;

    .header-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;

        .avatar-wrap {
            display: flex;
            align-items: center;

            .avatar {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }
    }
}

.main {
    background-color: #e9eef3;
}
</style>