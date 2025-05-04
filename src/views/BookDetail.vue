<template>
  <div class="book-detail">
    <!-- 顶部导航 -->
    <header class="header">
      <i class="el-icon-back" @click="$router.back()"></i>
      <div class="title">书籍详情</div>
      <div class="actions">
        <i class="el-icon-share"></i>
      </div>
    </header>

    <!-- 小说基本信息 -->
    <div class="book-info">
      <div class="book-cover">
        <img :src="book.cover" :alt="book.title">
      </div>
      <div class="book-meta">
        <h1>{{ book.title }}</h1>
        <p class="author">作者：{{ book.author }}</p>
        <p class="category">分类：{{ book.category }}</p>
        <p class="status">状态：{{ book.status }}</p>
        <p class="description">{{ book.description }}</p>
        <div class="actions">
          <el-button type="primary" @click="startReading">开始阅读</el-button>
          <el-button @click="addToBookshelf">加入书架</el-button>
        </div>
      </div>
    </div>

    <!-- 章节列表 -->
    <div class="chapter-list">
      <h2>目录</h2>
      <el-table :data="chapters" style="width: 100%">
        <el-table-column prop="title" label="章节名称"></el-table-column>
        <el-table-column prop="wordCount" label="字数" width="100"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="readChapter(scope.row.id)">阅读</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 阅读器弹窗 -->
    <el-dialog
      title="阅读"
      :visible.sync="readerVisible"
      fullscreen
      :before-close="handleReaderClose"
    >
      <div class="reader">
        <div class="reader-header">
          <h2>{{ currentChapter.title }}</h2>
          <div class="reader-controls">
            <el-button-group>
              <el-button size="small" @click="prevChapter">上一章</el-button>
              <el-button size="small" @click="nextChapter">下一章</el-button>
            </el-button-group>
            <el-button size="small" @click="toggleFullscreen">
              <i :class="isFullscreen ? 'el-icon-close' : 'el-icon-full-screen'"></i>
            </el-button>
          </div>
        </div>
        <div class="reader-content" :class="{ 'fullscreen': isFullscreen }">
          <div v-html="currentChapter.content"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BookDetail',
  data() {
    return {
      book: {
        id: 1,
        title: '修真世界',
        author: '作者1',
        category: '玄幻',
        status: '连载中',
        cover: '/book1.jpg',
        description: '这是一个修真世界的故事...'
      },
      chapters: [
        { id: 1, title: '第一章 开始', wordCount: 3000, updateTime: '2024-03-20' },
        { id: 2, title: '第二章 修炼', wordCount: 3500, updateTime: '2024-03-21' },
        { id: 3, title: '第三章 突破', wordCount: 4000, updateTime: '2024-03-22' }
      ],
      readerVisible: false,
      currentChapter: null,
      isFullscreen: false
    }
  },
  computed: {
    ...mapGetters(['isInBookshelf']),
    bookId() {
      return this.$route.params.id
    }
  },
  created() {
    this.fetchBookDetail()
    this.fetchChapters()
  },
  methods: {
    async fetchBookDetail() {
      try {
        // 这里应该调用实际的API
        // const response = await api.getBookDetail(this.bookId)
        // this.book = response.data
        
        // 模拟数据
        this.book = {
          id: this.bookId,
          title: '示例书籍',
          author: '示例作者',
          cover: 'https://via.placeholder.com/150',
          description: '这是一本示例书籍的简介...',
          wordCount: 100000,
          status: '连载中',
          tags: ['玄幻', '修仙']
        }
      } catch (error) {
        console.error('获取书籍详情失败:', error)
      }
    },
    async fetchChapters() {
      try {
        // 这里应该调用实际的API
        // const response = await api.getChapters(this.bookId)
        // this.chapters = response.data
        
        // 模拟数据
        this.chapters = [
          { id: 1, title: '第一章 开始' },
          { id: 2, title: '第二章 发展' },
          { id: 3, title: '第三章 高潮' }
        ]
      } catch (error) {
        console.error('获取章节列表失败:', error)
      }
    },
    startReading() {
      this.readChapter(this.chapters[0].id)
    },
    addToBookshelf() {
      this.$message.success('已加入书架')
    },
    readChapter(chapterId) {
      // 这里应该调用API获取章节内容
      this.currentChapter = {
        id: chapterId,
        title: this.chapters.find(c => c.id === chapterId).title,
        content: '这是章节内容...'
      }
      this.readerVisible = true
    },
    handleReaderClose() {
      this.readerVisible = false
      this.isFullscreen = false
    },
    prevChapter() {
      const currentIndex = this.chapters.findIndex(c => c.id === this.currentChapter.id)
      if (currentIndex > 0) {
        this.readChapter(this.chapters[currentIndex - 1].id)
      }
    },
    nextChapter() {
      const currentIndex = this.chapters.findIndex(c => c.id === this.currentChapter.id)
      if (currentIndex < this.chapters.length - 1) {
        this.readChapter(this.chapters[currentIndex + 1].id)
      }
    },
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen
    }
  }
}
</script>

<style lang="scss" scoped>
.book-detail {
  .header {
    display: flex;
    align-items: center;
    padding: 10px;
    background: #fff;
    
    .title {
      flex: 1;
      text-align: center;
    }
  }
  
  .book-info {
    display: flex;
    padding: 20px;
    background: #fff;
    
    .book-cover {
      width: 200px;
      margin-right: 30px;
      
      img {
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
      }
    }
    
    .book-meta {
      flex: 1;
      
      h1 {
        margin: 0 0 15px;
        font-size: 24px;
      }
      
      p {
        margin: 8px 0;
        color: #606266;
        
        &.description {
          margin-top: 20px;
          line-height: 1.6;
        }
      }
      
      .actions {
        margin-top: 20px;
      }
    }
  }
  
  .chapter-list {
    padding: 15px;
    background: #fff;
    margin-top: 10px;
    
    h2 {
      font-size: 16px;
      margin: 0 0 10px;
    }
  }

  .reader {
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .reader-header {
      padding: 10px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      h2 {
        margin: 0;
      }
    }
    
    .reader-content {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      font-size: 18px;
      line-height: 1.8;
      
      &.fullscreen {
        background: #f5f5f5;
        padding: 40px;
        max-width: 800px;
        margin: 0 auto;
      }
    }
  }
}
</style> 