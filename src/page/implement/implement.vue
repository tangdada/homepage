<template>
  <div>
    <div class="banner bg-2">
      <div class="banner-cont down">
        <div class="banner-title">组织实施方案</div>
        <div class="banner-subhead">医院健康管理中心设有：内科、外科、耳鼻喉科、眼科、口腔科、妇科、放射科、超声室、心电图室、骨密度室、肠镜室、肺功能室、动脉硬化室、颅脑多普勒室等专业科室，科室齐全。中心编制了《健康体检中心工作制度与服务规范》手册，规范体检工作制度、操作流程和服务规范，确保体检工作有序运行。</div>
      </div>
      <div class="banner-mask"></div>
    </div>

    <div class="content-wrap pt20">
      <div v-for="(s, idx) in services" :key="idx" class="mb20">
        <tab-head :title="s.name" class="mb20"/>
        <div class="imgs">
          <div class="img-wrap" v-for="(img, i) in s.imgs" :key="i">
            <img :src="img.name" />
          </div>
        </div>
        <div v-for="(d, ind) in s.desc" :key="ind" class="mb10 p10">
          {{d}}
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
  name: 'implement',
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

