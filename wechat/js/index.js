/**
 * Created by 10030746 on 2017/9/18.
 */
var vm = new Vue({
	el:"#boeuIndex",
	data:{
		flag0:true,//已建问卷和已答问卷的切换标识
		flag1:false,//展示弹出标签
		mailLoginStatus:"邮箱登录",//邮箱登录状态
		bannerList:[],//banner列表
		tagList:[],//标签tag列表
		pageList:[],//问卷列表
		isActiveTag:0,//

	},
	mounted:function(){
		var userToken = window.sessionStorage.getItem('token');
		if(userToken && userToken != null){
			this.mailLoginStatus='退出邮箱登录';
		}
		else{
			this.mailLoginStatus='邮箱登录';
		}
		this.getBannerData();
		this.getTagData();
		this.getPageData(1,10,0);//pageSize=10&pageNum=1&tag=0

	},
	methods:{

		//获取banner数据
		getBannerData:function () {
			var self = this,url = serverUrl + "/operate/getAdvertList";
			Vue.http.get(url).then(function (res) {
				if(res.body.code === 200){
					self.bannerList = res.body.data;
				}else {
					console.log(res,res.body.code);
					// $.alert(res.body.msg);
				}

			},function (err) {
				$.alert("网络出错");
				console.log(err);
			})
		},
		//获取标签Tag数据
		getTagData:function () {
			var self = this,url = serverUrl + "/operate/getTagList";
			Vue.http.get(url).then(function (res) {
				console.log("tags==",res);
				if(res.body.code === 200){
					self.tagList = res.body.data;
				}else {
					console.log(res,res.body.code);
					// $.alert(res.body.msg);
				}

			},function (err) {
				$.alert("网络出错");
				console.log(err);
			})
		},
		//获取问卷列表图片数据
		getPageData:function (pageNum,pageSize,tag) {
			var self = this,
				url = serverUrl + "/operate/getIndexList" + "?pageSize=" +pageSize+"&pageNum="+pageNum+"&tag="+tag;

			Vue.http.get(url).then(function (res) {
				console.log("getPageData==",res);
				if(res.body.code === 200){
					self.pageList = res.body.data;
				}else {
					console.log(res,res.body.code);
					// $.alert(res.body.msg);
				}
			},function (err) {
				$.alert("网络出错");
				console.log(err);
			})
		},

		//标签页的切换
		changeTag :function (tagId) {
			var self = this;
			self.isActiveTag = tagId;
			console.log(tagId);
			self.getPageData(1,10,tagId);
		},
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
$(function() {
	FastClick.attach(document.body);
});
$(".swiper-container").swiper({
	loop: true,
	autoplay: 3000
});