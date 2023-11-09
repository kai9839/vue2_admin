<template>
    <el-container class="layout-container">
        <el-aside class="aside" width="auto">
            <AppAside class="aside-menu"/>
        </el-aside>
        <el-container>
            <el-header class="header">
                <AppHeader />
            </el-header>
            <AppTags />
            <el-main class="main">
                <!-- 子路由出口 -->
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>
  
<script>
import AppAside from './components/aside'
import AppHeader from './components/header'
import AppTags from '@/components/Tag.vue'
export default {
    name: 'LayoutIndex',
    components: {
        AppAside,
        AppHeader,
        AppTags
    },
    data() {
        return {
            user: {},
        }
    },
    created() {
        this.user = this.$store.state.user.profile
    },
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
}

.main {
    background-color: #e9eef3;
}
</style>