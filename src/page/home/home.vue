<template>
  <div>
    <div class="banner">
      <div class="banner-cont fadein">
        <div class="banner-title">中国人民解放军第一一七医院简介</div>
        <div class="banner-subhead">中国人民解放军第一一七医院是南京军区所属的一所综合性三级甲等医院，医院位于杭州市灵隐风景区，院内绿树成荫、空气清新、环境优美，是驻浙陆海空三军唯一一所集医疗、教育、科研和预防保健于一体的中心医院。</div>
      </div>
      <div class="banner-mask"></div>
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

    <div>用户：{{account.name}}</div>
    <div v-for="c in comments" :key="c.id">{{c.content}}</div>

    文章：
    <div>
      <div class="mt10" v-for="(n, idx) in news" :key="idx">{{n.title}}</div>
    </div>
    首页
    <a href="javascript:void(0)" @click="handleClick">添加评论</a>
    <div class="tc"><a href="javascript:void(0)" @click="handleAddArticle">添加文章</a></div>

    <Modal :footer-hide="true" v-model="modal1" title="" :mask-closable="false">
      <Form :model="form1" ref="form1" :rules="rules">
        <FormItem label="" prop="content"> 
          <i-input type="textarea" :maxlength="300" v-model.trim="form1.content" placeholder="文明社会，理性评论"></i-input>
        </FormItem>
      </Form>

      <div class="tr">
        <Button type="primary" @click="ok">发布评论</Button>
        <Button class="ml10" type="default" @click="modal1=false">取消</Button>
      </div>
    </Modal>

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
import api from '../../config/api'
import src from './data.js'
import Tabhead from '../../components/tabhead'
import { ossPath } from '../../config/util'

export default {
  name: 'home',
  data() {
    return {
      src: src,
      modal1: false,
      form1: {
        articleId: 1,
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
        ],
      },
      account: {},
      comments: [],
      news: [],

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
            // ['image'],
          ]
        },
        placeholder: '输入内容'
      }
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

    getUser() {
      api.getAccountById({data: {id: 1}}).then(res => {
        this.account = res;
      })
    },

    getAllNews() {
      api.getArticle().then(res => {
        this.news = res;
      })
    },

    getComment(articleId) {
      api.getCommentByArticleId({data: {id: articleId}}).then(res => {
        this.comments = res;
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
      let art = this.form2
      api.addArticle({data: art}).then(res => {
        this.modal2 = false;
        this.$Message.success('发布文章成功')
        this.getAllNews()
      })
    },

    handleClick() {
      this.modal1 = true;
    },

    handleAddArticle() {
      this.modal2 = true;
    },

    ok() {
      this.$refs['form1'].validate(valid => {
        let come = this.form1
        api.addComment({data: come}).then(res => {
          this.modal1 = false;
          this.$Message.success('评论成功')
          this.getComment(1)
        })
      })
    }
  },

  mounted() {
    this.getUser()
    this.getComment(1)
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

.img-panel {
  img {
    width: 100%;
    height: 100%;
  }
}

.news {
  &-item {
    width: 50%;
  }
}
</style>

