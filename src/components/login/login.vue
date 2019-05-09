<template>
  <div class="login">
    <el-form class="form-login"
             :label-position="labelPosition"
             label-width="80px"
             :model="formLabelAlign">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-button @click="handGo()"
                 class="login-button"
                 type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top',
      formLabelAlign: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handGo () {
      const res = await this.$http.post('login', this.formLabelAlign)
      const { data,
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        // 保存token‘
        window.localStorage.setItem('token', data.token)
        console.log(data.token)
        this.$message.success(msg)
        this.$router.push({ name: 'home' })
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style lang="stylus">
.login {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;

  .form-login {
    width: 430px;
    background-color: #fff;
    padding: 30px;

    el-button, .login-button {
      width: 100%;
    }
  }
}
</style>
