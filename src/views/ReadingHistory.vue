<template>
  <div class="reading-history">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>阅读历史</h2>
      <div class="header-right">
        <el-button type="text" @click="clearHistory">
          <i class="el-icon-delete"></i>
          清空历史
        </el-button>
      </div>
    </div>

    <!-- 历史记录列表 -->
    <div class="history-list">
      <el-row :gutter="20">
        <el-col 
          :xs="24" 
          :sm="12" 
          :md="8" 
          :lg="8" 
          v-for="(book, index) in historyBooks" 
          :key="book.id"
          class="book-col"
        >
          <div class="book-item" @click="showBookDetail(book)">
            <div class="book-content">
              <div class="rank-num">{{ index + 1 }}</div>
              <div class="book-main">
                <div class="book-title">{{ book.title }}</div>
                <div class="book-author">{{ book.author }}</div>
                <div class="book-tags">{{ book.tags }}</div>
                <div class="read-info">
                  <span class="chapter">已读至：{{ book.lastChapter }}</span>
                  <span class="time">{{ book.lastReadTime }}</span>
                </div>
              </div>
              <img :src="book.cover" class="book-cover" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 返回顶部按钮 -->
    <el-backtop :right="40" :bottom="60" class="custom-backtop">
      <div class="backtop-content">
        <i class="el-icon-top"></i>
        <span>返回顶部</span>
      </div>
    </el-backtop>

    <!-- 书籍详情对话框 -->
    <el-dialog :visible.sync="detailVisible" title="书籍详情" width="400px">
      <div v-if="currentBook">
        <p><strong>书名：</strong>{{ currentBook.title }}</p>
        <p><strong>作者：</strong>{{ currentBook.author }}</p>
        <p><strong>分类：</strong>{{ currentBook.category }}</p>
        <p><strong>标签：</strong>{{ currentBook.tags }}</p>
        <p><strong>上次阅读：</strong>{{ currentBook.lastChapter }}</p>
        <p><strong>阅读时间：</strong>{{ currentBook.lastReadTime }}</p>
        <p><strong>简介：</strong>{{ currentBook.desc }}</p>
        <div class="dialog-footer" style="margin-top: 20px">
          <el-button @click="continueReading(currentBook)">继续阅读</el-button>
          <el-button type="danger" @click="removeFromHistory(currentBook)">删除记录</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ReadingHistory',
  data() {
    return {
      detailVisible: false,
      currentBook: null,
      historyBooks: Array(9).fill(null).map((_, index) => ({
        id: index + 1,
        title: `玄幻奇幻小说${index + 1}`,
        author: `作者${index + 1}`,
        cover: `/book${(index % 5) + 1}.jpg`,
        category: '玄幻',
        tags: '热血 · 修真 · 仙侠',
        lastChapter: `第${Math.floor(Math.random() * 100 + 1)}章 精彩内容`,
        lastReadTime: '2024-03-05 12:30',
        desc: '这是一本精彩的小说，内容非常吸引人。主角历经磨难，最终成就非凡。情节跌宕起伏，引人入胜...'
      }))
    }
  },
  methods: {
    showBookDetail(book) {
      this.currentBook = book
      this.detailVisible = true
    },
    continueReading(book) {
      this.$router.push(`/book/${book.id}`)
    },
    removeFromHistory(book) {
      this.$confirm('确定要删除这条阅读记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.historyBooks = this.historyBooks.filter(item => item.id !== book.id)
        this.detailVisible = false
        this.$message.success('删除成功')
      }).catch(() => {})
    },
    clearHistory() {
      this.$confirm('确定要清空所有阅读记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.historyBooks = []
        this.$message.success('清空成功')
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.reading-history {
  padding: 20px 0;
  background: #f5f7fa;
  min-height: 100vh;
  width: 100vw;
  margin-left: -50vw;
  left: 50%;
  position: relative;

  .page-header {
    max-width: 1200px;
    margin: 0 auto 20px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 24px;
      font-weight: 500;
      color: #333;
      margin: 0;
    }

    .header-right {
      .el-button {
        font-size: 14px;
        
        i {
          margin-right: 4px;
        }
      }
    }
  }

  .history-list {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;

    .book-col {
      margin-bottom: 20px;
    }

    .book-item {
      background: #fff;
      border-radius: 8px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

        .book-title {
          color: #00a1d6;
        }
      }

      .book-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .rank-num {
          font-size: 20px;
          font-weight: 500;
          color: #999;
          margin-right: 15px;
          min-width: 28px;
        }

        .book-main {
          flex: 1;
          margin-right: 20px;

          .book-title {
            font-size: 18px;
            font-weight: 500;
            color: #333;
            margin-bottom: 8px;
            transition: color 0.3s;
          }

          .book-author {
            font-size: 14px;
            color: #666;
            margin-bottom: 8px;
          }

          .book-tags {
            font-size: 12px;
            color: #999;
            margin-bottom: 12px;
          }

          .read-info {
            font-size: 12px;
            color: #666;

            .chapter {
              display: block;
              margin-bottom: 4px;
            }

            .time {
              color: #999;
            }
          }
        }

        .book-cover {
          width: 90px;
          height: 120px;
          object-fit: cover;
          border-radius: 4px;
        }
      }
    }
  }

  .custom-backtop {
    height: auto !important;
    width: auto !important;
    background-color: rgba(0, 0, 0, 0.6) !important;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    padding: 8px 12px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8) !important;
    }

    .backtop-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      
      i {
        font-size: 20px;
        margin-bottom: 2px;
      }

      span {
        font-size: 12px;
        line-height: 1;
      }
    }
  }
}
</style> 