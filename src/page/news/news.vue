<template>
  <div class="content-wrap">
    <Breadcrumb class="pt10 pb10">
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem>新闻资讯</BreadcrumbItem>
    </Breadcrumb>

    <div class="news-title bdr-b">
      <div class="b">{{article.title}}</div>
      <div class="tl c-gray f14 mt10">{{article.createTime | formatDateTime}}</div>
    </div>
    <div class="news-content mb20">
      <pre v-html="article.content"></pre>
    </div>
    <div class="tr"><a href="javascript:void(0)" @click="handleDiscuss">添加评论</a></div>

    <div class="comments">
      <div class="pt10 pb10 bdr-b f16"><Icon type="ios-chatboxes-outline"></Icon> 评论</div>
      <div v-for="c in comments" :key="c.id">
        <div class="comments-cont bdr-b">
          <div class="clearfix c-9">
            <span class="fl">{{c.userName}}</span>
            <span class="fr">{{c.createTime | formatDateTime}}</span>
          </div>
          <div class="mt10">{{c.content}}</div>
          <div class="tr">
            <a href="javascript:void(0)" @click="handlePraise(c)">顶 [{{c.praise.length || 0}}]</a>
            <a href="javascript:void(0)" @click="handleOppose(c)" class="ml20">踩 [{{c.oppose.length || 0}}]</a>
          </div>
          <div class="portrait c-9 f18"><Icon type="person"></Icon></div>
        </div>
      </div>
    </div>

    <Modal :footer-hide="true" v-model="modal1" title="发表评论" :mask-closable="false">
      <Form :model="form1" ref="form1" :rules="rules">
        <FormItem label="" prop="content"> 
          <i-input type="textarea" :maxlength="300" v-model.trim="form1.content" placeholder="文明社会，理性评论"></i-input>
        </FormItem>
      </Form>

      <div class="tr">
        <Button type="primary" @click="ok">发表评论</Button>
        <Button class="ml10" type="default" @click="modal1=false">取消</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
import api from '../../config/api'
import { mapState } from 'vuex'

export default {
  name: 'news',
  data() {
    return {
      article: {},
      comments: [],
      modal1: false,
      form1: {
        articleId: this.$route.query.id,
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      account: state => state.accountInfo
    }),
  },

  methods: {
    getArticle(id) {
      api.getArticleById({data: {id: id}}).then(res => {
        this.article = res;
      })
    },

    getComment(articleId) {
      api.getCommentByArticleId({data: {id: articleId}}).then(res => {
        this.comments = (res || []).map(item => {
          item.praise = item.praise ? item.praise.split(',') : [];
          item.oppose = item.oppose ? item.oppose.split(',') : [];
          return item;
        }).sort((a, b) => {
          return b.praise.length - a.praise.length;
        });
      })
    },

    handleDiscuss() {
      if (!this.account.id) {
        this.$Message.warning('请先登录')
        return
      }
      this.modal1 = true;
    },

    handlePraise(comment) {
      if (!this.account.id) {
        this.$Message.warning('请先登录')
        return
      }
      let accountId = this.account.id + ''
      let idx = comment.praise.indexOf(accountId);
      if (idx > -1) {
        comment.praise.splice(idx, 1)
      } else {
        comment.praise.push(accountId)
      }
      let pms = {
        id: comment.id,
        praise: comment.praise.join(',')
      }
      api.updateComment({data: pms}).then(res => {
        
      })
    },
    handleOppose(comment) {
      if (!this.account.id) {
        this.$Message.warning('请先登录')
        return
      }
      let accountId = this.account.id + ''
      let idx = comment.oppose.indexOf(accountId);
      if (idx > -1) {
        comment.oppose.splice(idx, 1)
      } else {
        comment.oppose.push(accountId)
      }
      let pms = {
        id: comment.id,
        oppose: comment.oppose.join(',')
      }
      api.updateComment({data: pms}).then(res => {

      })
    },

    ok() {
      this.$refs['form1'].validate(valid => {
        if (valid) {
          let come = this.form1
          api.addComment({data: come}).then(res => {
            this.modal1 = false;
            this.$Message.success('评论成功')
            this.getComment(this.form1.articleId)
          })
        }
      })
    },

  },

  mounted() {
    this.getArticle(this.form1.articleId)
    this.getComment(this.form1.articleId)
  }
}
</script>

<style lang="less">
.news-title {
  text-align: center;
  font-size: 34px;
  font-weight: bold;
  margin: 20px 0;
}
.news-content pre {
  white-space: pre-wrap;
}

.comments-cont {
  position: relative;
  padding: 20px;
  padding-left: 80px;
  &:hover {
    background: #efefef;
  }
  .portrait {
    position: absolute;
    top: 17px;
    left: 10px;
  }
}
</style>

