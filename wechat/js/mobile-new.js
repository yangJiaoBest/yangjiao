/**
 * Created by 00004725 on 2017/9/13.
 */
/**
 * 注册全局组件
 * 题目名称模板
 */
Vue.component('option-list-content',{
    props:['index','optionvalue','optionscore'],
    template:'\
    <div class="option-list">\
        <div class="option-list-head">\
            <div>选项{{index+1}}</div>\
            <div class="score">分数：\
               <input class="optionscore" type="text" placeholder="分数" v-bind:value="optionscore" v-on:input="updateOptionScore($event.target.value)">\
            </div>\
        </div>\
        <div class="option-list-body">\
                <input type="text" placeholder="请输入选项名称" class="list-option-name" v-bind:value="optionvalue" v-on:input="updateOptionValue($event.target.value)">\
        </div>\
        <div class="option-list-foot">\
        <div class="up"><img src="../images/up_pink.png" @click="upOption">上移</div>\
                <div class="down"><img src="../images/down_pink.png" @click="downOption">下移</div>\
                <div class="deleteoption"><img src="../images/delete_pink.png" @click="deleteOption">删除</div>\
        </div>\
    </div>\
    ',
    methods:{
        updateOptionScore:function(value){
            this.$emit('inputscore',value);
        },
        updateOptionValue:function(value){
            this.$emit('inputoption',value);
        },
        deleteOption:function(){
            this.$emit('deleteoptionparent');
        },
        upOption:function(){
            this.$emit('upoptionparent');
        },
        downOption:function(){
            this.$emit('downoptionparent');
        }
    }
});
/**
 * 注册全局组件
 * 选项内容模板
 */
Vue.component('ques-title-name',{
    props:['value'],
    template:'<div class="name-tag"><input type="text" placeholder="请输入条目名称" class="ques-name" v-bind:value="value" v-on:input="updateValue($event.target.value)"><img class="deletetitle" src="../images/delete_pink.png" @click="deleteTitle" ></div>',
    methods:{
        deleteTitle:function(){
            this.$emit('deletetitleparent');
        },
        updateValue:function(value){
            this.$emit('input',value);
        }
    }
});

/*
 * vue实例化
 */
