<template>
  <div class="home">
    <!-- 主视觉大横幅轮播图 -->
    <el-carousel height="320px" class="main-banner" indicator-position="outside">
      <el-carousel-item v-for="item in banners" :key="item.id">
        <div class="banner-content">
          <img :src="item.image" class="banner-bg" />
          <div class="banner-text">
            <h1>{{ item.title }}</h1>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 功能区块 -->
    <div class="feature-blocks">
      <el-row :gutter="30">
        <el-col :span="8" v-for="feature in features" :key="feature.title">
          <div class="feature-card" @click="goFeature(feature)">
            <div class="feature-title">{{ feature.title }}</div>
            <div class="feature-desc">{{ feature.desc }}</div>
            <i class="el-icon-arrow-right feature-arrow"></i>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 榜单和资讯区 -->
    <div class="main-section">
      <div class="ranking-section">
        <div class="section-title">
          <span>owo巅峰榜</span>
          <span class="section-sub">根据作品好评、热度、互动等综合得分排行</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="book in rankingBooks" :key="book.id">
            <div class="rank-book-card" @click="showBookDetail(book)">
              <img :src="book.cover" class="rank-book-cover" />
              <div class="rank-book-info">
                <div class="rank-book-title">{{ book.title }}</div>
                <div class="rank-book-author">{{ book.author }}</div>
                <div class="rank-book-category">{{ book.category }}</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 留白区域 -->
      <div class="news-section" style="height: 200px; background: transparent;"></div>
    </div>

    <!-- 新增书籍展示区 -->
    <div class="book-display-section">
      <div class="section-title">
        <span>猜你喜欢</span>
      </div>
      <div class="book-grid">
        <el-row :gutter="20" v-for="(row, index) in 4" :key="index">
          <el-col :xs="24" :sm="12" :md="4.8" :lg="4.8" v-for="book in displayBooks.slice(index * 5, (index + 1) * 5)" :key="book.id" class="book-col">
            <div class="book-card" @click="showBookDetail(book)">
              <img :src="book.cover" class="book-cover" />
              <div class="book-info">
                <div class="book-title">{{ book.title }}</div>
                <div class="book-author">{{ book.author }}</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <el-backtop :right="40" :bottom="60" class="custom-backtop">
      <div class="backtop-content">
        <i class="el-icon-top"></i>
        <span>返回顶部</span>
      </div>
    </el-backtop>

    <el-dialog :visible.sync="detailVisible" title="书籍详情" width="400px">
      <div v-if="currentBook">
        <p><strong>书名：</strong>{{ currentBook.title }}</p>
        <p><strong>作者：</strong>{{ currentBook.author }}</p>
        <p><strong>出版日期：</strong>{{ currentBook.date || '未知' }}</p>
        <p><strong>简介：</strong>{{ currentBook.desc || '暂无简介' }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      banners: [
        {
          id: 1,
          image: '/banner1.jpg',
          title: '模仿而已，别商用',
          desc: '新手起步，望海涵'
        },
        {
          id: 2,
          image: '/banner2.jpg',
          title: '如果有合作兴趣，请关注博客',
          desc: '如果有合作兴趣，请关注博客'
        }
      ],
      features: [
        { title: '杂谈吹水', desc: '社区交流与发帖', link: '/bbs' },
        { title: '每日精品', desc: '每日优选好书推荐', link: '/daily' },
        { title: '加入我们', desc: '注册成为作者，开启创作之旅', link: '/join' }
      ],
      rankingBooks: [
        { id: 1, cover: '/book1.jpg', title: '修真世界', author: '作者1', category: '玄幻' },
        { id: 2, cover: '/book2.jpg', title: '都市传说', author: '作者2', category: '都市' },
        { id: 3, cover: '/book3.jpg', title: '科幻未来', author: '作者3', category: '科幻' },
        { id: 4, cover: '/book4.jpg', title: '武侠风云', author: '作者4', category: '武侠' }
      ],
      displayBooks: [
        { id: 1, cover: '/book1.jpg', title: '修真世界', author: '作者1', category: '玄幻' },
        { id: 2, cover: '/book2.jpg', title: '都市传说', author: '作者2', category: '都市' },
        { id: 3, cover: '/book3.jpg', title: '科幻未来', author: '作者3', category: '科幻' },
        { id: 4, cover: '/book4.jpg', title: '武侠风云', author: '作者4', category: '武侠' },
        { id: 5, cover: '/book5.jpg', title: '仙侠奇缘', author: '作者5', category: '仙侠' },
        { id: 6, cover: '/book6.jpg', title: '历史长河', author: '作者6', category: '历史' },
        { id: 7, cover: '/book7.jpg', title: '游戏人生', author: '作者7', category: '游戏' },
        { id: 8, cover: '/book8.jpg', title: '末世求生', author: '作者8', category: '末世' },
        { id: 9, cover: '/book9.jpg', title: '校园青春', author: '作者9', category: '校园' },
        { id: 10, cover: '/book10.jpg', title: '职场风云', author: '作者10', category: '职场' },
        { id: 11, cover: '/book11.jpg', title: '悬疑推理', author: '作者11', category: '悬疑' },
        { id: 12, cover: '/book12.jpg', title: '灵异怪谈', author: '作者12', category: '灵异' },
        { id: 13, cover: '/book13.jpg', title: '体育竞技', author: '作者13', category: '体育' },
        { id: 14, cover: '/book14.jpg', title: '军事战争', author: '作者14', category: '军事' },
        { id: 15, cover: '/book15.jpg', title: '古代言情', author: '作者15', category: '古言' },
        { id: 16, cover: '/book16.jpg', title: '现代言情', author: '作者16', category: '现言' },
        { id: 17, cover: '/book17.jpg', title: '科幻冒险', author: '作者17', category: '科幻' },
        { id: 18, cover: '/book18.jpg', title: '奇幻魔法', author: '作者18', category: '奇幻' },
        { id: 19, cover: '/book19.jpg', title: '武侠江湖', author: '作者19', category: '武侠' },
        { id: 20, cover: '/book20.jpg', title: '都市生活', author: '作者20', category: '都市' }
      ],
      detailVisible: false,
      currentBook: null
    }
  },
  methods: {
    goFeature(feature) {
      // 跳转到对应功能区块
      this.$router.push(feature.link)
    },
    showBookDetail(book) {
      this.currentBook = {
        ...book,
        date: book.date || '2024-05-01',
        desc: book.desc || '暂无简介'
      }
      this.detailVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 0 0 40px 0;
  background: #f5f7fa;

  .main-banner {
    margin-bottom: 30px;
    border-radius: 0;
    overflow: hidden;
    width: 100vw;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    position: relative;
    .banner-content {
      position: relative;
      width: 100vw;
      height: 320px;
      .banner-bg {
        width: 100vw;
        height: 320px;
        object-fit: cover;
        filter: blur(0.5px) brightness(0.98);
      }
      .banner-text {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #222;
        text-align: center;
        h1 {
          font-size: 38px;
          font-weight: bold;
          margin-bottom: 18px;
        }
        p {
          font-size: 20px;
        }
      }
    }
  }

  .feature-blocks {
    margin-bottom: 30px;
    width: 100vw;
    margin-left: -50vw;
    left: 50%;
    position: relative;
    .feature-card {
      background: #fff;
      border-radius: 10px;
      padding: 32px 24px 24px 24px;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
      cursor: pointer;
      transition: box-shadow 0.2s;
      position: relative;
      &:hover {
        box-shadow: 0 4px 16px 0 rgba(0,0,0,0.08);
      }
      .feature-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .feature-desc {
        color: #888;
        font-size: 15px;
      }
      .feature-arrow {
        position: absolute;
        right: 18px;
        top: 32px;
        color: #bbb;
      }
    }
  }

  .main-section {
    display: flex;
    gap: 40px;
    margin-top: 30px;
    width: 100vw;
    margin-left: -50vw;
    left: 50%;
    position: relative;
    @media (max-width: 900px) {
      flex-direction: column;
      gap: 0;
    }
    .ranking-section {
      flex: 2;
      background: #fff;
      border-radius: 10px;
      padding: 24px;
      margin-right: 20px;
      .section-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 18px;
        .section-sub {
          font-size: 13px;
          color: #aaa;
          margin-left: 12px;
        }
      }
      .rank-book-card {
        display: flex;
        align-items: center;
        margin-bottom: 18px;
        background: #f8f8f8;
        border-radius: 8px;
        padding: 10px;
        transition: box-shadow 0.2s;
        cursor: pointer;
        &:hover {
          box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
        }
        .rank-book-cover {
          width: 60px;
          height: 80px;
          object-fit: cover;
          border-radius: 6px;
          margin-right: 16px;
        }
        .rank-book-info {
          .rank-book-title {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 4px;
          }
          .rank-book-author {
            font-size: 13px;
            color: #888;
            margin-bottom: 2px;
          }
          .rank-book-category {
            font-size: 12px;
            color: #bbb;
          }
        }
      }
    }
    .news-section {
      flex: 1;
      background: #fff;
      border-radius: 10px;
      padding: 24px;
      .section-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 18px;
      }
      .news-list {
        list-style: none;
        padding: 0;
        margin: 0;
        .news-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #f0f0f0;
          font-size: 15px;
          .news-title {
            color: #333;
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .news-date {
            color: #bbb;
            font-size: 13px;
            margin-left: 16px;
            flex-shrink: 0;
          }
        }
        .news-item:last-child {
          border-bottom: none;
        }
      }
    }
  }

  .book-display-section {
    padding: 30px 0;
    background: #fff;
    margin-top: 30px;
    border-radius: 10px;
    width: 100vw;
    margin-left: -50vw;
    left: 50%;
    position: relative;

    .section-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 24px;
      padding: 0 24px;
    }

    .book-grid {
      padding: 0 24px;

      .el-row {
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
      }

      .book-col {
        padding: 0 10px;
      }
    }

    .book-card {
      margin-bottom: 20px;
      cursor: pointer;
      transition: transform 0.3s;
      width: 100%;

      &:hover {
        transform: translateY(-5px);
      }

      .book-cover {
        width: 100%;
        height: 280px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      .book-info {
        padding: 10px 0;

        .book-title {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 4px;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .book-author {
          font-size: 14px;
          color: #666;
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