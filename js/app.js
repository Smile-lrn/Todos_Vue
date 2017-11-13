;(function(Vue){

	// 默认列表数据
	const todos = [
		{
			id:1,
			title:'123',
			listStatus:true
		},
		{
			id:2,
			title:'123',
			listStatus:false
		},
		{
			id:3,
			title:'123',
			listStatus:true
		}
	]
	//通过自定义指令实现聚焦
	// 注册一个全局自定义指令 v-focus
	Vue.directive('focus', {
	  // 当绑定元素插入到 DOM 中。
	  inserted: function (el) {
	    // 聚焦元素
	    el.focus()
	  }
	})
	// 实现刷新页面依旧保持当前状态
		Vue.directive('links', {
	  // 当绑定元素插入到 DOM 中。
	  inserted: function (el) {
	    // 选中de元素
	    var aLinks = el.querySelectorAll('a')
	    Array.from(aLinks).forEach(function(aLink){
	    	// aLink.onclick = function(){

	    	// 	window.app.filterStatu = this.getAttribute('href').substr(2)
	    	// }
	    	$(aLink).on('click',function(){
	    		console.log($(this).addClass('selected').siblings())
	    		$(this).addClass('selected').parent().siblings().find('a').removeClass('selected')
	    	})
	    })
	  }
	})
	//创建Vue实例
	window.app = new Vue({
		//设置vue管理的入口
		el:'#todosList',
		data:{
			// todos  <==> todos:todos
			todos,
			currentEditing:false,
			filterStatu:'aa'
		},
		computed:{

			//标记所有未完成任务的个数
			uncompletedCount: function (){
				return this.todos.filter(item => !item.listStatus).length
			},

			// 有一个任务完成 clearAllCompleted 显示
			completedCount:function (){
				return this.todos.some(item => item.listStatus)
			},
			//全选设置
			allChoice:function(){
				return this.todos.every(item => item.listStatus)
			},
			// 分类渲染列表(根据哈希得到不同的数据)
			filterStatus:function(){
				switch (this.filterStatu){
					case 'active':
						return this.todos.filter(item => !item.listStatus)
						break
					case 'completed':
						return this.todos.filter(item => item.listStatus)
						break
					default:
						return this.todos
				}
			}
		},
		methods:{
			//回车保存数据
			saveData (e){
				// 获取文本框的内容
				var dataVal = e.target.value.trim();
				// 非空数据添加到列表(向数组todos追加数据)
				if(dataVal){
					//设置追加数据的id
					var id = this.todos.length;
					this.todos.push({
						id:id,
						title:dataVal,
						listStatus:false
					})
					//清空文本框
					e.target.value=''
				}else{
					return
				}
			},
			saveEditData (item,event){
				//保存数据
				item.title = event.target.value
				//取消编辑状态
				this.currentEditing=null
			},
			// 全选
			chooseAll (e){
				// console.log(e.target.checked)
				this.todos.forEach(item => item.listStatus=e.target.checked)
			},
			//删除任务
			delData (index,event){
				this.todos.splice(index,1);
			},
			//清空所有完成的任务
			clearAll (){
				this.todos = this.todos.filter(item => !item.listStatus)
			},

		}

	})
	window.onhashchange = function(){
		// 得到路由哈希
		var hash = window.location.hash.replace('#/','');
		window.app.filterStatu = hash;
	}
	window.onhashchange()
})(Vue)
