<template>
  <div class="personal-center">
    <!-- Left Sidebar -->
    <div class="sidebar">
      <div class="menu-title">个人中心</div>
      <div class="menu-items">
        <div 
          v-for="(item, index) in menuItems" 
          :key="index"
          :class="['menu-item', { active: currentMenu === item.key }]"
          @click="handleMenuClick(item.key)"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- User Profile Header -->
      <div class="profile-header">
        <div class="profile-avatar" @click="showAvatarUpload = true">
          <img :src="userInfo.avatar" alt="avatar" />
          <div class="avatar-overlay">
            <i class="el-icon-camera"></i>
            <span>更换头像</span>
          </div>
          <div class="level-tag">LV{{ userInfo.level }}</div>
        </div>
        <div class="profile-info">
          <div class="username">
            <span @click="startEditUsername">{{ userInfo.username || '未设置昵称' }}</span>
            <el-input
              v-if="isEditingUsername"
              v-model="tempUsername"
              size="small"
              style="width: 200px"
              @blur="saveUsername"
              @keyup.enter.native="saveUsername"
              ref="usernameInput"
            ></el-input>
            <span class="member-tag" v-if="userInfo.level > 1">LV{{ userInfo.level }}</span>
            <span class="member-tag new-member" v-else>新用户</span>
          </div>
          <div class="stats">
            <div class="stat-item">
              <span class="coin-icon">B</span>
              <span class="value">{{ userInfo.coins }}</span>
            </div>
            <div class="stat-item">
              <span class="point-icon">积</span>
              <span class="value">{{ userInfo.points }}</span>
            </div>
          </div>
          <div class="exp-bar">
            <el-progress 
              :percentage="Math.min((userInfo.currentExp / userInfo.maxExp) * 100, 100)"
              :format="format"
              :stroke-width="8"
              :color="progressColor"
            ></el-progress>
          </div>
        </div>
        <div class="profile-actions">
          <el-button type="primary" size="small" @click="showEditInfo = true">修改资料</el-button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="content-area">
        <!-- 我的信息 -->
        <div v-if="currentMenu === 'info'">
          <h3>基本信息</h3>
          <div class="info-form">
            <el-form label-width="100px" :model="userInfo">
              <el-form-item label="用户名">
                <el-input v-model="userInfo.username"></el-input>
              </el-form-item>
              <el-form-item label="注册时间">
                <el-input v-model="userInfo.registerDate" disabled></el-input>
              </el-form-item>
              <el-form-item label="个性签名">
                <el-input type="textarea" v-model="userInfo.signature"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserInfo">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <!-- 我的头像 -->
        <div v-if="currentMenu === 'avatar'">
          <h3>我的头像</h3>
          <div class="avatar-section">
            <div class="current-avatar">
              <img :src="userInfo.avatar" alt="current avatar" />
            </div>
            <div class="avatar-upload">
              <el-upload
                class="avatar-uploader"
                action="/api/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <i class="el-icon-plus avatar-uploader-icon"></i>
                <div class="upload-text">点击上传新头像</div>
              </el-upload>
            </div>
          </div>
        </div>

        <!-- 实名认证 -->
        <div v-if="currentMenu === 'verify'">
          <h3>实名认证</h3>
          <div class="verify-form" v-if="!userInfo.isVerified">
            <el-form label-width="100px" :model="verifyForm" :rules="verifyRules" ref="verifyForm">
              <el-form-item label="真实姓名" prop="realName">
                <el-input v-model="verifyForm.realName"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="verifyForm.idCard"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitVerify">提交认证</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="verify-status" v-else>
            <i class="el-icon-success"></i>
            <span>已完成实名认证</span>
          </div>
        </div>

        <!-- 邀请注册 -->
        <div v-if="currentMenu === 'invite'">
          <h3>邀请注册</h3>
          <div class="invite-section">
            <div class="invite-code">
              <div class="code-label">我的邀请码</div>
              <div class="code-value">
                {{ userInfo.inviteCode }}
                <el-button type="text" @click="copyInviteCode">复制</el-button>
              </div>
            </div>
            <div class="invite-stats">
              <div class="stat-card">
                <div class="stat-value">{{ userInfo.inviteCount }}</div>
                <div class="stat-label">已邀请人数</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">{{ userInfo.inviteRewards }}</div>
                <div class="stat-label">获得奖励</div>
              </div>
            </div>
            <div class="invite-rules">
              <h4>邀请规则</h4>
              <p>1. 每邀请一位新用户注册成功可获得100积分</p>
              <p>2. 被邀请用户完成实名认证可额外获得200积分</p>
              <p>3. 邀请奖励每月最高可获得1000积分</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 头像上传对话框 -->
    <el-dialog title="更换头像" :visible.sync="showAvatarUpload" width="400px">
      <el-upload
        class="avatar-uploader"
        action="/api/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="tempAvatar" :src="tempAvatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAvatarUpload = false">取消</el-button>
        <el-button type="primary" @click="saveAvatar">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PersonalCenter',
  data() {
    return {
      currentMenu: 'info',
      isEditingUsername: false,
      tempUsername: '',
      showAvatarUpload: false,
      tempAvatar: '',
      showEditInfo: false,
      menuItems: [
        { key: 'info', label: '我的信息', icon: 'el-icon-user' },
        { key: 'avatar', label: '我的头像', icon: 'el-icon-picture' },
        { key: 'verify', label: '实名认证', icon: 'el-icon-check' },
        { key: 'invite', label: '邀请注册', icon: 'el-icon-share' }
      ],
      userInfo: {
        username: '',
        level: 1,
        coins: 0,
        points: 0,
        currentExp: 0,
        maxExp: 100,
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        registerDate: new Date().toLocaleDateString(),
        signature: '',
        isVerified: false,
        inviteCode: '',
        inviteCount: 0,
        inviteRewards: 0
      },
      verifyForm: {
        realName: '',
        idCard: ''
      },
      verifyRules: {
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    progressColor() {
      return {
        '0%': '#909399',
        '50%': '#e6a23c',
        '100%': '#00a1d6'
      }
    }
  },
  methods: {
    format() {
      return `${this.userInfo.currentExp}/${this.userInfo.maxExp}`
    },
    handleMenuClick(key) {
      this.currentMenu = key
    },
    startEditUsername() {
      this.isEditingUsername = true
      this.tempUsername = this.userInfo.username
      this.$nextTick(() => {
        this.$refs.usernameInput.focus()
      })
    },
    saveUsername() {
      if (this.tempUsername.trim()) {
        this.userInfo.username = this.tempUsername
        this.$message.success('用户名修改成功')
      }
      this.isEditingUsername = false
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess(res, file) {
      this.tempAvatar = URL.createObjectURL(file.raw)
    },
    saveAvatar() {
      if (this.tempAvatar) {
        this.userInfo.avatar = this.tempAvatar
        this.$message.success('头像更新成功')
      }
      this.showAvatarUpload = false
    },
    saveUserInfo() {
      // 这里添加保存用户信息的逻辑
      this.$message.success('保存成功')
    },
    submitVerify() {
      this.$refs.verifyForm.validate(valid => {
        if (valid) {
          // 这里添加实名认证的逻辑
          this.userInfo.isVerified = true
          this.$message.success('实名认证提交成功')
        }
      })
    },
    copyInviteCode() {
      navigator.clipboard.writeText(this.userInfo.inviteCode).then(() => {
        this.$message.success('邀请码已复制到剪贴板')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.personal-center {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
  width: 100vw;
  margin-left: -50vw;
  left: 50%;
  position: relative;

  .sidebar {
    width: 240px;
    background: #fff;
    padding: 20px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: fixed;
    height: 100vh;

    .menu-title {
      padding: 0 20px;
      font-size: 18px;
      font-weight: 500;
      color: #333;
      margin-bottom: 20px;
    }

    .menu-items {
      .menu-item {
        padding: 16px 20px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s;

        i {
          margin-right: 12px;
          font-size: 18px;
          color: #666;
        }

        span {
          color: #666;
          font-size: 14px;
        }

        &:hover, &.active {
          background: #f6f9fc;
          color: #00a1d6;

          i, span {
            color: #00a1d6;
          }
        }
      }
    }
  }

  .main-content {
    flex: 1;
    margin-left: 240px;
    padding: 20px;
    max-width: calc(1200px - 240px);
    margin: 0 auto 0 240px;

    .profile-header {
      background: #fff;
      border-radius: 8px;
      padding: 24px;
      display: flex;
      align-items: flex-start;
      margin-bottom: 20px;

      .profile-avatar {
        position: relative;
        margin-right: 24px;
        cursor: pointer;

        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
        }

        .avatar-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          opacity: 0;
          transition: opacity 0.3s;

          i {
            font-size: 24px;
            margin-bottom: 4px;
          }

          span {
            font-size: 12px;
          }
        }

        &:hover .avatar-overlay {
          opacity: 1;
        }

        .level-tag {
          position: absolute;
          bottom: 0;
          right: 0;
          background: #00a1d6;
          color: #fff;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
        }
      }

      .profile-info {
        flex: 1;

        .username {
          font-size: 24px;
          font-weight: 500;
          color: #333;
          margin-bottom: 12px;
          display: flex;
          align-items: center;

          > span:first-child {
            cursor: pointer;
            &:hover {
              color: #00a1d6;
            }
          }

          .member-tag {
            margin-left: 12px;
            background: #fb7299;
            color: #fff;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;

            &.new-member {
              background: #909399;
            }
          }
        }

        .stats {
          display: flex;
          gap: 24px;
          margin-bottom: 16px;

          .stat-item {
            display: flex;
            align-items: center;
            gap: 8px;

            .coin-icon, .point-icon {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: #ffd700;
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-weight: bold;
            }

            .point-icon {
              background: #00a1d6;
            }

            .value {
              font-size: 16px;
              color: #666;
            }
          }
        }

        .exp-bar {
          width: 100%;
          max-width: 400px;
        }
      }

      .profile-actions {
        margin-left: auto;
      }
    }

    .content-area {
      background: #fff;
      border-radius: 8px;
      padding: 24px;

      h3 {
        margin: 0 0 20px;
        font-size: 18px;
        color: #333;
      }

      .info-form {
        max-width: 600px;
      }

      .avatar-section {
        display: flex;
        gap: 40px;
        align-items: flex-start;

        .current-avatar {
          img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
          }
        }

        .avatar-upload {
          flex: 1;
        }
      }

      .verify-status {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #67c23a;
        font-size: 16px;

        i {
          font-size: 24px;
        }
      }

      .invite-section {
        .invite-code {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 24px;

          .code-label {
            color: #666;
            margin-bottom: 8px;
          }

          .code-value {
            font-size: 24px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 12px;
          }
        }

        .invite-stats {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;

          .stat-card {
            flex: 1;
            background: #fff;
            border: 1px solid #eee;
            border-radius: 8px;
            padding: 20px;
            text-align: center;

            .stat-value {
              font-size: 24px;
              font-weight: 500;
              color: #00a1d6;
              margin-bottom: 8px;
            }

            .stat-label {
              color: #666;
            }
          }
        }

        .invite-rules {
          h4 {
            margin-bottom: 16px;
            color: #333;
          }

          p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 8px;
          }
        }
      }
    }
  }
}

::v-deep .avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 120px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:hover {
      border-color: #00a1d6;
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    margin-bottom: 8px;
  }

  .upload-text {
    color: #666;
    font-size: 14px;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}
</style> 