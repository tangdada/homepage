<template>
  <div>
    <div class="banner bg-1">
      <div class="banner-cont"></div>
      <div class="banner-mask"></div>
    </div>

    <div class="content-wrap">
      <Row class="f18 bdr-b">
        <i-col :span="8" class="menu-item" :class="{'on': currentTab == 'tab1'}" @click.native="changeTab('tab1')">医院总体布局和情况</i-col>
        <i-col :span="8" class="menu-item" :class="{'on': currentTab == 'tab2'}" @click.native="changeTab('tab2')">科室布局和工作制度</i-col>
        <i-col :span="8" class="menu-item" :class="{'on': currentTab == 'tab3'}" @click.native="changeTab('tab3')">数据传输和对接</i-col>
      </Row>

      <div v-show="currentTab == 'tab1'" class="fadein pt20 pb20">
        <div v-for="(p, idx) in tab1Data.parts" :key="idx" class="mb20">
          <tab-head :title="p.name" class="mb20"/>
          <div class="img-panel">
            <div class="img-w" v-for="(im, i) in p.imgs" :key="i">
              <img class="img bdr" :src="im.img" />
              <div class="tc" v-if="im.desc">{{im.desc}}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="currentTab == 'tab2'" class="fadein pt20 pb20">
        <div v-for="(p, idx) in tab2Data.parts" :key="idx" class="mb20">
          <tab-head :title="p.name" class="mb20"/>
          <div class="img-panel">
            <div class="img-w" v-for="(im, i) in p.imgs" :key="i">
              <img class="img bdr" :src="im.img" />
              <div class="tc" v-if="im.desc">{{im.desc}}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="currentTab == 'tab3'" class="fadein pt20 pb20">
        <div v-for="(p, idx) in tab3Data.parts" :key="idx" class="mb20">
          <tab-head :title="p.name" class="mb20"/>
          <div class="img-panel">
            <div class="img-w" v-for="(im, i) in p.imgs" :key="i">
              <img class="img bdr" :src="im.img" />
              <div class="tc" v-if="im.desc">{{im.desc}}</div>
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
  name: 'structure',
  data() {
    return {
      currentTab: 'tab1',
      tab1Data: src.tab1,
      tab2Data: src.tab2,
      tab3Data: src.tab3,
    }
  },
  components: {
    'tab-head': Tabhead
  },
  computed: {
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab;
    }
  },

  mounted() {
  }
}
</script>

<style lang="less">
.img-panel {
  width: 100%;
  clear: both;
  .img-w {
    float: left;
    width: 33%;
    padding: 10px;
    height: 300px;
  }
  .img {
    width: 100%;
    height: 200px;
  }
}
</style>

