<template>
  <div class="daily">
    <h1>每日精品</h1>
    <el-row :gutter="24">
      <el-col :span="6" v-for="book in books" :key="book.id">
        <div class="book-card" @click="showBookDetail(book)">
          <img :src="book.cover" class="book-cover" />
          <div class="book-info">
            <h3>{{ book.title }}</h3>
            <p>{{ book.author }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="detailVisible" title="书籍详情" width="400px">
      <div v-if="currentBook">
        <p><strong>书名：</strong>{{ currentBook.title }}</p>
        <p><strong>作者：</strong>{{ currentBook.author }}</p>
        <p><strong>出版日期：</strong>{{ currentBook.date }}</p>
        <p><strong>简介：</strong>{{ currentBook.desc }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DailyPage',
  data() {
    return {
      books: [
        { id: 1, title: '修真世界', author: '作者1', date: '2024-05-01', desc: '修真世界的故事...', cover: '/book1.jpg' },
        { id: 2, title: '都市传说', author: '作者2', date: '2024-04-28', desc: '都市传说的故事...', cover: '/book2.jpg' },
        { id: 3, title: '科幻未来', author: '作者3', date: '2024-04-20', desc: '科幻未来的故事...', cover: '/book3.jpg' },
        { id: 4, title: '武侠风云', author: '作者4', date: '2024-03-15', desc: '武侠风云的故事...', cover: '/book4.jpg' }
      ],
      detailVisible: false,
      currentBook: null
    }
  },
  methods: {
    showBookDetail(book) {
      this.currentBook = book
      this.detailVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.daily {
  padding: 32px 10vw 32px 10vw;
  background: #f5f7fa;
  min-height: 80vh;
  h1 {
    margin-bottom: 24px;
  }
  .book-card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
    padding: 18px;
    margin-bottom: 24px;
    cursor: pointer;
    transition: box-shadow 0.2s;
    &:hover {
      box-shadow: 0 4px 16px 0 rgba(0,0,0,0.08);
    }
    .book-cover {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 12px;
    }
    .book-info {
      h3 {
        margin: 0 0 8px 0;
        font-size: 16px;
        color: #303133;
      }
      p {
        margin: 0;
        color: #909399;
        font-size: 14px;
      }
    }
  }
}
</style> 