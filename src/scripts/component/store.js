const STORAGE_HOBBY = 'todo-hobby'
export default {
  fetch () {
    return JSON.parse(window.localStorage.getItem(STORAGE_HOBBY) || '')
  },
  save (obj) {
    window.localStorage.setItem(STORAGE_HOBBY, JSON.stringify(obj))
  }
}
