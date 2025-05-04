<template>
  <div class="reader" :class="{ 'night-mode': isNightMode }">
    <!-- 顶部导航 -->
    <header class="header" v-show="!isFullScreen">
      <i class="el-icon-back" @click="$router.back()"></i>
      <div class="title">{{ book.title }}</div>
      <div class="actions">
        <i class="el-icon-moon" @click="toggleNightMode"></i>
      </div>
    </header>

    <!-- 阅读内容 -->
    <div class="content" @click="toggleFullScreen">
      <div class="chapter-title">{{ chapter.title }}</div>
      <div class="chapter-content" v-html="chapter.content"></div>
    </div>

    <!-- 底部导航 -->
    <footer class="footer" v-show="!isFullScreen">
      <div class="progress">
        <span>{{ currentPage }}/{{ totalPages }}</span>
        <el-progress :percentage="progress" :show-text="false"></el-progress>
      </div>
      <div class="controls">
        <el-button-group>
          <el-button @click="prevChapter" :disabled="!hasPrevChapter">上一章</el-button>
          <el-button @click="nextChapter" :disabled="!hasNextChapter">下一章</el-button>
        </el-button-group>
      </div>
    </footer>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'Reader',
  data() {
    return {
      book: {
        id: null,
        title: ''
      },
      chapter: {
        id: null,
        title: '',
        content: ''
      },
      isNightMode: false,
      isFullScreen: false,
      currentPage: 1,
      totalPages: 1,
      progress: 0
    }
  },
  computed: {
    bookId() {
      return this.$route.params.bookId
    },
    chapterId() {
      return this.$route.params.chapterId
    },
    hasPrevChapter() {
      return this.chapter.id > 1
    },
    hasNextChapter() {
      return this.chapter.id < this.totalPages
    }
  },
  created() {
    this.fetchChapter()
  },
  methods: {
    async fetchChapter() {
      try {
        // 这里应该调用实际的API
        // const response = await api.getChapterContent(this.bookId, this.chapterId)
        // this.chapter = response.data
        
        // 模拟数据
        this.chapter = {
          id: this.chapterId,
          title: '第一章 开始',
          content: '<p>这是第一章的内容...</p><p>这是第二段内容...</p>'
        }
      } catch (error) {
        console.error('获取章节内容失败:', error)
      }
    },
    toggleNightMode() {
      this.isNightMode = !this.isNightMode
    },
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen
    },
    prevChapter() {
      if (this.hasPrevChapter) {
        this.$router.push(`/book/${this.bookId}/chapter/${this.chapter.id - 1}`)
      }
    },
    nextChapter() {
      if (this.hasNextChapter) {
        this.$router.push(`/book/${this.bookId}/chapter/${this.chapter.id + 1}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.reader {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  color: #333;
  
  &.night-mode {
    background: #1a1a1a;
    color: #ccc;
  }
  
  .header {
    display: flex;
    align-items: center;
    padding: 10px;
    background: rgba(255, 255, 255, 0.9);
    
    .title {
      flex: 1;
      text-align: center;
    }
  }
  
  .content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    line-height: 1.8;
    
    .chapter-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
      text-align: center;
    }
    
    .chapter-content {
      font-size: 16px;
      
      p {
        margin-bottom: 1em;
        text-indent: 2em;
      }
    }
  }
  
  .footer {
    padding: 10px;
    background: rgba(255, 255, 255, 0.9);
    
    .progress {
      margin-bottom: 10px;
      
      span {
        display: block;
        text-align: center;
        margin-bottom: 5px;
      }
    }
    
    .controls {
      display: flex;
      justify-content: center;
    }
  }
}
</style> 