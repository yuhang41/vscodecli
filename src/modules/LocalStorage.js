export default function (key) {
  return {
    load () {
      return JSON.parse(window.localStorage.getItem(key)) || []
    },
    save (data) {
      window.localStorage.setItem(key, JSON.stringify(data))
    }
  }
}
