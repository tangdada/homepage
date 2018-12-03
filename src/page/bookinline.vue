<template>
  <div>
    <div class="banner">
      <div class="banner-cont">
        <div class="banner-title">中国人民解放军第一一七医院简介</div>
        <div class="banner-subhead">中国人民解放军第一一七医院是南京军区所属的一所综合性三级甲等医院，医院位于杭州市灵隐风景区，院内绿树成荫、空气清新、环境优美，是驻浙陆海空三军唯一一所集医疗、教育、科研和预防保健于一体的中心医院。</div>
      </div>
      <div class="banner-mask"></div>
    </div>

    <div class="content-wrap">232</div>

  </div>
</template>

<script>
import api from '../config/api'

export default {
  name: 'bookinline',
  data() {
    return {
    }
  },
  methods: {
  },

  mounted() {
  }
}
</script>

<style lang="less">

.banner {
  position: relative;
  min-height: 300px;
  text-align: center;
  background: url('https://mytijian-img.oss-cn-hangzhou.aliyuncs.com/hospital/117/official_site/banner.png') no-repeat center;
  background-size: cover;
  &-cont {
    position: absolute;
    width: 100%;
    padding: 30px;
    z-index: 2;
    color: #000;
  }
  &-title {
    font-size: 50px;
    font-weight: bold;
  }
  &-subhead {
    margin-top: 40px;
    font-size: 20px;
  }
  &-mask {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: #eee;
    opacity: .7;
    z-index: 1;
  }
}
</style>

