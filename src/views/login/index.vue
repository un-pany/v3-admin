<template>
  <div class="login-container">
    <div class="login-card">
      <div class="title">
        <!-- <h3>V3 - Admin</h3> -->
        <img src="@/assets/layout/logo-text.png">
      </div>
      <div class="content">
        <el-form
          ref="loginFormDom"
          :model="loginForm"
          :rules="loginRules"
          auto-complete="on"
          label-position="left"
          @keyup.enter="handleLogin"
        >
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon name="user" />
            </span>
            <el-input
              ref="userNameDom"
              v-model="loginForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="off"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon name="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="passwordDom"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              auto-complete="off"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :name="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
          <el-form-item prop="code">
            <span class="svg-container">
              <svg-icon name="table" />
            </span>
            <el-input
              ref="codeDom"
              v-model="loginForm.code"
              placeholder="验证码"
              name="code"
              type="text"
              tabindex="3"
              auto-complete="off"
            />
            <span class="show-code">
              <img
                style="
                  width: 100px;
                  height: 52px;
                  background: #f4def6;
                  border-radius: 4px;
                "
                :src="src"
                alt="验证码"
                @click="createCode"
              >
            </span>
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            @click.prevent="handleLogin"
          >
            登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, nextTick, reactive, ref } from 'vue'
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { useRouter } from 'vue-router'

interface LoginForm {
  username: string
  password: string
  code: string
  checkCode: string
}

interface LoginRules {
  username: Array<any>
  password: Array<any>
  code: Array<any>
}

const validateUsername = (rule: any, value: string, callback: Function) => {
  if (!value.length) {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
const validatePassword = (rule: any, value: string, callback: Function) => {
  if (value.length < 6) {
    callback(new Error('密码不能少于6位'))
  } else {
    callback()
  }
}
const validateCode = (rule: any, value: string, callback: Function) => {
  if (value.length === 0) {
    callback(new Error('请输入验证码'))
  } else {
    callback()
  }
}

export default defineComponent({
  name: 'Login',
  setup() {
    // hooks
    const router = useRouter()
    const store = useStore()
    // data
    const src = ref<string>('')
    const loginForm = reactive<LoginForm>({
      username: 'admin', // admin 或 editor
      password: '123456',
      code: '1234',
      checkCode: ''
    })
    const loginRules = reactive<LoginRules>({
      username: [
        { required: true, trigger: 'blur', validator: validateUsername }
      ],
      password: [
        { required: true, trigger: 'blur', validator: validatePassword }
      ],
      code: [{ required: true, trigger: 'blur', validator: validateCode }]
    })
    const loading = ref<boolean>(false)
    const passwordType = ref<string>('password')
    // dom
    const loginFormDom = ref<any>()
    const passwordDom = ref<any>()
    // 方法
    const showPwd: () => void = () => {
      if (passwordType.value === 'password') {
        passwordType.value = ''
      } else {
        passwordType.value = 'password'
      }
      nextTick(() => {
        passwordDom.value.focus()
      })
    }
    const handleLogin: () => void | boolean = () => {
      loginFormDom.value.validate(async(valid: boolean) => {
        if (valid) {
          loading.value = true
          await store.dispatch(UserActionTypes.ACTION_LOGIN, {
            username: loginForm.username,
            password: loginForm.password
          })
          loading.value = false
          router
            .push({
              path: '/'
            })
            .catch((err) => {
              console.warn(err)
            })
        } else {
          return false
        }
      })
    }
    // 创建验证码
    const createCode: () => void = () => {
      // 先清空验证码的输入
      let code = ''
      loginForm.code = ''
      const codeLength = 12
      // 随机数
      const random: Array<number | string> = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ]
      for (let i = 0; i < codeLength; i++) {
        const index = Math.floor(Math.random() * 36)
        code += random[index]
      }
      loginForm.checkCode = `${code}`
      src.value = `/api/v1/login/authcode?token=${code}`
    }

    return {
      loginFormDom,
      passwordDom,
      src,
      loginForm,
      loginRules,
      loading,
      passwordType,
      showPwd,
      handleLogin,
      createCode
    }
  }
})
</script>

<style lang="scss">
.login-container {
  min-height: 100%;
  width: 100%;
  background: url('../../assets/login/bg.png')
    center/cover no-repeat;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    overflow: hidden;
    width: 600px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px #000;
    .title {
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 26px;
      img {
        height: 100%;
      }
    }
    .content {
      background-color: #fff;
      padding: 60px;
      .svg-container {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
      }
      .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: #889aa4;
        cursor: pointer;
        user-select: none;
      }
      .show-code {
        position: absolute;
        right: 0px;
        top: 0px;
        font-size: 16px;
        color: #889aa4;
        cursor: pointer;
        user-select: none;
      }
    }
  }
}
</style>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
$bg: #fff;
$light_gray: #666;
$cursor: #666;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
  }
  .el-button {
    height: 52px;
    width: 100%;
  }
}
</style>
