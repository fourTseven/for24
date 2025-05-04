<template>
  <div class="library">
    <!-- 筛选条件区 -->
    <div class="filter-section">
      <div class="filter-row">
        <div class="filter-label">读者：</div>
        <div class="filter-options">
          <span 
            v-for="item in readerOptions" 
            :key="item.value"
            :class="['option', { active: selectedReader === item.value }]"
            @click="selectReader(item.value)"
          >
            {{ item.label }}
          </span>
        </div>
      </div>
      <div class="filter-row">
        <div class="filter-label">分类：</div>
        <div class="filter-options">
          <span 
            v-for="item in categoryOptions" 
            :key="item.value"
            :class="['option', { active: selectedCategory === item.value }]"
            @click="selectCategory(item.value)"
          >
            {{ item.label }}
          </span>
        </div>
      </div>
      <div class="filter-row">
        <div class="filter-label">状态：</div>
        <div class="filter-options">
          <span 
            v-for="item in statusOptions" 
            :key="item.value"
            :class="['option', { active: selectedStatus === item.value }]"
            @click="selectStatus(item.value)"
          >
            {{ item.label }}
          </span>
        </div>
      </div>
      <div class="filter-row">
        <div class="filter-label">字数：</div>
        <div class="filter-options">
          <span 
            v-for="item in wordCountOptions" 
            :key="item.value"
            :class="['option', { active: selectedWordCount === item.value }]"
            @click="selectWordCount(item.value)"
          >
            {{ item.label }}
          </span>
        </div>
      </div>
    </div>

    <!-- 排序选项 -->
    <div class="sort-section">
      <div class="sort-options">
        <span 
          v-for="item in sortOptions" 
          :key="item.value"
          :class="['sort-item', { active: selectedSort === item.value }]"
          @click="selectSort(item.value)"
        >
          {{ item.label }}
        </span>
      </div>
    </div>

    <!-- 书籍列表 -->
    <div class="book-list">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="4.8" :lg="4.8" v-for="book in filteredBooks" :key="book.id" class="book-col">
          <div class="book-card" @click="showBookDetail(book)">
            <img :src="book.cover" class="book-cover" />
            <div class="book-info">
              <div class="book-title">{{ book.title }}</div>
              <div class="book-author">作者：{{ book.author }}</div>
              <div class="book-status">{{ book.status }} {{ book.wordCount }}万字</div>
              <div class="book-desc">{{ book.desc }}</div>
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
        <p><strong>状态：</strong>{{ currentBook.status }}</p>
        <p><strong>字数：</strong>{{ currentBook.wordCount }}万字</p>
        <p><strong>简介：</strong>{{ currentBook.desc }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'LibraryPage',
  data() {
    return {
      detailVisible: false,
      currentBook: null,
      // 筛选选项
      selectedReader: 'all',
      selectedCategory: 'all',
      selectedStatus: 'all',
      selectedWordCount: 'all',
      selectedSort: 'hot',
      // 选项数据
      readerOptions: [
        { value: 'all', label: '全部' },
        { value: 'male', label: '男生' },
        { value: 'female', label: '女生' }
      ],
      categoryOptions: [
        { value: 'all', label: '全部' },
        { value: 'theme', label: '主题' },
        { value: 'character', label: '角色' },
        { value: 'plot', label: '情节' }
      ],
      statusOptions: [
        { value: 'all', label: '全部' },
        { value: 'completed', label: '已完结' },
        { value: 'ongoing', label: '连载中' }
      ],
      wordCountOptions: [
        { value: 'all', label: '全部' },
        { value: 'under30', label: '30万以下' },
        { value: '30to50', label: '30-50万' },
        { value: '50to100', label: '50-100万' },
        { value: '100to200', label: '100-200万' },
        { value: 'over200', label: '200万以上' }
      ],
      sortOptions: [
        { value: 'hot', label: '最热' },
        { value: 'new', label: '最新' },
        { value: 'wordCount', label: '字数' }
      ],
      // 书籍数据
      books: Array(20).fill(null).map((_, index) => ({
        id: index + 1,
        title: `书籍标题${index + 1}`,
        author: `作者${index + 1}`,
        status: index % 2 === 0 ? '连载中' : '已完结',
        wordCount: Math.floor(Math.random() * 200 + 30),
        desc: '这是一本精彩的小说，内容非常吸引人...',
        cover: `/book${(index % 5) + 1}.jpg`,
        reader: index % 2 === 0 ? 'male' : 'female',
        category: ['theme', 'character', 'plot'][index % 3]
      }))
    }
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book => {
        // 读者筛选
        if (this.selectedReader !== 'all' && book.reader !== this.selectedReader) return false
        // 分类筛选
        if (this.selectedCategory !== 'all' && book.category !== this.selectedCategory) return false
        // 状态筛选
        if (this.selectedStatus !== 'all') {
          const isCompleted = book.status === '已完结'
          if (this.selectedStatus === 'completed' && !isCompleted) return false
          if (this.selectedStatus === 'ongoing' && isCompleted) return false
        }
        // 字数筛选
        if (this.selectedWordCount !== 'all') {
          const wordCount = book.wordCount
          switch (this.selectedWordCount) {
            case 'under30':
              if (wordCount >= 30) return false
              break
            case '30to50':
              if (wordCount < 30 || wordCount >= 50) return false
              break
            case '50to100':
              if (wordCount < 50 || wordCount >= 100) return false
              break
            case '100to200':
              if (wordCount < 100 || wordCount >= 200) return false
              break
            case 'over200':
              if (wordCount < 200) return false
              break
          }
        }
        return true
      }).sort((a, b) => {
        // 排序
        switch (this.selectedSort) {
          case 'hot':
            return b.id - a.id // 示例排序，实际应该根据热度值排序
          case 'new':
            return b.id - a.id
          case 'wordCount':
            return b.wordCount - a.wordCount
          default:
            return 0
        }
      })
    }
  },
  methods: {
    selectReader(value) {
      this.selectedReader = value
    },
    selectCategory(value) {
      this.selectedCategory = value
    },
    selectStatus(value) {
      this.selectedStatus = value
    },
    selectWordCount(value) {
      this.selectedWordCount = value
    },
    selectSort(value) {
      this.selectedSort = value
    },
    showBookDetail(book) {
      this.currentBook = book
      this.detailVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.library {
  padding: 20px 0;
  background: #f5f7fa;
  min-height: 100vh;
  width: 100vw;
  margin-left: -50vw;
  left: 50%;
  position: relative;

  .filter-section {
    background: #fff;
    padding: 20px;
    margin-bottom: 20px;

    .filter-row {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      .filter-label {
        width: 60px;
        color: #999;
        font-size: 14px;
      }

      .filter-options {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 15px;

        .option {
          font-size: 14px;
          color: #666;
          cursor: pointer;
          padding: 5px 12px;
          border-radius: 15px;
          background: #f7f7f7;
          transition: all 0.3s;

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
  }

  .sort-section {
    background: #fff;
    padding: 15px 20px;
    margin-bottom: 20px;

    .sort-options {
      display: flex;
      gap: 20px;

      .sort-item {
        font-size: 14px;
        color: #666;
        cursor: pointer;
        position: relative;
        padding: 0 4px;
        transition: all 0.3s;

        &.active {
          color: #ff6b00;
          font-weight: 500;

          &::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 2px;
            background: #ff6b00;
          }
        }

        &:hover:not(.active) {
          color: #ff6b00;
        }
      }
    }
  }

  .book-list {
    padding: 0 20px;
    max-width: 1200px;
    margin: 0 auto;

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
        width: 100%;
        height: 280px;
        object-fit: cover;
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
          margin-bottom: 4px;
        }

        .book-status {
          font-size: 14px;
          color: #999;
          margin-bottom: 8px;
        }

        .book-desc {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
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