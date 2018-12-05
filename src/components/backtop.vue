<template>
  <div class="backtop down" @click="toTop">
    <Icon class="up-icon" type="android-arrow-up"></Icon>
    <span class="up-text">返回顶部</span>
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
    toTop() {
      window.scrollTo(0, 0)
    }
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
.backtop {
  position: fixed;
  width: 45px;
  height: 48px;
  bottom: 40px;
  right: 50px;
  background: #00b493;
  color: #fff;
  text-align: center;
  cursor: pointer;
  .up-icon {
    font-size: 36px;
  }
  .up-text {
    display: none;
  }
  &:hover {
    .up-icon {
      display: none;
    }
    .up-text {
      display: block;
    }
  }
}
</style>

