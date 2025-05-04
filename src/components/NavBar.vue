<template>
  <div class="nav-bar">
    <div class="nav-content">
      <!-- Logo -->
      <div class="logo" @click="$router.push('/')">
        <img src="@/assets/logo.png" alt="Logo">
        <span>owo小说</span>
      </div>

      <!-- 导航菜单 -->
      <div class="nav-menu">
        <el-menu
          mode="horizontal"
          :router="true"
          :default-active="activeMenu"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/category">分类</el-menu-item>
          <el-menu-item index="/library">书库</el-menu-item>
          <el-menu-item index="/bookshelf">书架</el-menu-item>
        </el-menu>
      </div>

      <!-- 搜索框 -->
      <div class="search-box">
        <el-input
          placeholder="搜索小说"
          prefix-icon="el-icon-search"
          v-model="searchQuery"
          @keyup.enter.native="handleSearch"
        >
        </el-input>
      </div>

      <!-- 用户菜单/登录注册按钮 -->
      <div class="user-menu">
        <template v-if="isLogin">
          <el-dropdown trigger="click">
            <div class="user-info" @click="$router.push('/personal')">
              <el-avatar :size="32" :src="userAvatar"></el-avatar>
              <span class="username">{{ username }}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$router.push('/personal')">
                <i class="el-icon-user"></i> 个人中心
              </el-dropdown-item>
              <el-dropdown-item @click.native="$router.push('/history')">
                <i class="el-icon-time"></i> 阅读历史
              </el-dropdown-item>
              <el-dropdown-item @click.native="$router.push('/settings')">
                <i class="el-icon-setting"></i> 设置
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="handleLogout">
                <i class="el-icon-switch-button"></i> 退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <el-button type="text" @click="showLogin = true">登录</el-button>
          <el-button type="primary" @click="showRegister = true">注册</el-button>
        </template>
      </div>
    </div>

    <!-- 登录弹窗 -->
    <el-dialog title="登录" :visible.sync="showLogin" width="350px" @close="resetLoginForm">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 注册弹窗 -->
    <el-dialog title="注册" :visible.sync="showRegister" width="350px" @close="resetRegisterForm">
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="registerForm.confirmPassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      searchQuery: '',
      isLogin: false,
      username: '',
      userAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      showLogin: false,
      showRegister: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      registerForm: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            }, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    activeMenu() {
      return this.$route.path
    }
  },
  methods: {
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({
          name: 'Search',
          query: { q: this.searchQuery }
        })
      }
    },
    handleLogout() {
      this.isLogin = false
      this.username = ''
      this.$message.success('已退出登录')
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.isLogin = true
          this.username = this.loginForm.username
          this.showLogin = false
          this.$message.success('登录成功')
        }
      })
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.isLogin = true
          this.username = this.registerForm.username
          this.showRegister = false
          this.$message.success('注册成功')
        }
      })
    },
    resetLoginForm() {
      this.$refs.loginForm && this.$refs.loginForm.resetFields()
    },
    resetRegisterForm() {
      this.$refs.registerForm && this.$refs.registerForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  .nav-content {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 32px;

    .logo {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-right: 40px;

      img {
        height: 32px;
        margin-right: 8px;
      }

      span {
        font-size: 20px;
        font-weight: bold;
        color: #ff4d4f;
      }
    }

    .nav-menu {
      flex: 1;
      .el-menu {
        border: none;
      }
    }

    .search-box {
      width: 200px;
      margin: 0 20px;
    }

    .user-menu {
      .user-info {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 5px;

        .username {
          margin-left: 8px;
          color: #606266;
        }
      }
    }
  }
}
</style> 