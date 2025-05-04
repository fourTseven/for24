<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="search-header">
      <el-input
        v-model="searchQuery"
        placeholder="搜索书名/作者"
        prefix-icon="el-icon-search"
        clearable
        @keyup.enter.native="handleSearch"
      >
        <el-button slot="append" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </el-input>
    </div>

    <!-- 搜索历史 -->
    <div v-if="!searchQuery && searchHistory.length > 0" class="search-history">
      <div class="history-header">
        <h3>搜索历史</h3>
        <el-button type="text" @click="clearHistory">清空历史</el-button>
      </div>
      <div class="history-tags">
        <el-tag
          v-for="(item, index) in searchHistory"
          :key="index"
          closable
          @close="removeHistoryItem(index)"
          @click="searchHistoryItem(item)"
        >
          {{ item }}
        </el-tag>
      </div>
    </div>

    <!-- 热门搜索 -->
    <div v-if="!searchQuery" class="hot-search">
      <h3>热门搜索</h3>
      <div class="hot-tags">
        <el-tag
          v-for="(item, index) in hotSearches"
          :key="index"
          :type="index < 3 ? 'danger' : ''"
          @click="searchHistoryItem(item)"
        >
          {{ item }}
        </el-tag>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div v-if="searchQuery" class="search-results">
      <div class="result-header">
        <h3>搜索结果：{{ searchQuery }}</h3>
        <el-radio-group v-model="sortBy" size="small">
          <el-radio-button label="relevance">相关度</el-radio-button>
          <el-radio-button label="latest">最新</el-radio-button>
          <el-radio-button label="hot">热门</el-radio-button>
        </el-radio-group>
      </div>

      <el-table
        v-loading="loading"
        :data="searchResults"
        style="width: 100%"
      >
        <el-table-column width="80">
          <template slot-scope="scope">
            <img :src="scope.row.cover" :alt="scope.row.title" class="book-cover">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="书名">
          <template slot-scope="scope">
            <div class="book-title" @click="viewBook(scope.row)">
              {{ scope.row.title }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="120"></el-table-column>
        <el-table-column prop="category" label="分类" width="100"></el-table-column>
        <el-table-column prop="status" label="状态" width="100"></el-table-column>
        <el-table-column prop="wordCount" label="字数" width="100"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          @current-change="handlePageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  data() {
    return {
      searchQuery: '',
      searchHistory: [],
      hotSearches: ['修真世界', '都市传说', '科幻未来', '武侠风云', '玄幻小说'],
      loading: false,
      searchResults: [],
      sortBy: 'relevance',
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  created() {
    // 从 localStorage 获取搜索历史
    const history = localStorage.getItem('searchHistory')
    if (history) {
      this.searchHistory = JSON.parse(history)
    }
    
    // 如果有搜索参数，执行搜索
    if (this.$route.query.q) {
      this.searchQuery = this.$route.query.q
      this.handleSearch()
    }
  },
  methods: {
    handleSearch() {
      if (!this.searchQuery.trim()) return
      
      // 保存到搜索历史
      if (!this.searchHistory.includes(this.searchQuery)) {
        this.searchHistory.unshift(this.searchQuery)
        if (this.searchHistory.length > 10) {
          this.searchHistory.pop()
        }
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
      }
      
      this.loading = true
      // 这里应该调用实际的搜索 API
      setTimeout(() => {
        this.searchResults = [
          {
            id: 1,
            title: '修真世界',
            author: '作者1',
            category: '玄幻',
            status: '连载中',
            wordCount: '100万字',
            cover: '/book1.jpg'
          },
          {
            id: 2,
            title: '都市传说',
            author: '作者2',
            category: '都市',
            status: '已完结',
            wordCount: '80万字',
            cover: '/book2.jpg'
          }
        ]
        this.total = 100
        this.loading = false
      }, 500)
    },
    clearHistory() {
      this.$confirm('确定要清空搜索历史吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.searchHistory = []
        localStorage.removeItem('searchHistory')
      }).catch(() => {})
    },
    removeHistoryItem(index) {
      this.searchHistory.splice(index, 1)
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
    },
    searchHistoryItem(item) {
      this.searchQuery = item
      this.handleSearch()
    },
    handlePageChange(page) {
      this.currentPage = page
      this.handleSearch()
    },
    viewBook(book) {
      this.$router.push({
        name: 'BookDetail',
        params: { id: book.id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  padding: 20px;

  .search-header {
    margin-bottom: 20px;
  }

  .search-history,
  .hot-search {
    margin-bottom: 30px;

    h3 {
      margin-bottom: 15px;
      font-size: 16px;
      color: #303133;
    }

    .history-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
  }

  .history-tags,
  .hot-tags {
    .el-tag {
      margin: 0 10px 10px 0;
      cursor: pointer;
    }
  }

  .search-results {
    .result-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h3 {
        margin: 0;
        font-size: 16px;
      }
    }

    .book-cover {
      width: 50px;
      height: 70px;
      object-fit: cover;
      border-radius: 4px;
    }

    .book-title {
      color: #303133;
      cursor: pointer;

      &:hover {
        color: #409EFF;
      }
    }
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style> 