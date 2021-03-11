import Vue from 'vue'
import Vuex from 'vuex'
import LocalStorage from '../modules/LocalStorage'
Vue.use(Vuex)
const STORE = LocalStorage('todo-vue')

export default new Vuex.Store({
  state: {
    // todos: [{ content: 123, done: false }, { content: 456, done: true }, { content: 789, done: false }]
    todos: []
  },
  getters: {
    list (state) {
      return state.todos.map((todo, tid) => {
        return { todo, tid }
      })
    },
    filterList (state, getters) { // 給Todo.vue 的 component 用
      return function (filter) {
        switch (filter) {
          case 'all':
            return getters.list
          case 'active':
            return getters.list.filter((todo) => { return !todo.todo.done })
          case 'done':
            return getters.list.filter((todo) => { return todo.todo.done })
          default:
            return []
        }
      }
    }
  },
  mutations: {
    SET_TODOS (state, todos) {
      state.todos = todos
    }
  },
  actions: {
    CREATE_TODO ({ commit }, { todo }) { // 新增資料
      // 1. POST
      const todos = STORE.load()
      todos.push(todo)
      STORE.save(todos)
      // 2. commit mutation
      commit('SET_TODOS', todos)
      // 3. return
      return {
        tId: todos.length - 1,
        todo
      }
    },
    READE_TODO ({ commit }) { // 讀localStorage資料
      // 1. GET
      const todos = STORE.load()
      // 2. commit mutation
      commit('SET_TODOS', todos)
      // 3. return
      return {
        todos
      }
    },
    UPDATE_CONTENT ({ commit }, { tid, content }) { // 更改資料
      // 1. PATCH
      const todos = STORE.load()
      // todos.splice(tid, 1, todo)
      todos[tid].content = content
      STORE.save(todos)
      // 2. commit mutation
      commit('SET_TODOS', todos)
      // 3. return
      return {
        tid,
        todos: todos[tid]
      }
    },
    UPDATE_DONE ({ commit }, { tid, done }) { // 更改資料
      // 1. PATCH
      const todos = STORE.load()
      // todos.splice(tid, 1, todo)
      todos[tid].done = done
      STORE.save(todos)
      // 2. commit mutation
      commit('SET_TODOS', todos)
      // 3. return
      return {
        tid,
        todos: todos[tid]
      }
    },
    DELETE_TODO ({ commit }, { tid }) { // 刪除哪一筆tid的資料
      // 1. DELETE
      const todos = STORE.load()
      todos.splice(tid, 1)
      STORE.save(todos)
      // 2. commit mutation
      commit('SET_TODOS', todos)
      // 3. return
      return {
        tid: null
      }
    },
    CLEAR_TODO ({ commit }) {
      const todos = []
      STORE.save(todos)
      // 2. commit mutation
      commit('SET_TODOS', todos)
      // 3. return
      return {
        todos
      }
    }
  }
})
