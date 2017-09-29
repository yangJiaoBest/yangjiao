/**
 * Created by 10030746 on 2017/9/18.
 */
var vm = new Vue({
	el:"#boeuIndex",
	data:{
		flag0:true,//已建问卷和已答问卷的切换标识
		flag1:false,//展示弹出标签
		mailLoginStatus:"邮箱登录",//邮箱登录状态
	},
	mounted:function(){
		var userToken = window.sessionStorage.getItem('token');
		if(userToken && userToken != null){
			this.mailLoginStatus='退出邮箱登录';
		}
		else{
			this.mailLoginStatus='邮箱登录';
		}

	},
	methods:{
		//去发布页
		goPublishPage:function () {
			console.log(window.location.href,"mobile-setting.html");
			window.location.href = window.location.href.replace("index.html","html/mobile-publish.html");
		},
		//去设置页
		goSettingPage:function () {
			console.log(window.location.href,"mobile-setting.html");
			window.location.href = window.location.href.replace("index.html","html/mobile-setting.html");
		},
		// 删除已建问卷
		deletePage:function () {
			$.confirm({
				title: '删除',
				text: '确定要删除此问卷么？',
				onOK: function () {
					//点击确认
				},
				onCancel: function () {
				}
			});
		},
		// 复制已建问卷
		copyPage:function () {
			$.confirm({
				title: '复制',
				text: '确定要复制此问卷么？',
				onOK: function () {
					//点击确认
				},
				onCancel: function () {
				}
			});
		},
		//去邮箱登录页
		mailLogin:function(){
			if(this.mailLoginStatus=="邮箱登录"){
				window.location.href = window.location.href.replace("index.html","html/mobile-login.html");
			}else{
				window.sessionStorage.clear();
				window.location.href = window.location.href.replace("index.html","index.html");
			}

		},
		//去新建问卷页
		mobileNew:function(){
			window.location.href = window.location.href.replace("index.html","html/mobile-new.html");
		},
		//去联系我们页
		contactUs:function(){
			window.location.href = window.location.href.replace("index.html","html/mobile-contact-us.html");
        }
	}
});