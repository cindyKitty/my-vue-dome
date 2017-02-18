<!--@by 蒋颖-->
<template>
 <div class="container">
 	<div class="col-md-8 col-md-offset-2">

 	  <div class="panel panel-default" style="margin-top:10px;">
 	    <div class="panel-heading" >
 		  插值： {{}} 、 v-text 、 v-html
 	    </div>
 	    <div class="panel-body">
 		  <h3 v-html="title">  </h3>
 	    </div>
 	  </div>
 	  <div class="panel panel-default">
 		<div class="panel-heading">
 			'v-model' 指令在表单控件上创建双向绑定。
 		</div>
 		<div class="panel-body">
	 		<div class="form-group">
	 		 <!--{{*message}} 则message不会随着数据的改变而更新-->
	 		 <!--支持一些简单的表达式: {{message + '我一直在哦'}}
	 		                           {{message.split('').reverse().join('')}}
	 		                           {{message | uppercase}}
	 		                           {{message | reverse | uppercase}}
	 		                           -->
		       <!--这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。-->
		      <label for="model-text" v-cloak>{{message | uppercase}}</label>
		      <input type="text" v-model="message" class="form-control" id="model-text" >  
		    </div>

		    <div class="form-group">
		      <label for="model-select">您的选择是：{{select  | json}}</label>
		      <select id="model-select" v-model="select" multiple class="form-control">
		      	<option value="java">java</option>
		      	<option value="html">html</option>
		      	<option value="css">css</option>
		      	<option value="js">js</option>
		      	<option value="c#">c#</option>
		      	<option value="vue">vue</option>
		      	<option value="jquery">jquery</option>
		      </select>
		      <p class="help-block"></p>
		    </div>

		    <div class="form-group">
		    	<label for="model-todolist">请写出您的爱好后回车：</label>
		    	<input type="text" v-model="newHobby" class="form-control" id="model-todolist" v-on:keyup.enter="addHobby">
		    </div>
		    <ul class="list-group" id="todo-hobby">
		    	<li class="list-group-item" v-for="(index,hobby) in hobbys" v-bind:class="{'bg-green': hobby.flag}" @click="toggleFlag(hobby)">
		    	  {{index}}、{{hobby.text}}
		    	  <button class="btn btn-danger pull-right" @click="delHobby(index)">X</button>
		    	  <div class="clearfix"></div>
		    	</li>
		    </ul>

	     </div>
	    </div>

	    <div class="panel panel-default">
	    	<div class="panel-heading">
	    		'v-for'基于源数据将元素或模板块重复数次
	    	</div>
 		<!--指令的值必须使用特定语法 alias (in|of) expression
 		    1.0.17+ 支持 of 分隔符。
            另外也可以为数组索引指定别名（如果值是对象可以为键指定别名）：
            <div v-for="(index, item) in items"></div>
            <div v-for="(key, val) in object"></div>
 		-->
 		<div class="panel-body">
	 		<table class="table table-bordered">
	 		    <tr>
	 		      <th @click="sortBy('id')">序号</th>
	 		      <th @click="sortBy('name')">书名</th>
	 		      <th @click="sortBy('author')">作者</th>
	 		      <th @click="sortBy('price')">价格</th>
	 		      <th>操作</th>
	 		    </tr>
	 			<tr v-for="book in books | orderBy sortparam">
	 			  <td>{{book.id}}</td>
	 			  <td>{{book.name}}</td>
	 			  <td>{{book.author}}</td>
	 			  <td>{{book.price}}</td>
	 			  <td v-if="book.id%2==0">
	 			     <button type="button" class="btn btn-danger" v-if="book.id%2==0"  @click="delBook(book)">删除</button>
	 			  </td>
	 			  <td v-else>
	 			  	<button type="button" class="btn btn-info" @click="delBook(book)">删除</button>
	 			  </td>
	 			</tr>
	 		</table>
	 	</div>
 	   </div>
 		<!--v-on指令练习-->
 		<div class="panel panel-default">
 			<div class="panel-heading">
 				v-on指令绑定事件监听器 / v-model绑定form
 			</div>
 			<div class="panel-body">
 				<div id="add-book">
	 			<legend>添加书籍</legend>
	 			<div class="form-group">
	 				<label for='bookname'>书名</label>
	 				<input type="text" class="form-control" v-model="book.name">
	 			</div>
	 			<div class="form-group">
	 				<label for='bookname'>作者</label>
	 				<input type="text" class="form-control" v-model="book.author">
	 			</div>
	 			<div class="form-group">
	 				<label for='bookname'>价格</label>
	 				<input type="text" class="form-control" v-model="book.price">
	 			</div>
	 			<button class="btn btn-primary btn-block" v-on:click="addBook()">添加</button>
	 		</div>
 			</div>
 		</div>
 		<div class="panel panel-default">
 			<div class="panel-heading">
 			  Vuejs组件之间的通信 --- 父子组件之间通信
 			</div>
 			<div class="panel-body">
 			    <!-- 简单语法  子组件中定义方式为：  props: ['msgFromFather']-->
			    <!-- <child :msg-from-father="要好好学习哦" ></child> -->
 				<child :msg-from-father="books" v-on:child-tell-me-msg="listemToMyBody"></child>
 				<p>{{childWords}}</p>
 			</div>
 		</div>
 	</div>
 </div>
</template>

<style>
	[v-cloak] {
	  display: none;
	}

	.tr-bg{
	  background-color: #999;
	}

	table th:hover{
	  cursor:pointer;
	  background-color: #ccc;
	}

	h4 {
	  background-color: orange;
	}

	.bg-green {
	  background-color: #A9FF96;
	}

	#todo-hobby button{
	  background-color: #42B983;
	  border-color: #42B983;
	}
</style>

<script>
  import Store from './store'
  import Child from './child'
  export default {
    components: {
      Child
    },
    data () {
      return {
        title: '<span style="color:red;">this is vue dome</span>',
        message: 'hello vue.js!',
        select: '',
        newHobby: '',
        hobbys: Store.fetch(),
        book: { id: 0, author: '', name: '', price: '' },
        books: [{ id: 1, author: '曹雪芹', name: '红楼梦', price: 32.0 }, { id: 2, author: '施耐庵', name: '水浒传', price: 30.0 }, { id: '3', author: '罗贯中', name: '三国演义', price: 24.0 }, { id: 4, author: '吴承恩', name: '西游记', price: 20.0 }],
        sortparam: '',
        tellChildMsg: '',
        childWords: ''
      }
    },
    watch: {
      hobbys: {
        handler: function (hobbys) {
          // console.log(val, oldVal)
          Store.save(hobbys)
        },
        deep: false
      }
    },
    methods: {
      addHobby: function () {
        this.hobbys.push({text: this.newHobby, flag: true})
        this.newHobby = ''
      },
      delHobby: function (index) {
        this.hobbys.splice(index, 1)
      },
      toggleFlag: function (obj) {
        obj.flag = !obj.flag
      },
      addBook: function () {
        this.book.id = this.books.length + 1
        this.books.push(this.book)
        this.book = ''
      },
      delBook: function (book) {
        this.books.$remove(book)
      },
      sortBy: function (sortparam) {
        this.sortparam = sortparam
      },
      listemToMyBody: function (msg) {
        this.childWords = msg
      }
    }
    // 子组件用$dispatch的方式向父组件传参
    // events: {
    //   'child-tell-me-msg': function (s) {
    //     this.childWords = s
    //   }
    // }
  }
</script>