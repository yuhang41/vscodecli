<template>
  <div class="todo">
    <h1>This is an Todo page</h1>
    <router-link to="/Todo">All</router-link> |
    <router-link to="/Todo?filter=active" replace>Active</router-link> |
    <router-link to="/Todo?filter=done" replace>Done</router-link>
    <p>show:{{filter}}</p>
    <ul>
      <TodoList
        v-for="item of list"
        :key="item.tid"
        :todo="item.todo"
        :edit="edit===item.tid"
        @done="val=>doneHandler(item.tid,val)"
        @editcomplete="val=>completeHandler(item.tid,val)"
        @editThis="edit = item.tid"
        ></TodoList>
    </ul>
  </div>
</template>
<script>
import TodoList from '@/components/TodoItem'
export default {
  data () {
    return {
      filter: 'all', // all.active.done
      edit: null
    }
  },
  computed: {
    list () {
      return this.$store.getters.filterList(this.filter)
    }
  },
  mounted () {
    this.$store.dispatch('READE_TODO')
  },
  methods: {
    completeHandler (tid, content) {
      this.$store.dispatch('UPDATE_CONTENT', { tid, content })
      this.edit = null
    },
    doneHandler (tid, done) {
      this.$store.dispatch('UPDATE_DONE', { tid, done })
    }
  },
  components: {
    TodoList
  },
  watch: {
    // 利用手動更改網址時 watch 的預設是不會有動作的，所以會監聽不到
    // '$route' () {
    //   this.filter = this.$route.query.filter || 'all'
    // }
    // 更改成以下的方式就能在在更改網址時也能監聽到
    $route: {
      immediate: true, // ->是否要馬上一進來就監聽
      handler () {
        this.filter = this.$route.query.filter || 'all'
      }
    }
  }
}
</script>
