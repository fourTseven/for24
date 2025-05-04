<template>
  <div class="category">
    <!-- 分类标签区 -->
    <div class="category-tags">
      <el-scrollbar class="horizontal-scrollbar">
        <div class="tags-container">
          <span 
            v-for="tag in categoryTags" 
            :key="tag.id"
            :class="['tag', { active: currentTag === tag.id }]"
            @click="selectTag(tag.id)"
          >
            {{ tag.name }}
          </span>
        </div>
      </el-scrollbar>
    </div>

    <!-- 榜单区域 -->
    <div class="ranking-section">
      <!-- 阅读榜 -->
      <div class="ranking-list">
        <div class="ranking-header">
          <h3>{{ currentCategory }}·阅读榜 ></h3>
          <div class="ranking-time">仅展示原创作品，统计时间截止至05-03 24:00</div>
        </div>
        <div class="book-list">
          <div 
            v-for="(book, index) in readingRankBooks" 
            :key="book.id"
            class="book-item"
            @click="showBookDetail(book)"
          >
            <div class="rank-num">{{ index + 1 }}</div>
            <div class="book-content">
              <div class="book-main">
                <div class="book-title">{{ book.title }}</div>
                <div class="book-author">{{ book.author }}</div>
                <div class="book-tags">{{ book.tags }}</div>
              </div>
              <img :src="book.cover" class="book-cover" />
            </div>
          </div>
        </div>
      </div>

      <!-- 新书榜 -->
      <div class="ranking-list">
        <div class="ranking-header">
          <h3>{{ currentCategory }}·新书榜 ></h3>
          <div class="ranking-time">仅展示原创作品，统计时间截止至05-03 24:00</div>
        </div>
        <div class="book-list">
          <div 
            v-for="(book, index) in newBookRankBooks" 
            :key="book.id"
            class="book-item"
            @click="showBookDetail(book)"
          >
            <div class="rank-num">{{ index + 1 }}</div>
            <div class="book-content">
              <div class="book-main">
                <div class="book-title">{{ book.title }}</div>
                <div class="book-author">{{ book.author }}</div>
                <div class="book-tags">{{ book.tags }}</div>
              </div>
              <img :src="book.cover" class="book-cover" />
            </div>
          </div>
        </div>
      </div>
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
        <p><strong>简介：</strong>{{ currentBook.desc }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CategoryPage',
  data() {
    return {
      currentTag: 1,
      detailVisible: false,
      currentBook: null,
      categoryTags: [
        { id: 1, name: '科幻末世' },
        { id: 2, name: '都市日常' },
        { id: 3, name: '都市修真' },
        { id: 4, name: '都市高武' },
        { id: 5, name: '奇幻仙侠' },
        { id: 6, name: '历史古代' },
        { id: 7, name: '战神穿越' },
        { id: 8, name: '都市种田' },
        { id: 9, name: '传统玄幻' },
        { id: 10, name: '历史脑洞' },
        { id: 11, name: '悬疑脑洞' },
        { id: 12, name: '都市脑洞' },
        { id: 13, name: '女频' }
      ],
      readingRankBooks: [
        { 
          id: 1, 
          title: '冰河末世，我囤积了百亿物资', 
          author: '记忆商海', 
          category: '科幻末世', 
          cover: '/book1.jpg', 
          tags: '末世·重生·爽文·囤积物资·异能',
          desc: '末世来临，全球进入冰河时代，寒冬...' 
        },
        // ... 其他8本书
      ],
      newBookRankBooks: [
        { 
          id: 1, 
          title: '倒计时90天：华夏进入一级战备', 
          author: '作者1', 
          category: '科幻末世', 
          cover: '/book2.jpg', 
          tags: '末世·战备·紧张·生存',
          desc: '一场突如其来的危机...' 
        },
        // ... 其他8本书
      ]
    }
  },
  computed: {
    currentCategory() {
      const tag = this.categoryTags.find(tag => tag.id === this.currentTag)
      return tag ? tag.name : ''
    }
  },
  methods: {
    selectTag(tagId) {
      this.currentTag = tagId
      // 这里应该根据选中的标签加载对应分类的阅读榜和新书榜数据
      this.loadRankingData()
    },
    showBookDetail(book) {
      this.currentBook = book
      this.detailVisible = true
    },
    loadRankingData() {
      // 这里应该调用API获取对应分类的排行榜数据
      // 暂时使用模拟数据
      this.readingRankBooks = Array(9).fill(null).map((_, index) => ({
        id: index + 1,
        title: `${this.currentCategory}小说${index + 1}`,
        author: `作者${index + 1}`,
        category: this.currentCategory,
        cover: `/book${(index % 5) + 1}.jpg`,
        tags: '热门·精选·必看',
        desc: '精彩的故事内容...'
      }))

      this.newBookRankBooks = Array(9).fill(null).map((_, index) => ({
        id: index + 1,
        title: `最新${this.currentCategory}小说${index + 1}`,
        author: `作者${index + 1}`,
        category: this.currentCategory,
        cover: `/book${(index % 5) + 1}.jpg`,
        tags: '新书·精选·必看',
        desc: '精彩的故事内容...'
      }))
    }
  },
  created() {
    this.loadRankingData()
  }
}
</script>

<style lang="scss" scoped>
.category {
  padding: 20px 0;
  background: #f5f7fa;
  min-height: 100vh;
  width: 100vw;
  margin-left: -50vw;
  left: 50%;
  position: relative;

  .category-tags {
    background: #fff;
    padding: 10px 0;
    margin-bottom: 20px;
    width: 100%;
    overflow: hidden;

    .horizontal-scrollbar {
      width: 100%;
      ::v-deep .el-scrollbar__wrap {
        overflow-x: scroll;
        overflow-y: hidden;
      }
    }

    .tags-container {
      display: flex;
      padding: 0 20px;
      gap: 15px;
      white-space: nowrap;

      .tag {
        display: inline-block;
        font-size: 14px;
        color: #666;
        cursor: pointer;
        padding: 6px 16px;
        border-radius: 15px;
        transition: all 0.3s;
        background: #f7f7f7;

        &:hover {
          color: #ff6b00;
          background: #fff5f0;
        }

        &.active {
          color: #fff;
          background: #ff6b00;
        }
      }
    }
  }

  .ranking-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .ranking-list {
      background: #fff;
      border-radius: 8px;
      padding: 20px;

      .ranking-header {
        margin-bottom: 20px;

        h3 {
          font-size: 18px;
          font-weight: 500;
          color: #333;
          margin-bottom: 8px;
          cursor: pointer;

          &:hover {
            color: #ff6b00;
          }
        }

        .ranking-time {
          font-size: 12px;
          color: #999;
        }
      }

      .book-list {
        .book-item {
          display: flex;
          align-items: flex-start;
          padding: 15px 0;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;

          &:last-child {
            border-bottom: none;
          }

          &:hover {
            .book-title {
              color: #ff6b00;
            }
          }

          .rank-num {
            font-size: 16px;
            font-weight: 500;
            color: #999;
            margin-right: 15px;
            min-width: 24px;
            text-align: center;
          }

          .book-content {
            display: flex;
            justify-content: space-between;
            flex: 1;

            .book-main {
              flex: 1;
              margin-right: 15px;

              .book-title {
                font-size: 16px;
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
              }
            }

            .book-cover {
              width: 60px;
              height: 80px;
              object-fit: cover;
              border-radius: 4px;
            }
          }
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