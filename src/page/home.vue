<template>
  <div>
    首页
  </div>
</template>

<script>
import api from '../config/api'

export default {
  name: 'home',

  methods: {
    getUser() {
      console.log('getUser2')
      api.getAccountById({data: {id: 1}}).then(res => {
        console.log(res)
      })
    }
  },

  mounted() {
    this.getUser()
  }
}
</script>

<style lang="less">

</style>

