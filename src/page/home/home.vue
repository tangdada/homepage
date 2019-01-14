<template>
  <div class="home">
    <div class="big-banner">
      <div class="banner-cont down" style="padding: 100px;">
        <div class="banner-title">中国人民解放军联勤保障部队第903医院</div>
        <div class="banner-subhead pct50 fr">中国人民解放军联勤保障部队第903医院是南京军区所属的一所综合性三级甲等医院，医院位于杭州市灵隐风景区，院内绿树成荫、空气清新、环境优美，是驻浙陆海空三军唯一一所集医疗、教育、科研和预防保健于一体的中心医院。</div>
      </div>
    </div>

    <div class="content-wrap pt20">
      <div class="mb40">
        <tab-head title="新闻资讯" />
        <Row class="img-panel">
          <i-col :span="12" class="p20"><img :src="newsImg" /></i-col>
          <i-col :span="12" class="p20">
            <div class="ptc100 ell" v-for="(n, idx) in news" :key="idx"><a href="javascript:void(0)" @click="toNewsPage(n.id)">{{n.title}}</a></div>
          </i-col>
        </Row>
      </div>

      <tab-head title="医院简介" />
      <Row v-for="(s, idx) in src.intro" :key="idx" class="img-panel">
        <i-col :span="12" class="p20"><img :src="s.img" /></i-col>
        <i-col :span="12" class="p20">{{s.desc}}</i-col>
      </Row>
    </div>

  </div>
</template>

<script>
import api from '../../config/api'
import src from './data.js'
import Tabhead from '../../components/tabhead'
import { ossPath } from '../../config/util'

export default {
  name: 'home',
  data() {
    return {
      src: src,
      news: [],
    }
  },
  components: {
    'tab-head': Tabhead
  },
  computed: {
    newsImg() {
      return ossPath + 'cuoshi0202.png'
    }
  },
  methods: {
    toNewsPage(id) {
      this.$router.push('/news?id=' + id)
    },

    getAllNews() {
      api.getArticle().then(res => {
        this.news = res;
      })
    },
  },

  mounted() {
    this.getAllNews()
  }
}
</script>

<style lang="less" scoped>
.ql-editor {
  min-height: 200px;
  max-height: 800px;
  overflow-y: auto;
}

.big-banner {
  position: relative;
  text-align: center;
  min-height: 600px;
  background: url('https://mytijian-img.oss-cn-hangzhou.aliyuncs.com/hospital/117/official_site/117.jpg') no-repeat;
  background-size: cover;
  background-position: 0% 15%;
  &-cont {
    position: absolute;
    width: 100%;
    padding: 30px;
    z-index: 2;
  }
  &-title {
    font-size: 50px;
    font-weight: bold;
  }
  &-subhead {
    margin-top: 40px;
    font-size: 20px;
  }
}

.img-panel {
  img {
    width: 100%;
    height: 220px;
  }
}

.news {
  &-item {
    width: 50%;
  }
}
</style>

