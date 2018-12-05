<template>
  <div class="whole-page">
    <header><mt-menu /></header>
    <div class="container"><router-view></router-view></div>
    <footer><mt-footer /></footer>
    <!-- todo <div>回到顶部</div> -->
  </div>
</template>

<script>
import Menu from './components/menu'
import Footer from './components/footer'

export default {
  components: {
    'mt-menu': Menu,
    'mt-footer': Footer,
  },

  watch: {
    $route (val, oldVal) {
    
    }
  },

  mounted() {
    this.$Message.config({
      duration: 4
    });
  },
};
</script>

<style lang="less" scoped>

// flex layout ******
// html body height 都必须设置成100%
.whole-page{
  display: flex;
  flex-direction: column;
  height: 100%;
  .container{
    flex: 1 0 auto;
    margin-top: 70px;
  }
  header{
    /* 我们希望 header 采用固定的高度，只占用必须的空间 */
    /* 0 flex-grow, 0 flex-shrink, auto flex-basis */
    flex: 0 0 auto;
    position: fixed;
    width: 100%;
    background: #fff;
    z-index: 999;
  }
  footer{
    /* 和 header 一样，footer 也采用固定高度*/
    /* 0 flex-grow, 0 flex-shrink, auto flex-basis */
    flex: 0 0 auto;
  }
}


// flex layout ******
</style>
