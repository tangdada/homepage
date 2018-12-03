<template>
  <div class="tabhead bdr-b">
    <div class="desc tc">{{title}}</div>
  </div>
</template>

<script>

export default {
  name: 'tabhead',
  data() {
    return {
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
  },
  methods: {
  },

  mounted() {
  },

  watch: {
  },

  mounted() {
  }
}
</script>

<style lang="less">
.tabhead {
  .desc {
    display: inline-block;
    line-height: 35px;
    padding: 0 20px;
    background: #00b493;
    color: #fff;
  }
}
</style>

