<template>
  <div class="content-wrap">
    <div>{{article.title}}</div>
    <div>
      <pre>{{article.content}}</pre>
    </div>

  </div>
</template>

<script>
import api from '../../config/api'

export default {
  name: 'news',
  data() {
    return {
      article: {}
    }
  },
  methods: {
    getArticle(id) {
      api.getArticleById({data: {id: id}}).then(res => {
        this.article = res;
      })
    }
  },

  mounted() {
    this.getArticle(this.$route.query.id)
  }
}
</script>

<style lang="less">
</style>

