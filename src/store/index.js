import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    bookshelf: [],
    readingHistory: []
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    ADD_TO_BOOKSHELF(state, book) {
      state.bookshelf.push(book)
    },
    REMOVE_FROM_BOOKSHELF(state, bookId) {
      state.bookshelf = state.bookshelf.filter(book => book.id !== bookId)
    },
    ADD_READING_HISTORY(state, history) {
      state.readingHistory.push(history)
    }
  },
  actions: {
    // 这里可以添加异步操作
  },
  getters: {
    isInBookshelf: state => bookId => {
      return state.bookshelf.some(book => book.id === bookId)
    }
  }
}) 