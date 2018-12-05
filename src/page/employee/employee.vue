<template>
  <div>
    <div class="banner">
      <div class="banner-cont down">
        <div class="banner-title">医院人员情况表</div>
        <div class="banner-subhead">健康管理中心现有主检医师2名、内科12名、外科10名、妇科5名、眼科6名、耳鼻喉科4名、口腔科4名、心电图2名、B超13名，放射9名、抽血检验20名、测血压2名，身高体重2名，导检护士20。其中高级职称23人，中级职称28人，体检各岗位人员配置数量、职称和经验完全满足招标要求。</div>
      </div>
      <div class="banner-mask"></div>
    </div>

    <div class="content-wrap">
      <Row class="f18 bdr-b">
        <i-col :span="8" class="menu-item" :class="{'on': currentTab == 'tab1'}" @click.native="changeTab('tab1')">医师信息</i-col>
        <i-col :span="8" class="menu-item" :class="{'on': currentTab == 'tab2'}" @click.native="changeTab('tab2')">证件图照</i-col>
        <i-col :span="8" class="menu-item" :class="{'on': currentTab == 'tab3'}" @click.native="changeTab('tab3')">体检设备</i-col>
      </Row>

      <div v-if="currentTab == 'tab1'" class="mt20">
        <table class="mt-table">
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>年龄</th>
            <th>学历</th>
            <th>专业</th>
            <th>职称</th>
            <th>从业年限</th>
            <th>项目职责</th>
            <th>项目经历</th>
            <th>证书对应页码</th>
          </tr>
          <tr v-for="(tr, idx) in src.tab1" :key="idx">
            <td>{{tr.id}}</td>
            <td>{{tr.name}}</td>
            <td>{{tr.gender}}</td>
            <td>{{tr.age}}</td>
            <td>{{tr.edu}}</td>
            <td>{{tr.pro}}</td>
            <td>{{tr.level}}</td>
            <td>{{tr.years}}</td>
            <td>{{tr.duty}}</td>
            <td>{{tr.exp}}</td>
            <td>{{tr.page}}</td>
          </tr>
        </table>
      </div>

      <div v-if="currentTab == 'tab2'" class="mt20">
        <div class="img-panel">
          <div class="img-w" v-for="(im, i) in src.tab2" :key="i">
            <img class="img bdr shadow" :src="im" />
          </div>
        </div>
      </div>

      <div v-if="currentTab == 'tab3'" class="mt20">
        <table class="mt-table">
          <tr>
            <th>名称</th>
            <th>规格</th>
            <th>数量</th>
            <th>状态</th>
            <th>制造厂商</th>
            <th>启用日期</th>
          </tr>
          <tr v-for="(tr, idx) in src.tab3" :key="idx">
            <td>{{tr.name}}</td>
            <td>{{tr.standard}}</td>
            <td>{{tr.num}}</td>
            <td>{{tr.status}}</td>
            <td>{{tr.from}}</td>
            <td>{{tr.date}}</td>
          </tr>
        </table>
      </div>

    </div>

  </div>
</template>

<script>
import api from '../../config/api'
import src from './data.js'

export default {
  name: 'employee',
  data() {
    return {
      currentTab: 'tab1',
      src: src,
    }
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
</style>

