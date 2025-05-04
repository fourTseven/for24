<template>
  <div class="bbs">
    <h1>杂谈吹水</h1>
    <el-card class="post-box">
      <el-input
        type="textarea"
        v-model="newPost"
        placeholder="说点什么吧..."
        rows="3"
      ></el-input>
      <div class="post-actions">
        <el-button type="primary" @click="submitPost">发帖</el-button>
      </div>
    </el-card>
    <div class="post-list">
      <el-card v-for="post in posts" :key="post.id" class="post-item">
        <div class="post-content">{{ post.content }}</div>
        <div class="post-meta">{{ post.author }} · {{ post.date }}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BBSPage',
  data() {
    return {
      newPost: '',
      posts: [
        { id: 1, content: '欢迎来到杂谈吹水区！', author: '小明', date: '2024-05-01' },
        { id: 2, content: '大家今天都看了什么书？', author: '小红', date: '2024-05-02' }
      ]
    }
  },
  methods: {
    submitPost() {
      if (!this.newPost.trim()) return this.$message.warning('内容不能为空')
      this.posts.unshift({
        id: Date.now(),
        content: this.newPost,
        author: '匿名',
        date: new Date().toISOString().slice(0, 10)
      })
      this.newPost = ''
      this.$message.success('发帖成功（仅本地模拟）')
    }
  }
}
</script>

<style lang="scss" scoped>
.bbs {
  padding: 32px 10vw 32px 10vw;
  background: #f5f7fa;
  min-height: 80vh;
  h1 {
    margin-bottom: 24px;
  }
  .post-box {
    margin-bottom: 32px;
    .post-actions {
      text-align: right;
      margin-top: 10px;
    }
  }
  .post-list {
    .post-item {
      margin-bottom: 18px;
      .post-content {
        font-size: 16px;
        margin-bottom: 8px;
      }
      .post-meta {
        color: #aaa;
        font-size: 13px;
      }
    }
  }
}
</style> 