var vmNewQues = new Vue({
    el:'#mobileNew',
    data:{
        quesName:'',//问卷名称
        //tagList:[
        //    //{tagName:'性格',isSelect:false,id:1},
        //    //{tagName:'认知',isSelect:false,id:2},
        //    //{tagName:'职业',isSelect:false,id:3},
        //    //{tagName:'健康',isSelect:false,id:4},
        //    //{tagName:'价值观',isSelect:false,id:5},
        //    //{tagName:'情感',isSelect:false,id:6},
        //],//标签名称列表
        tagList:[],
        tagSelectNum:0,//标签选择的个数
        quesIllustrate:"",//问卷说明
        titleNames:[{name:"",isAnswer:"",scoreRule:"",sort:""}],//题目内容
        quesTitleInfo:"",//题目提示
        optionContents:[{name:"",score:"",isScore:"",sort:""}],//选项内容
        showFirstStep:true,
        quesId:"",//问卷id通过url传过来
        optionType:"",//0-新建，1-修改
         },
    mounted:function(){
        if(window.sessionStorage.getItem('token')){
            //获取问卷名称Tag列表
            this.getTagList();
        }else{
            $.alert("用户您好，请先登录","提示",function(){
                window.location.href=window.location.href.replace('mobile-new.html','mobile-login.html');
            });
        }
        this.quesId=getQueryString('quesId');
        if(this.quesId&&this.quesId!=""){
           //获取问卷详情
            this.getQuestContens(this.quesId);
            this.optionType=1;//1 代表修改问卷
        }
        else{
            this.optionType=0;//0 代表新建问卷
        }

    },
    methods: {
        //问卷标签最多选三个
        tagSelect: function (tagItem, index) {
            this.$nextTick(function () {
                if (this.tagSelectNum >= 3 && !tagItem.isSelect) {
                    $.alert("最多只能选则3个");
                } else {
                    if (tagItem.isSelect) {
                        Vue.set(tagItem, 'isSelect', false);
                        this.tagSelectNum = this.tagSelectNum - 1;
                    } else {
                        Vue.set(tagItem, 'isSelect', true);
                        this.tagSelectNum = this.tagSelectNum + 1;
                    }
                }
            });
        },
        //下一步
        nextStepPress: function () {
            if (this.quesName == '') {
                $.alert("请输入问卷名称！");
                return false;
            }
            if (this.tagSelectNum == 0) {
                $.alert('请选择问卷类型！');
                return false;
            }
            this.showFirstStep = false;
        },
        //上一步
        lastStepPress: function () {
            this.showFirstStep = true;
        },
        //提交问卷前检验数据
        completePress: function () {
            if (this.quesTitleInfo == "") {
                $.alert("请输入题目提示");
                return;
            } else {
                if (this.titleNames.length == 0) {
                    $.alert("请添加题目内容");
                    return;
                }
                var ii, iiLength = this.titleNames.length;
                for (ii = 0; ii < iiLength; ii++) {
                    if (this.titleNames[ii].name == "") {
                        $.alert("请添加题目内容");
                        return;
                    } else {
                        this.titleNames[ii].sort = ii + 1;
                    }
                }
                ;
                if (this.optionContents.length == 0) {
                    $.alert("请添加选项内容");
                    return;
                }
                var jj, jjLength = this.optionContents.length;
                for (jj = 0; jj < jjLength; jj++) {
                    if (this.optionContents[jj].name == "") {
                        $.alert("请添加选项内容");
                        return;
                    } else {
                        this.optionContents[jj].sort = jj + 1;
                    }
                }
                ;
            }
            if(this.optionType==0){
                var urlStr='/question/insertAll';
                this.submitQuesData(urlStr);
            }else{
                var urlStr='/question/update';
                this.submitQuesData(urlStr);
            }

        },
        //删除题目
        deleteTitle: function (index) {
            this.titleNames.splice(index, 1);
        },
        //添加题目
        addTitle: function () {
            this.titleNames.push({name: "", isAnswer: "", scoreRule: ""});
        },
        //添加选项
        addOption: function () {
            this.optionContents.push({name: "", score: "", isScore: "", sort: ""});
        },
        //删除选项
        deleteOption: function (index) {
            this.optionContents.splice(index, 1);
        },
        //上移选项
        upOption: function (index) {
            if (index == 0) {
                $.alert("选项已在最前面");
            } else {
                this.optionContents.splice(index - 1, 0, this.optionContents[index]);
                this.optionContents.splice(index + 1, 1);
            }
        },
        //下移选项
        downOption: function (index) {
            if (index == this.optionContents.length - 1) {
                $.alert("选项已是最后");
            } else {
                this.optionContents.splice(index + 2, 0, this.optionContents[index]);
                this.optionContents.splice(index, 1);
            }
        },
        //获取tag列表
        getTagList: function () {
            Vue.http({
                method: 'get',
                url: serverURl + "/operate/getTagList",
            }).then(function (res) {
                if (res.body.code == "0") {
                    var tempTagItems = [];
                    res.body.data.forEach(function (val, index, array) {
                        var tempTagItem = {tagName: val.name, isSelect: false, id: val.id};
                        tempTagItems.push(tempTagItem);
                    });
                    console.log(tempTagItems);
                    vmNewQues.tagList = tempTagItems;
                } else {
                    $.alert(res.body.msg);
                }
            }, function (error) {
                $.alert(error);
            })
        },
        //新建、修改问卷提交数据
        submitQuesData: function (urlStr) {
            //问卷标签
            var tempTagName = [];//tag以"1,2,3"形式传输
            this.tagList.forEach(function (value, index, arry) {
                if (value.isSelect) {
                    tempTagName.push(value.id);
                }
            });
            var newQuesData = {
                "answerInterval": 0,
                "context": this.quesIllustrate,
                "isSID": 1,
                "isSingle": 0,
                "naireList": [
                    {
                        "name": this.quesTitleInfo,
                        "optionList": this.optionContents,
                        "optionRule": "",
                        "sort": 1,
                        "titleList": this.titleNames
                    }
                ],
                "tag": tempTagName.join(","),
                "title": this.quesName
            };
            if(this.optionType==1 && this.quesId!=""){
                newQuesData.id = this.quesId;
            }
            var newQuestUrl = serverURl +urlStr;
            var userToken = window.sessionStorage.getItem("token");
            Vue.http.post(newQuestUrl, newQuesData, {headers: {token: userToken}}).then(function (res) {
                if (res.body.code == "0") {
                    $.alert("问卷已提交成功");
                    window.location.href = window.location.href.replace('mobile-new.html','mobile-setting.html');
                } else {
                    $.alert(res.body.msg);
                }
            }, function (error) {
                $.alert(error);
            })
        },
        //修改问卷获取详情
        getQuestContens: function (id) {
           var that = this;//this指向问题
           var userToken = window.sessionStorage.getItem("token");
           Vue.http({
               method:'GET',
               url:serverURl+"/question/detail"+"?id="+id,
               headers:{token:userToken}
           }).then(function(res){
               if(res.body.code=="0"){
                   var result = res.body.data;
                   that.quesName=result.title;//问卷名称
                   var tagListFlag=result.tag.split(',');//问卷标签
                   tagListFlag.forEach(function(value,index,arry){
                       var tagId=parseInt(value);
                       console.log(that.tagList);
                       that.tagList[tagId-1].isSelect=true;
                   });
                   that.tagSelectNum=tagListFlag.length;
                   that.quesIllustrate=result.context;//问卷说明
                   that.quesTitleInfo=result.arrNaire[0].name;//题目提示
                   var titleList=result.arrNaire[0].arrTitle;//提目内容
                   var tempTitleNames=[];
                   titleList.forEach(function(value,index){
                       var tempTitle={name:value.name,isAnswer:value.isAnswer,scoreRule:value.scoreRule,sort:value.sort};
                       tempTitleNames.push(tempTitle);
                   })
                   that.titleNames=tempTitleNames;
                   var optionList=result.arrNaire[0].arrOption;//选项内容
                   var tempOptionNames=[];
                   optionList.forEach(function(value,index){
                       var tempOption={name:value.name,score:value.score,isScore:value.isScore,sort:value.sort};
                       tempOptionNames.push(tempOption);
                   })
                   that.optionContents=tempOptionNames;//选项内容

               }else{
                   $.alert(res.body.msg);
               }
           },function(error){
               $.alert(error);
           })
        },

    }
});

//获取URL中的quesId
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}