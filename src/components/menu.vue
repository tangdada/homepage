<template>
  <div class="menu tc shadow">
    <span class="menu-item" :class="{'on': activeMenu('home')}" @click="clickMenu('home')">医院首页</span>
    <span class="menu-item" :class="{'on': activeMenu('structure')}" @click="clickMenu('structure')">基本布局</span>
    <span class="menu-item" :class="{'on': activeMenu('implement')}" @click="clickMenu('implement')">实施方案</span>
    <span class="menu-item" :class="{'on': activeMenu('quality')}" @click="clickMenu('quality')">服务质量</span>
    <span class="menu-item" :class="{'on': activeMenu('employee')}" @click="clickMenu('employee')">人员情况</span>
    <span class="menu-item" :class="{'on': activeMenu('bookinline')}" @click="clickMenu('bookinline')">在线预约</span>
  </div>
</template>

<script>

export default {
  name: 'mt-menu',
  data() {
    return {
      currentTab: 'home'
    }
  },
  methods: {
    clickMenu(menu) {
      this.currentTab = menu;
      this.$router.push('/' + menu)
    },

    activeMenu(menu) {
      return this.currentTab == menu;
    },
  },

  mounted() {
  },

  watch: {
  },

  mounted() {
    this.currentTab = this.$route.path.replace('/', '')
  }
}
</script>

<style lang="less">
.menu {
  border-bottom: 1px solid #eee;
  // margin-bottom: 10px;
  font-size: 16px;
  &-item {
    display: inline-block;
    text-align: center;
    padding: 20px;
    width: 110px;
    cursor: pointer;
    &.on {
      border-bottom: 2px solid #00b493;
      color: #00b493;
    }
  }
}
</style>

