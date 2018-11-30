<template>
  <div>
    <div>{{account.name}}</div>
    <div v-for="c in comments" :key="c.id">{{c.content}}</div>
    首页
    <a href="javascript:void(0)" @click="handleClick">添加评论</a>
    <div class="tc"><a href="javascript:void(0)" @click="handleAddArticle">添加文章</a></div>

    <Modal :footer-hide="true" v-model="modal1" title="">
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

    <Modal :footer-hide="true" v-model="modal2" title="">
      <Form :model="form2" ref="form2" :rules="rules2">
        <FormItem label="" prop="content"> 
          <i-input type="textarea" :maxlength="300" v-model.trim="form2.content" placeholder="文明社会，理性评论"></i-input>
        </FormItem>
      </Form>

      <div class="tr">
        <Button type="primary" @click="saveArticle">发布文章</Button>
        <Button class="ml10" type="default" @click="modal2=false">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import api from '../config/api'

export default {
  name: 'home',
  data() {
    return {
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

      modal2: false,
      form2: {
        content: ''
      },
      rules2: {
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    getUser() {
      api.getAccountById({data: {id: 1}}).then(res => {
        this.account = res;
      })
    },

    getComment(articleId) {
      api.getCommentByArticleId({data: {id: articleId}}).then(res => {
        this.comments = res;
      })
    },

    saveArticle() {

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
  }
}
</script>

<style lang="less">

</style>

