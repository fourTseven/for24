import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 5000
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 这里可以添加token等认证信息
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  // 获取首页推荐书籍
  getRecommendBooks() {
    return api.get('/books/recommend')
  },
  
  // 获取书籍详情
  getBookDetail(id) {
    return api.get(`/books/${id}`)
  },
  
  // 获取分类列表
  getCategories() {
    return api.get('/categories')
  },
  
  // 获取分类下的书籍
  getBooksByCategory(categoryId, params) {
    return api.get(`/categories/${categoryId}/books`, { params })
  },
  
  // 搜索书籍
  searchBooks(keyword, params) {
    return api.get('/books/search', { params: { keyword, ...params } })
  },
  
  // 获取章节内容
  getChapterContent(bookId, chapterId) {
    return api.get(`/books/${bookId}/chapters/${chapterId}`)
  }
} 