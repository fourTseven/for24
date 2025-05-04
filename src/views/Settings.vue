<template>
  <div class="settings">
    <div class="settings-content">
      <h2 class="page-title">设置</h2>

      <!-- 阅读设置 -->
      <el-card class="setting-card">
        <div slot="header">
          <span>阅读设置</span>
        </div>
        <div class="setting-section">
          <div class="setting-item">
            <span class="label">字体大小</span>
            <div class="control">
              <el-slider
                v-model="settings.fontSize"
                :min="12"
                :max="24"
                :step="1"
                show-input
                :input-size="'mini'"
                @change="saveSetting()"
              ></el-slider>
            </div>
          </div>
          <div class="setting-item">
            <span class="label">阅读主题</span>
            <div class="control theme-selector">
              <div
                v-for="theme in themes"
                :key="theme.name"
                :class="['theme-item', { active: settings.theme === theme.name }]"
                :style="{ background: theme.background, color: theme.color }"
                @click="selectTheme(theme.name)"
              >
                {{ theme.label }}
              </div>
            </div>
          </div>
          <div class="setting-item">
            <span class="label">行间距</span>
            <div class="control">
              <el-select v-model="settings.lineHeight" size="small" @change="saveSetting()">
                <el-option label="紧凑" value="1.5"></el-option>
                <el-option label="适中" value="1.8"></el-option>
                <el-option label="宽松" value="2"></el-option>
              </el-select>
            </div>
          </div>
          <div class="setting-item">
            <span class="label">字体选择</span>
            <div class="control">
              <el-select v-model="settings.fontFamily" size="small" @change="saveSetting()">
                <el-option label="系统默认" value="system"></el-option>
                <el-option label="黑体" value="SimHei"></el-option>
                <el-option label="宋体" value="SimSun"></el-option>
                <el-option label="楷体" value="KaiTi"></el-option>
              </el-select>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 通知设置 -->
      <el-card class="setting-card">
        <div slot="header">
          <span>通知设置</span>
        </div>
        <div class="setting-section">
          <div class="setting-item">
            <span class="label">更新提醒</span>
            <div class="control">
              <el-switch
                v-model="settings.updateNotification"
                @change="saveSetting()"
              ></el-switch>
            </div>
          </div>
          <div class="setting-item">
            <span class="label">每日推荐</span>
            <div class="control">
              <el-switch
                v-model="settings.dailyRecommendation"
                @change="saveSetting()"
              ></el-switch>
            </div>
          </div>
          <div class="setting-item">
            <span class="label">私信提醒</span>
            <div class="control">
              <el-switch
                v-model="settings.messageNotification"
                @change="saveSetting()"
              ></el-switch>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 隐私设置 -->
      <el-card class="setting-card">
        <div slot="header">
          <span>隐私设置</span>
        </div>
        <div class="setting-section">
          <div class="setting-item">
            <span class="label">公开阅读历史</span>
            <div class="control">
              <el-switch
                v-model="settings.publicReadingHistory"
                @change="saveSetting()"
              ></el-switch>
            </div>
          </div>
          <div class="setting-item">
            <span class="label">公开书架</span>
            <div class="control">
              <el-switch
                v-model="settings.publicBookshelf"
                @change="saveSetting()"
              ></el-switch>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 缓存设置 -->
      <el-card class="setting-card">
        <div slot="header">
          <span>缓存设置</span>
        </div>
        <div class="setting-section">
          <div class="setting-item">
            <span class="label">自动缓存章节数</span>
            <div class="control">
              <el-input-number
                v-model="settings.cacheChapters"
                :min="1"
                :max="50"
                size="small"
                @change="saveSetting()"
              ></el-input-number>
            </div>
          </div>
          <div class="setting-item">
            <span class="label">当前缓存大小</span>
            <div class="control">
              <span class="cache-size">{{ cacheSize }}MB</span>
              <el-button type="text" @click="clearCache">清除缓存</el-button>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 其他设置 -->
      <el-card class="setting-card">
        <div slot="header">
          <span>其他设置</span>
        </div>
        <div class="setting-section">
          <div class="setting-item">
            <span class="label">自动签到</span>
            <div class="control">
              <el-switch
                v-model="settings.autoCheckIn"
                @change="saveSetting()"
              ></el-switch>
            </div>
          </div>
          <div class="setting-item">
            <span class="label">检查更新</span>
            <div class="control">
              <el-button size="small" @click="checkUpdate">检查更新</el-button>
              <span class="version-info">当前版本：v1.0.0</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserSettings',
  data() {
    return {
      settings: {
        fontSize: 16,
        theme: 'light',
        lineHeight: '1.8',
        fontFamily: 'system',
        updateNotification: true,
        dailyRecommendation: true,
        messageNotification: true,
        publicReadingHistory: false,
        publicBookshelf: false,
        cacheChapters: 5,
        autoCheckIn: true
      },
      themes: [
        { name: 'light', label: '浅色', background: '#ffffff', color: '#333333' },
        { name: 'sepia', label: '护眼', background: '#f5e6d3', color: '#5c4b51' },
        { name: 'dark', label: '深色', background: '#333333', color: '#ffffff' }
      ],
      cacheSize: 12.5
    }
  },
  created() {
    // 从本地存储加载设置
    const savedSettings = localStorage.getItem('readingSettings')
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) }
    }
  },
  methods: {
    saveSetting() {
      // 保存到本地存储
      localStorage.setItem('readingSettings', JSON.stringify(this.settings))
      this.$message.success('设置已保存')
    },
    selectTheme(theme) {
      this.settings.theme = theme
      this.saveSetting()
    },
    clearCache() {
      this.$confirm('确定要清除缓存吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cacheSize = 0
        this.$message.success('缓存已清除')
      }).catch(() => {})
    },
    checkUpdate() {
      this.$message.info('已是最新版本')
    }
  }
}
</script>

<style lang="scss" scoped>
.settings {
  padding: 20px 0;
  background: #f5f7fa;
  min-height: 100vh;
  width: 100vw;
  margin-left: -50vw;
  left: 50%;
  position: relative;

  .settings-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;

    .page-title {
      font-size: 24px;
      font-weight: 500;
      color: #333;
      margin: 0 0 20px;
    }

    .setting-card {
      margin-bottom: 20px;
      border-radius: 8px;
      
      ::v-deep .el-card__header {
        padding: 15px 20px;
        border-bottom: 1px solid #ebeef5;
        font-size: 16px;
        font-weight: 500;
      }
    }

    .setting-section {
      padding: 20px;

      .setting-item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }

        .label {
          width: 120px;
          color: #606266;
          font-size: 14px;
        }

        .control {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;

          .version-info {
            color: #909399;
            font-size: 13px;
            margin-left: 10px;
          }

          .cache-size {
            color: #606266;
            margin-right: 20px;
          }
        }
      }

      .theme-selector {
        display: flex;
        gap: 15px;

        .theme-item {
          width: 80px;
          height: 40px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 2px solid transparent;
          font-size: 14px;
          transition: all 0.3s;

          &.active {
            border-color: #00a1d6;
          }

          &:hover {
            transform: translateY(-2px);
          }
        }
      }
    }
  }
}
</style> 