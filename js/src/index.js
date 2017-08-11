define(['../lib/mui.min','../lib/require','../lib/jquery'],function(){
	var vn = new Vue({
		el:'#index_app',
		data:{
			
		},
		methods:{
			login:function(){
				var username = $('#username').val();
				var password = $('#password').val();
				mui.ajax({
					url:"https://api.leancloud.cn/1.1/login",
					type:'post',
					data:{
						"username": username,
						"password": password
					},
					headers:{
						'X-LC-Id': 'GPBkuuP6znYbmAVXVIo6xhvU-gzGzoHsz',
						'X-LC-Key': 't0yFSrjXrXhRhpcikKi6kTSx'
					},
					success:function( data ){
						mui.toast('登录成功');
						sessionStorage.setItem('username',username)
						mui.openWindow({
    						url:'chat.html'
    					})
					},
					error:function(error){
						mui.alert('账号或密码错误')
					}
				})
			}
		}
	})
})