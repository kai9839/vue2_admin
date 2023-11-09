export default {
   state: {
      isCollapse: false, // 侧边菜单栏的展示状态
      tabsList: [
         {
            path: "/",
            name: 'home',
            label: '首页',
            icon: 's-home',
         },
      ], // 面包屑
   },
   mutations: {
      collapseMenu(state) {
         state.isCollapse = !state.isCollapse
      }
   }
}