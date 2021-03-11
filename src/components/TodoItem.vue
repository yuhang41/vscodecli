<template>
    <li >
      <template v-if="!edit">
        <input type="checkbox" v-model="done">{{todo.content}}
        <button @click="$emit('editThis')">編輯</button>
      </template>
      <template v-else>
        <input type="text" v-model="editcontent">
        <button @click="$emit('editcomplete',editcontent)">完成</button>
      </template>
    </li>
</template>
<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      editcontent: ''
    }
  },
  mounted () {
    this.editcontent = this.todo.content
  },
  computed: {
    // content: {
    //   get () {
    //     return this.todo.content
    //   },
    //   set (val) {
    //     this.editcontent = val
    //   }
    // },
    done: {
      get () {
        return this.todo.done
      },
      set (val) {
        this.$emit('done', val)
      }
    }
  },
  methods: {

  }
}
</script>
