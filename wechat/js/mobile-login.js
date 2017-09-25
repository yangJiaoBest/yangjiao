/**
 * Created by 00004725 on 2017/9/8.
 */
/**
 * 注册全局组件
 * 每页的页头包括返回按钮和标题
 */
    Vue.component('page-title',{
        props:['pageTitle'],
        template:'<div class="page-title"><img src="../images/backWhite.png" class="page-back" @click="pageBack"/><div class="page-name">{{pageTitle}}</div></div>',
        methods:{
            pageBack:function(){
                this.$emit('pagetitleparent');
            }
        }
    });

/*
 * vue实例化
 */
var javaURI = 'http://sscpre.boe.com/v1/assess-api/user/login';
var vmMobileLogin = new Vue({
        el:'#mobileLogin',
        data:{
            email:'',
            password:'',
        },
        methods:{
            pageComeBack:function(){
                $.alert("跳转到首页");
            },
            //登录请求
            loginSubmit:function(){
                if(this.isInputRight()){
                    var postData={
                        "email":this.email,
                        "password":this.password
                    };
                    var url='http://sscpre.boe.com/v1/assess-api/user/login';
                    Vue.http.post(url,postData
                    ).then(function(res){
                        if(res.body.code === 200){
                           $.alert("跳转到首页");
                        }else{
                            $.alert(res.body.msg);
                        }
                    },function(error){
                        alert(error);
                    })
                }
            },
            loginCancel:function(){
                //$.alert("跳到首页");
                window.history.back();
            },
            //邮箱密码判断
            isInputRight:function(){
                var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;//邮箱正则
                if(this.email.length===0){
                    $.alert("请输入邮箱！");
                    return false;
                }
                if(!reg.test(this.email)){
                    $.alert("邮箱格式错误！");
                    return false;
                }
                if(this.password.length===0){
                    $.alert("请输入密码！");
                    return false;
                }
                if(this.password.length<8){
                    $.alert("密码至少是8位！");
                    return false;
                }
                return true;
            }
        }
    });
