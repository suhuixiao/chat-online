define(['../lib/mui.min','../lib/require','../lib/jquery'],function(){
	mui.init();
	//设置聊天区域的高度
	h = window.innerHeight;
	h1 = $('.mui-bar-nav').height();
	h2 = $('.bottom-content').height();
	$('.main-content').height(h-h1-h2 + 'px');  
	//初始化聊天
	var Realtime = AV.Realtime;
	var TextMessage = AV.TextMessage;
	var realtime = new Realtime({
	  	appId: 'GPBkuuP6znYbmAVXVIo6xhvU-gzGzoHsz',
	  	region: 'cn', //美国节点为 "us"
	});
	//定义一个对象
	var chat ={
		textList:[]
	} 
	//vue实例
	var vm = new Vue({
		el:'#app',
		data:{
			//用户的id
			id:'',
			//别人的id
			otherId:'',
			//自己头像地址
			tpUrlOneself:'',
			//别人的头像地址
			tpUrlOther:'',
			chatList:[]
		},
		methods:{
			sentInfo:function(){
				var chatId = this.id.replace(/'/,'');
				console.log(chatId)
				// 用户 用自己的名字作为 clientId，获取 IMClient 对象实例
				realtime.createIMClient(vm.id).then(function(chatId) {
				  	// 创建与别人之间的对话
				  	return chatId.createConversation({
				    members: [vm.otherId],
				    name: vm.id + '&' + vm.otherId,
				  	});
				}).then(function(conversation) {
				  	// 发送消息
				  	var chatText =  $('#input-text').val();
					chat.textList[chat.textList.length] = { id : vm.id, text: chatText };
					vm.chatList.push ( chat.textList[chat.textList.length-1] );
				  	return conversation.send(new AV.TextMessage( chatText ));
				}).then(function(message) {
					console.log('发送给' + ' '+ vm.otherId , '发送成功！');
				}).catch(console.error)
			},
			//用户聊天登录
			chatLogin:function( id ){
				// 用户 登录
				realtime.createIMClient(id).then(function(id) {
				  	id.on('message', function(message, conversation) {
				  		chat.textList[chat.textList.length] = { id : id, text: message.text };
						vm.chatList.push ( chat.textList[chat.textList.length-1] );
				    	console.log('Message received: ' + message.text);
				  	});
				}).catch(console.error);
			},
			
		},
		mounted:function(){
			//获取缓存
			var username = sessionStorage.getItem('username');
			if( username === '123456' ){
				this.id = 'boy';
				this.otherId = 'girl';
				this.tpUrlOneself = 'css/src/boy.png';
				this.tpUrlOther = 'css/src/girl.png';
				this.chatLogin( 'boy' )
			}else{
				this.id = 'girl';
				this.otherId = 'boy';
				this.tpUrlOneself = 'css/src/girl.png';
				this.tpUrlOther = 'css/src/boy.png';
				this.chatLogin( 'girl' )
			}
			
		}
	})
})
