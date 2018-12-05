<template>
  <div class="whole-page">
    <header><mt-menu /></header>
    <div class="container"><router-view></router-view></div>
    <footer><mt-footer /></footer>
    <back-top v-if="show"/>
  </div>
</template>

<script>
import Menu from './components/menu'
import Footer from './components/footer'
import Backtop from './components/backtop'

export default {
  data() {
    return {
      show: false,
    }
  },
  components: {
    'mt-menu': Menu,
    'mt-footer': Footer,
    'back-top': Backtop,
  },
  methods: {
    handleScroll () {
      let scrollTop = window.pageYOffset || document.body.scrollTop
      if (scrollTop > 250) {
        this.show = true
      } else {
        this.show = false
      }
    },
  },
  watch: {
    $route (val, oldVal) {
    
    }
  },

  mounted() {
    this.$Message.config({
      duration: 4
    });

    window.addEventListener('scroll', this.handleScroll, true)
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
