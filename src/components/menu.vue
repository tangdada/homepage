<template>
  <div class="menu tc shadow">
    <span class="menu-item" :class="{'on': activeMenu('home')}" @click="clickMenu('home')">医院首页</span>
    <span class="menu-item" :class="{'on': activeMenu('structure')}" @click="clickMenu('structure')">基本布局</span>
    <span class="menu-item" :class="{'on': activeMenu('implement')}" @click="clickMenu('implement')">实施方案</span>
    <span class="menu-item" :class="{'on': activeMenu('quality')}" @click="clickMenu('quality')">服务质量</span>
    <span class="menu-item" :class="{'on': activeMenu('employee')}" @click="clickMenu('employee')">人员情况</span>
    <span class="menu-item" :class="{'on': activeMenu('bookinline')}" @click="clickMenu('bookinline')">在线预约</span>

    <div class="fr foot">
      <a href="javascript:void(0)" @click="handleAddArticle" v-if="account.id && account.level == 999">添加文章</a>
      <span class="ml10" v-if="account.id">欢迎您：{{account.name}} <a href="javascript:void(0)" class="ml10" @click="logout">退出</a></span>
      <span v-else>
        <a href="javascript:void(0)" class="ml10" @click="handleLogin">登录</a>
        <a href="javascript:void(0)" class="ml10" @click="handleRegister">注册</a>
      </span>
    </div>

    <Modal width="70%" :footer-hide="true" v-model="modal2" title="发布文章" :mask-closable="false">
      <div class="w400"><i-input type="text" v-model.trim="form2.title" placeholder="请输入文章标题"></i-input></div>
      <quill-editor class="mt10" v-model.trim="form2.content" :maxlength="2000" :options="editorOption"></quill-editor>

      <div class="tr mt10">
        <Button type="primary" @click="saveArticle">发布文章</Button>
        <Button class="ml10" type="default" @click="modal2=false">取消</Button>
      </div>
    </Modal>

    <Modal width="400px" :footer-hide="true" v-model="modal1" title="登录" :mask-closable="false">
      <Form :model="form1" :label-width="80" ref="form1" :rules="rules">
        <FormItem label="用户名" prop="userName"> 
          <i-input type="text" :maxlength="30" v-model.trim="form1.userName" placeholder="请输入用户名"></i-input>
        </FormItem>
        <FormItem label="密码" prop="password"> 
          <i-input @on-enter="login" type="password" :maxlength="30" v-model.trim="form1.password" placeholder="请输入密码"></i-input>
        </FormItem>
      </Form>

      <div class="tr">
        <Button type="primary" @click="login">登录</Button>
        <Button class="ml10" type="default" @click="modal1=false">取消</Button>
      </div>
    </Modal>

    <Modal :footer-hide="true" v-model="modal3" title="注册" :mask-closable="false">
      <Form :model="form3" :label-width="80" ref="form3" :rules="rules3" class="pr20">
        <FormItem label="用户名" prop="userName"> 
          <i-input type="text" :maxlength="30" v-model.trim="form3.userName" placeholder="请输入用户名"></i-input>
        </FormItem>
        <FormItem label="密码" prop="password"> 
          <i-input type="password" :maxlength="30" v-model.trim="form3.password" placeholder="请输入密码"></i-input>
        </FormItem>
        <FormItem label="确认密码" prop="repassword"> 
          <i-input type="password" :maxlength="30" v-model.trim="form3.repassword" placeholder="请再次输入上面的密码"></i-input>
        </FormItem>
        <FormItem label="昵称" prop="name"> 
          <i-input type="text" :maxlength="30" v-model.trim="form3.name" placeholder="请输入昵称"></i-input>
        </FormItem>
        <FormItem label="手机" prop="mobile"> 
          <i-input type="text" :maxlength="30" v-model.trim="form3.mobile" placeholder="请输入昵称"></i-input>
        </FormItem>
      </Form>

      <div class="tr">
        <Button type="primary" @click="register">注册</Button>
        <Button class="ml10" type="default" @click="modal3=false">取消</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
import api from '../config/api'

export default {
  name: 'mt-menu',
  data() {
    let validatePwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入确认密码'))
      }
      if (value != this.form3.password) {
        return callback(new Error('两次输入的密码不一致'))
      } else {
        callback();
      }
    };

    return {
      currentTab: 'home',
      account: {},
      modal1: false,
      form1: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },

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
      },

      modal3: false,
      form3: {
        userName: '',
        password: '',
        repassword: '',
        name: '',
        mobile: '',
      },
      rules3: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        repassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatePwd, trigger: 'blur'}
        ],
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
      },

    }
  },
  methods: {
    clickMenu(menu) {
      if (menu == 'bookinline') {
        window.location.href = 'https://www.mytijian.com/m/117'
      } else {
        this.currentTab = menu;
        this.$router.push('/' + menu)
      }
    },

    activeMenu(menu) {
      return this.currentTab == menu;
    },

    getUser() {
      api.getAccountInfo().then(res => {
        this.account = res.data.user;
        this.$store.commit('user/INIT_ACCOUNT', res.data.user)
      }, error => {
        this.account = {}
        console.error('用户未登录')
      })
    },

    handleRegister() {
      this.modal3 = true;
      this.form3 = {
        userName: '',
        password: '',
        repassword: '',
        name: '',
        mobile: '',
      };
    },

    register() {
      this.$refs['form3'].validate(valid => {
        if (valid) {
          let art = this.form3;
          api.register({data: art}).then(res => {
            this.modal3 = false;
            this.modal1 = true;
            this.form1.userName = this.form3.userName
            this.$Message.success('注册成功')
          })
        }
      })
    },

    handleLogin() {
      this.modal1 = true;
      this.form1 =  {
        userName: '',
        password: ''
      }
    },

    logout() {
      localStorage.setItem('jwtToken', '')
      this.$store.commit('user/INIT_ACCOUNT', {})
      this.getUser()
    },

    login() {
      this.$refs['form1'].validate(valid => {
        if (valid) {
          api.login({data: this.form1, contentType: 'application/x-www-form-urlencoded'}).then(res => {
            this.modal1 = false;
            localStorage.setItem('jwtToken', res.data.token)
            this.getUser()
          }, error => {
            this.$Message.warning('用户名或者密码错误')
          })
        }
      })
    },

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
.ql-editor {
  min-height: 200px;
  max-height: 800px;
  overflow-y: auto;
}
.foot {
  position: absolute;
  margin-right: 20px;
  bottom: 0;
  right: 0;
  font-size: 14px;
}
</style>

