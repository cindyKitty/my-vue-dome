<template>
  <h1>{{ msg }}</h1>
  
  <div id="msg1">
    <p>{{ msg }}</p>
    <input v-model="msg">
  </div>
  <button v-on:click="reverseMessage">Reverse Message</button>
  
  <hr/>
  
  <div id="todos">
  <input v-model="newTodo" v-on:keyup.enter="addTodo" >
  <ul>
    <li v-for="todo in todos">
      {{ todo.text }}
      <button v-on:click="removeTodo($index)">X</button>
    </li>
  </ul>
  </div>  
  
  <div id="ajax">
    <h1>Latest Vue.js Commits</h1>
    <template v-for="branch in branches">
      <input type="radio"
        name="branch"
        :id="branch"
        :value="branch"
        v-model="currentBranch">
      <label :for="branch">{{branch}}</label>
    </template>
    <p>vuejs/vue@{{currentBranch}}</p>
    <ul>
      <li v-for="record in commits">
        <a :href="record.html_url" target="_blank" class="commit">{{record.sha.slice(0, 7)}}</a>
        - <span class="message">{{record.commit.message | truncate}}</span><br>
        by <span class="author">{{record.commit.author.name}}</span>
        at <span class="date">{{record.commit.author.date | formatDate}}</span>
      </li>
    </ul>
  </div>  
</template>

<script>
var $ = require('jquery')

export default {
  data () {
    return {
      msg: 'Hello Vue!',
      newTodo: '',
      todos: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue.js' },
        { text: 'Build Something Awesome' }
      ],
      branches: ['master', 'dev'],
      currentBranch: 'master',
      commits: null
    }
  },

  created: function () {
    this.fetchData()
  },
  watch: {
    currentBranch: 'fetchData'
  },

  methods: {
    addTodo: function () {
      this.todos.push({text: this.newTodo})
    },
    removeTodo: function (index) {
      this.todos.splice(index, 1)
    },
    reverseMessage: function () {
      this.msg = this.msg.split('').reverse().join('')
    },

    fetchData: function () {
      var apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha='
      var self = this
      $.ajax({
        method: 'GET',
        url: apiURL + self.currentBranch,
        data: {}
      })
      .done(function (data) {
        console.log('done')
        console.log(data)
        self.commits = data
      })
      .fail(function () {
        console.log('error')
      })
      .always(function () {
        console.log('complete')
      })
    }
  }
}
</script>

<style scoped>
h1 {
  color: red;
}

#ajax {
  font-family: 'Helvetica', Arial, sans-serif;
}
a {
  text-decoration: none;
  color: #f66;
}
li {
  line-height: 1.5em;
  margin-bottom: 20px;
}
.author, .date {
  font-weight: bold;
}
</style>