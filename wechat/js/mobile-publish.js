/**
 * Created by 00004725 on 2017/9/22.
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

var vmQuesPublish = new Vue({
    el: '#mobilePublish',
    data: {

    },
    methods:{
        //返回问卷列表
        pageComeBack:function(){
            window.location.href='../html/mobile-setting.html ';
        },
        //确认发布
        publishSubmit:function(){
                //问卷名称、答题间隔、是否上轮播和首页数据发送给后台
                //$('#answerTimes').val();//答题间隔
                //$("#switchBannerShow").val();上轮播on/off
                //$("#switchHomeShow").val();上首页on/off
                $.alert("问卷名称、答题间隔、是否上轮播和首页数据发送给后台");}
    }
})

$(document).ready(function(){
    //设置答题间隔
    $("#answerTimes").select({
        title: "答题间隔",
        items: ["不限", "1周", "2周", "3周", "1个月", "2个月","3个月", "4个月","5个月", "6个月","7个月", "8个月","9个月","10个月", "11个月","1年"]
    });
    //设置轮播显示
    $("#switchBanner").bind("click", function () {
        if($("#switchBannerShow").val()=="off"){
            $("#switchBannerShow").val("on");
            console.log("是否显示Banner："+$("#switchBannerShow").val());
        }else{
            $("#switchBannerShow").val("off");
            console.log("是否显示Banner："+$("#switchBannerShow").val());
        }
    });
    //设置首页显示
    $("#switchHome").bind("click", function () {
        if($("#switchHomeShow").val()=="off"){
            $("#switchHomeShow").val("on");
            console.log("是否显示Banner："+$("#switchHomeShow").val());
        }else{
            $("#switchHomeShow").val("off");
            console.log("是否显示Banner："+$("#switchHomeShow").val());
        }
    });
})