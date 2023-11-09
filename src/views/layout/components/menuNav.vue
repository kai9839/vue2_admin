<template>
    <div class="navMenu">
        <template v-for="item in menuData">
            
            <el-menu-item v-if="!item.children" :index="item.path">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>

            <el-submenu v-else :index="item.path">
                <template slot="title">
                    <i :class="'el-icon-' + item.icon"></i>
                    <span>{{ item.label }}</span>
                </template>
                <menuNav :menuData="item.children"></menuNav>
            </el-submenu>
        </template>
    </div>
</template>

<script>
export default {
    name: 'menuNav',
    props: ['menuData'],
}
</script>

<style lang="less" scoped></style>