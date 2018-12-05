<template>
  <div>
    <div class="banner">
      <div class="banner-cont">
        <!-- <div class="banner-title">中国人民解放军第一一七医院简介</div>
        <div class="banner-subhead">中国人民解放军第一一七医院是南京军区所属的一所综合性三级甲等医院，医院位于杭州市灵隐风景区，院内绿树成荫、空气清新、环境优美，是驻浙陆海空三军唯一一所集医疗、教育、科研和预防保健于一体的中心医院。</div> -->
      </div>
    </div>

    <div class="content-wrap">
      <Row class="big-menu f18">
        <i-col :span="8" class="menu-item on">医院总体布局和情况</i-col>
        <i-col :span="8" class="menu-item">科室布局和工作制度</i-col>
        <i-col :span="8" class="menu-item">数据传输和对接</i-col>
      </Row>

    </div>

  </div>
</template>W

<script>
import api from '../../config/api'

export default {
  name: 'structure',
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

</style>

