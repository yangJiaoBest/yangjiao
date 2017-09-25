/**
 * Created by 00004725 on 2017/9/18.
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
var vmQuesSet = new Vue({
    el: '#mobileSet',
    data: {

    },
    methods:{
        //返回问卷列表
        pageComeBack:function(){
             $.alert("跳转到问卷设置");
        },
        //发布设置
        publishSetting:function(){
            window.location.href='../html/mobile-publish.html ';
        },
        //维度设置
        dimensionSetting:function(){
            window.location.href='../html/dimensionality-list.html ';
            //$.alert("跳转到维度设置");
        },
        //修改问卷
        updateQuestionnaire:function(){
            window.location.href='../html/mobile-new.html ';
            //$.alert("跳转到修改问卷");
        },
        //报告设置
        reportSetting:function(){
            window.location.href='../html/mobile-report.html ';
        },
        //查看问卷
        checkQuestionnaire:function(){
            window.location.href='../html/mobile-questionnaire.html ';
            //$.alert("跳转到查看问卷");
        },
        //图片设置
        pictureSetting:function(){
            $.alert("图片设置功能请到PC端操作");
        }

    }
});


