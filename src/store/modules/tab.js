export default {
 state: {
    isCollapse: false // 侧边菜单栏的展示状态
 },
 mutations: {
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse
    }
 }
}