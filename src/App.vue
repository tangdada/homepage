<template>
  <div>
    <mt-menu />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from './components/menu'

export default {
  components: {
    'mt-menu': Menu
  },

  watch: {
    $route (val, oldVal) {
    
    }
  },
};
</script>

<style>
</style>
