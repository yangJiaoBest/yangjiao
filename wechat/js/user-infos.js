/**
 * Created by 00004725 on 2017/9/23.
 */
/*
 * vue实例化
 */
var vmUserInfos = new Vue({
    el: '#userInfos',
    data: {
    },
    methods:{
        userInfoSubmit:function(){
            $.alert("确定提交");
        }
    }
})

$(document).ready(function(){
    //设置答题间隔
    $("#sex").select({
        title: "性别",
        items: ["请选择", "女", "男"]
    });
    //出生年月
    $("#birthDay").calendar();
    //学历
    $("#education").select({
        title: "学历",
        items: ["小学", "初中", "高中/中专", "大专", "本科", "硕士", "博士"]
    });
    //所属行业
    $("#industry").select({
        title: "所属行业",
        items: ["请选择", "农、林、牧、渔业", "采矿业", "电力、热力、燃气及水生产和供应业", "本科", "建筑业", "批发零售业","交通运输、仓储和邮政业", "住宿和餐饮业", "信息传输、软件和信息技术服务业", "金融业","房地产业", "租赁和商务服务业", "科学研究和技术服务业", "水利、环境和公共设施管理业","居民服务、修理和其它服务业", "教育","卫生和社会工作", "文化、体育和娱乐业","公共管理、社会保障和社会组织", "国际组织","学生", "其它"]
    });
    //职位等级
    $("#positionGrade").select({
            title:"职位等级",
            items:["请选择","普通员工","科长/经理","部长/资深经理","总监","总裁"]}
    )
    //开始工作年份
    $("#workDay").calendar();

    //是否是BOE员工
    $("#isBOELable").bind("click", function () {
        if($("#isBOE").val()=="off"){
            $("#isBOE").val("on");
            console.log("是否是BOE员工："+$("#isBOE").val());
        }else{
            $("#isBOE").val("off");
            console.log("是否是BOE员工："+$("#isBOE").val());
        }
    });
})