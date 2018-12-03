<template>
  <div>
    <mt-menu />
    <router-view></router-view>
    <mt-footer />
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
};
</script>

<style>
</style>
