<template>
  <div class="menu tc shadow">
    <span class="menu-item" :class="{'on': activeMenu('home')}" @click="clickMenu('home')">医院首页</span>
    <span class="menu-item" :class="{'on': activeMenu('structure')}" @click="clickMenu('structure')">基本布局</span>
    <span class="menu-item" :class="{'on': activeMenu('implement')}" @click="clickMenu('implement')">实施方案</span>
    <span class="menu-item" :class="{'on': activeMenu('quality')}" @click="clickMenu('quality')">服务质量</span>
    <span class="menu-item" :class="{'on': activeMenu('employee')}" @click="clickMenu('employee')">人员情况</span>
    <span class="menu-item" :class="{'on': activeMenu('bookinline')}" @click="clickMenu('bookinline')">在线预约</span>

    <div class="fr foot">
      <a href="javascript:void(0)" @click="handleAddArticle">添加文章</a>
      <a href="javascript:void(0)" class="ml10" @click="handleLogin">登录</a>
      <span class="ml10">{{account.name}}</span>
    </div>

    <Modal width="80%" :footer-hide="true" v-model="modal2" title="发布文章" :mask-closable="false">
      <div class="w400"><i-input type="text" v-model.trim="form2.title" placeholder="请输入文章标题"></i-input></div>
      <quill-editor class="mt10" v-model.trim="form2.content" :maxlength="2000" :options="editorOption"></quill-editor>

      <div class="tr mt10">
        <Button type="primary" @click="saveArticle">发布文章</Button>
        <Button class="ml10" type="default" @click="modal2=false">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import api from '../config/api'

export default {
  name: 'mt-menu',
  data() {
    return {
      currentTab: 'home',
      account: {},
      modal2: false,
      form2: {
        title: '',
        content: ''
      },
      rules2: {
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
        ],
      },
      editorOption: {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ header: 1 }, { header: 2 }],
            [{ align: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['image'],
          ]
        },
        placeholder: '输入内容'
      }

    }
  },
  methods: {
    clickMenu(menu) {
      this.currentTab = menu;
      this.$router.push('/' + menu)
    },

    activeMenu(menu) {
      return this.currentTab == menu;
    },

    getUser() {
      api.getAccountById({data: {id: 1}}).then(res => {
        this.account = res;
      })
    },

    handleLogin() {},

    handleAddArticle() {
      this.modal2 = true;
    },

    getAllNews() {
      api.getArticle().then(res => {
        this.news = res;
      })
    },

    saveArticle() {
      if (!this.form2.title) {
        this.$Message.warning('文章标题不能为空')
        return;
      }
      if (!this.form2.content) {
        this.$Message.warning('文章内容不能为空')
        return;
      }
      if (this.form2.content.length > 2500 * 1000) {
        this.$Message.warning('内容大小超限，如果有图片，可以考虑用微信或者QQ截图后再使用')
        return;
      }
      let art = this.form2
      api.addArticle({data: art}).then(res => {
        this.modal2 = false;
        this.$Message.success('发布文章成功')
        if (this.currentTab == 'home') this.getAllNews()
      })
    },
  },

  watch: {
  },

  mounted() {
    this.currentTab = this.$route.path.replace('/', '')
    this.getUser()
  }
}
</script>

<style lang="less">
.menu {
  position: relative;
  border-bottom: 1px solid #eee;
  font-size: 18px;
  &-item {
    display: inline-block;
    text-align: center;
    padding: 20px;
    width: 120px;
    cursor: pointer;
    &.on {
      border-bottom: 2px solid #00b493;
      color: #00b493;
    }
  }
}
.foot {
  position: absolute;
  margin-right: 20px;
  bottom: 0;
  right: 0;
  font-size: 14px;
}
</style>

