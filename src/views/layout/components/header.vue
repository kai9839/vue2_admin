<template>
    <div class="header-container">
        <div class="header-left">
            <i class="collapseBtn" :class="{
                'el-icon-s-fold': isCollapse,
                'el-icon-s-unfold': !isCollapse
            }" @click="handleMenu"></i>
            <!-- <span class="text">首页</span> -->
            <el-breadcrumb separator="/" class="text">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
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
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            user: {},
        }
    },
    methods: {
        handleMenu() {
            this.$store.commit('collapseMenu')
        },
        onLogout() {
            this.$confirm('确认退出吗？', '退出提示', {
                confirmButtonText: '确认',
                cancelButtonClass: '取消',
                type: 'warning'
            }).then(() => {
                localStorage.removeItem('article_admin_system')
                this.$router.push('/login')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出'
                })
            })
        }
    },
    created() {
        this.user = this.$store.state.user.profile
    },
    computed: {
        isCollapse() {
            return this.$store.state.tab.isCollapse
        }
    }
}
</script>

<style lang="less" scoped>
.header-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;


    .header-left {
        display: flex;
        align-items: center;

        .el-breadcrumb__separator {
            color: white;
        }

        .collapseBtn {
            font-size: 20px;
        }
    }

    .text {
        margin-left: 10px;
    }

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

.el-breadcrumb {
    ::v-deep .el-breadcrumb__separator {
        color: white;
    }
}
</style>