<template>
  <div class="bookshelf">
    <!-- 书架标题 -->
    <div class="bookshelf-header">
      <h2>我的书架</h2>
      <div class="header-right">
        <el-button type="text" @click="isEditing = !isEditing">
          {{ isEditing ? '完成' : '编辑' }}
        </el-button>
      </div>
    </div>

    <!-- 书籍列表 -->
    <div class="book-list">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="4.8" :lg="4.8" v-for="book in books" :key="book.id" class="book-col">
          <div class="book-card" @click="showBookDetail(book)">
            <div class="book-cover">
              <img :src="book.cover" />
              <div class="reading-progress">
                已读{{ book.progress }}%
              </div>
              <el-checkbox 
                v-if="isEditing" 
                v-model="book.selected"
                class="book-checkbox"
                @click.stop
              ></el-checkbox>
            </div>
            <div class="book-info">
              <div class="book-title">{{ book.title }}</div>
              <div class="book-author">{{ book.author }}</div>
              <div class="update-info" v-if="book.hasUpdate">
                <span class="update-badge">更新</span>
                <span class="chapter">最新章节：{{ book.latestChapter }}</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-bar" v-if="isEditing">
      <div class="bottom-content">
        <div class="left">
          <el-checkbox v-model="selectAll" @change="handleSelectAll">全选</el-checkbox>
          <span class="selected-count">已选择 {{ selectedCount }} 本</span>
        </div>
        <div class="right">
          <el-button type="danger" :disabled="selectedCount === 0" @click="handleDelete">
            删除选中
          </el-button>
        </div>
      </div>
    </div>

    <!-- 书籍详情对话框 -->
    <el-dialog :visible.sync="detailVisible" title="书籍详情" width="400px">
      <div v-if="currentBook" class="book-detail">
        <div class="detail-header">
          <img :src="currentBook.cover" class="detail-cover" />
          <div class="detail-info">
            <h3>{{ currentBook.title }}</h3>
            <p class="author">{{ currentBook.author }}</p>
            <p class="progress">阅读进度：{{ currentBook.progress }}%</p>
            <div class="actions">
              <el-button type="primary" @click="continueReading">继续阅读</el-button>
              <el-button @click="removeFromShelf">移出书架</el-button>
            </div>
          </div>
        </div>
        <div class="detail-content">
          <p><strong>最新章节：</strong>{{ currentBook.latestChapter }}</p>
          <p><strong>更新时间：</strong>{{ currentBook.updateTime }}</p>
          <p><strong>简介：</strong>{{ currentBook.description }}</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'BookshelfPage',
  data() {
    return {
      isEditing: false,
      selectAll: false,
      detailVisible: false,
      currentBook: null,
      books: Array(12).fill(null).map((_, index) => ({
        id: index + 1,
        title: `书籍标题${index + 1}`,
        author: `作者${index + 1}`,
        cover: `/book${(index % 5) + 1}.jpg`,
        progress: Math.floor(Math.random() * 100),
        selected: false,
        hasUpdate: index % 3 === 0,
        latestChapter: `第${Math.floor(Math.random() * 1000 + 1)}章`,
        updateTime: '2024-03-05 12:30:00',
        description: '这是一本精彩的小说，内容非常吸引人。主角历经磨难，最终成就非凡。情节跌宕起伏，引人入胜...'
      }))
    }
  },
  computed: {
    selectedCount() {
      return this.books.filter(book => book.selected).length
    }
  },
  methods: {
    showBookDetail(book) {
      if (!this.isEditing) {
        this.currentBook = book
        this.detailVisible = true
      }
    },
    handleSelectAll(val) {
      this.books.forEach(book => {
        book.selected = val
      })
    },
    handleDelete() {
      this.$confirm('确定要删除选中的书籍吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.books = this.books.filter(book => !book.selected)
        this.isEditing = false
        this.$message.success('删除成功')
      }).catch(() => {})
    },
    continueReading() {
      // 这里添加继续阅读的逻辑
      this.$router.push(`/book/${this.currentBook.id}`)
    },
    removeFromShelf() {
      this.$confirm('确定要将这本书移出书架吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.books = this.books.filter(book => book.id !== this.currentBook.id)
        this.detailVisible = false
        this.$message.success('已移出书架')
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.bookshelf {
  padding: 20px 0;
  background: #f5f7fa;
  min-height: 100vh;
  width: 100vw;
  margin-left: -50vw;
  left: 50%;
  position: relative;

  .bookshelf-header {
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
  }

  .book-list {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;

    .book-col {
      margin-bottom: 20px;
    }

    .book-card {
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      .book-cover {
        position: relative;
        width: 100%;
        height: 280px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .reading-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 8px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          font-size: 12px;
          text-align: center;
        }

        .book-checkbox {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 1;
        }
      }

      .book-info {
        padding: 12px;

        .book-title {
          font-size: 16px;
          font-weight: 500;
          color: #333;
          margin-bottom: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .book-author {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }

        .update-info {
          display: flex;
          align-items: center;
          gap: 8px;

          .update-badge {
            background: #ff6b00;
            color: #fff;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 12px;
          }

          .chapter {
            font-size: 12px;
            color: #999;
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }

  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;

    .bottom-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;
        gap: 20px;

        .selected-count {
          color: #666;
          font-size: 14px;
        }
      }
    }
  }
}

.book-detail {
  .detail-header {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    .detail-cover {
      width: 120px;
      height: 160px;
      object-fit: cover;
      border-radius: 4px;
    }

    .detail-info {
      flex: 1;

      h3 {
        font-size: 18px;
        font-weight: 500;
        color: #333;
        margin: 0 0 10px;
      }

      .author {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
      }

      .progress {
        font-size: 14px;
        color: #666;
        margin-bottom: 15px;
      }

      .actions {
        display: flex;
        gap: 10px;
      }
    }
  }

  .detail-content {
    p {
      margin-bottom: 10px;
      font-size: 14px;
      color: #666;
      line-height: 1.6;

      strong {
        color: #333;
        font-weight: 500;
      }
    }
  }
}
</style> 