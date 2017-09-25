/**
 * Created by 00004725 on 2017/9/13.
 */

var serverURL='http://assessment.boe.com:8080/ac/';

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
        tagList:[
            {tagName:'性格',isSelect:false,id:1},
            {tagName:'认知',isSelect:false,id:2},
            {tagName:'职业',isSelect:false,id:3},
            {tagName:'健康',isSelect:false,id:4},
            {tagName:'价值观',isSelect:false,id:5},
            {tagName:'情感',isSelect:false,id:6},
        ],//标签名称列表
        tagSelectNum:0,//标签选择的个数
        titleNames:[{titleName:"题目内容一"},{titleName:"题目内容二"},{titleName:"题目内容三"}],//题目内容
        quesTitleInfo:"",
        optionContents:[{optionName:"A",score:"12"},{optionName:"B",score:"10"}],//选项内容
        showFirstStep:true,
         },
    methods:{
        //问卷标签最多选三个
        tagSelect:function(tagItem,index){
            this.$nextTick(function () {
                if(this.tagSelectNum>=3&&!tagItem.isSelect){
                    $.alert("最多只能选则3个");
                }else{
                    if(tagItem.isSelect){
                        Vue.set(tagItem,'isSelect',false);
                        this.tagSelectNum=this.tagSelectNum-1;
                    }else{
                        Vue.set(tagItem,'isSelect',true);
                        this.tagSelectNum=this.tagSelectNum+1;
                    }
                }
            });
        },
        nextStepPress:function(){
            if(this.quesName==''){
                $.alert("请输入问卷名称！");
                return false;
            }
            if(this.tagSelectNum==0){
                $.alert('请选择问卷类型！');
                return false;
            }
            this.showFirstStep=false;
        },
        lastStepPress:function(){
            this.showFirstStep=true;
        },
        completePress:function(){
            if(this.quesTitleInfo==""){
                $.alert("请输入题目提示");
            }else if(this.titleNames==""){
                $.alert("请添加题目内容");
            }else if(this.optionContents==""){
                $.alert("请添加选项内容");
            }else{
                $.alert("所有选项填判断已完成跳转到首页");
            }

        },
        //删除题目
        deleteTitle:function(index){
            this.titleNames.splice(index,1);
        },
        //添加题目
        addTitle:function(){
            this.titleNames.push({titleName:""});

        },
        //添加选项
        addOption:function(){
            this.optionContents.push({optionName:"",score:""});
        },
        //删除选项
        deleteOption:function(index){
            this.optionContents.splice(index,1);
        },
        //上移选项
        upOption:function(index){
          if(index==0){
              $.alert("选项已在最前面");
          }else{
              this.optionContents.splice(index-1,0,this.optionContents[index]);
              this.optionContents.splice(index+1,1);
          }
        },
        //下移选项
        downOption:function(index){
          if(index==this.optionContents.length-1){
              $.alert("选项已是最后");
          }else{
              this.optionContents.splice(index+2,0,this.optionContents[index]);
              this.optionContents.splice(index,1);
          }
        }
    }
});
