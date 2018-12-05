<template>
  <div>
    <div class="banner">
      <div class="banner-cont">
        <!-- <div class="banner-title">中国人民解放军第一一七医院简介</div>
        <div class="banner-subhead">中国人民解放军第一一七医院是南京军区所属的一所综合性三级甲等医院，医院位于杭州市灵隐风景区，院内绿树成荫、空气清新、环境优美，是驻浙陆海空三军唯一一所集医疗、教育、科研和预防保健于一体的中心医院。</div> -->
      </div>
      <div class="banner-mask"></div>
    </div>

    <div class="content-wrap">
      <div class="content-wrap pt20">
        <div v-for="(s, idx) in services" :key="idx" class="mb20">
          <tab-head :title="s.name" class="mb20"/>
          <div v-for="(p, ix) in s.panels" :key="ix">
            <div class="imgs">
              <div class="img-wrap" v-for="(img, i) in p.imgs" :key="i">
                <img :src="img.name" />
              </div>
            </div>
            <div v-for="(d, ind) in p.desc" :key="ind" class="mb10 p10">
              {{d}}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import api from '../../config/api'
import src from './data.js'
import Tabhead from '../../components/tabhead'

export default {
  name: 'quality',
  data() {
    return {
      services: src
    }
  },
  components: {
    'tab-head': Tabhead
  },
  methods: {
  },

  mounted() {
  }
}
</script>

<style lang="less">
.imgs {
  width: 100%;
  .img-wrap {
    width: 50%;
    float: left;
    padding: 10px;
    img {
      width: 100%;
      height: 250px;
    }
  }
}
</style>

