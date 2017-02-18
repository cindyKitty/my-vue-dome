<template>
	<h3>{{msg}}</h3>
	
	<button v-on:click="clickme" class="btn btn-info">父亲告诉我要读的书：</button>
	<h4 v-if="isshow">
	    <!--简单语法-->
	    <!-- {{msgFromFather}} -->
		<table class="table table-bordered">
	 		    <tr>
	 		      <th>序号</th>
	 		      <th>书名</th>
	 		      <th>作者</th>
	 		      <th>价格</th>
	 		    </tr>
	 			<tr v-for="book in msgFromFather | orderBy sortparam">
	 			  <td>{{book.id}}</td>
	 			  <td>{{book.name}}</td>
	 			  <td>{{book.author}}</td>
	 			  <td>{{book.price}}</td>
	 			</tr>
	 		</table>
	</h4>
	<button @click="tellFather" class="btn btn-success">我对父亲说的话：</button>
</template>

<script>
export default {
  data: function () {
    return {
      msg: 'hello from component child!',
      isshow: false
    }
  },
  // // 简单语法
  // props: ['msgFromFather'],
  props: {
    msgFromFather: {
      type: Array,
      default: []
    }
  },
  methods: {
    clickme: function () {
      this.isshow = true
      console.log(this.msgFromFather)
    },
    tellFather: function () {
      // // 方法一：子组件传参到父组件
      // this.$dispatch('child-tell-me-msg', '我会好好学习的')
      // 方法二：子组件传参到父组件
      this.$emit('child-tell-me-msg', '我会好好学习的')
    }
  }
}
</script>