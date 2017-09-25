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
/**
 * 注册全局组件
 * 图形选择各个图形样式
 */
Vue.component('my-graph-item',{
    props:['graphName',"graphPath","className"],
    template:'<div :class="className" @click="myGraphItem">\
                   <img :src="graphPath" class="graph-img"/>\
                   <div>{{graphName}}</div>\
               </div>',
    methods:{
        myGraphItem:function(){
            this.$emit('mygraphitem');
        }
    }
});
/*
 * vue实例化
 */
var vmReportSet = new Vue({
    el: '#mobileReport',
    data: {
        scoreInfos:[],//分数解释盒中信息
        scoreDimensions:[
            {
                dimenName:"第一维度",
                dimenScores:[
                    {
                        scoreFist:0,
                        scoreEnd:20,
                        scoreExplain:"20内分数解释",
                        scoreSuggest:"20内发展建议"},
                    {
                        scoreFist:21,
                        scoreEnd:40,
                        scoreExplain:"40内分数解释",
                        scoreSuggest:"40内发展建议"}
                ],
                dimenStatus:false},
            {
                dimenName:"第二维度",
                dimenScores:[
                    {
                        scoreFist:40,
                        scoreEnd:60,
                        scoreExplain:"40内分数解释",
                        scoreSuggest:"40内发展建议"},
                    {
                        scoreFist:61,
                        scoreEnd:80,
                        scoreExplain:"60内分数解释",
                        scoreSuggest:"80内发展建议"}
                ],
                dimenStatus:false}
        ],//分数解释维度信息
        showDimenList:false,//如果问卷维度未建立，维度列表不显示，且提示用户
        showScoreList:false,//初始进入页面不显示，选择维度后再显示
        graphInfos:[//图形选择时渲染数据及点击保存信息
            {
                selectStatus:false,//为维度选择保存数据
                graphName:"柱状图",
                graphPath:"../images/graph/histogram.png"},
            {
                selectStatus:false,
                graphName:"条形图",
                graphPath:"../images/graph/barchart.png"},
            {
                selectStatus:false,
                graphName:"折线图",
                graphPath:"../images/graph/linechart.png"},
            {
                selectStatus:false,
                graphName:"饼图",
                graphPath:"../images/graph/pie.png"},
            {
                selectStatus:false,
                graphName:"雷达图",
                graphPath:"../images/graph/radar.png"}
        ],//初始化第一步图形选择信息
        graphInfoSelects:[],//保存第一步图形被选择的
        showSecondStep:false,//是否显示第二步
        dimensionInfos:[],//第二步维度渲染信息
        graphDimenInfos:[
            {
                dimenName:"第一维度",
                dimenStatus:false},
            {
                dimenName:"第二维度",
                dimenStatus:false}
        ],//第二步维度初始化信息如果在这引用会联动
    },
    mounted:function(){
        if(this.scoreDimensions.length==0){
            this.showDimenList=false;
        }
        else{
            this.showDimenList=true;
        }
    },
    methods:{
        //返回问卷设置
        pageComeBack:function(){
            window.location.href='../html/mobile-setting.html ';
        },
        //分数解释中维度选择
        scoreDimenSelec:function(index){
            this.showScoreList=true;
            var jj,jjlen=this.scoreDimensions.length;
            for(jj=0;jj<jjlen;jj++){
                if(this.scoreDimensions[jj].dimenStatus)
                this.scoreDimensions[jj].dimenStatus=false;
            }
            this.scoreDimensions[index].dimenStatus=true;
            this.scoreInfos=this.scoreDimensions[index].dimenScores;
        },
        //增加分数解释盒
        scoreAdd:function(index){
            var tempScoreFist=this.scoreInfos[index].scoreEnd+1;
            var tempScore={scoreFist:tempScoreFist,scoreEnd:null,scoreExplain:"",scoreSuggest:""};
            this.scoreInfos.splice(index+1,0,tempScore);
            $.alert("分数块已添加");
        },
        //删除分数解释盒
        scoreDele:function(index){
            if(this.scoreInfos.length==1){
                $.alert("分数项已是最后一个，请保留");
            }else{
                this.scoreInfos.splice(index,1);
            }
        },
        //第一步单个图形选择时类切换
        graphSelectFist:function(index){
            if(this.graphInfos[index].selectStatus){
                this.graphInfos[index].selectStatus=false;
            }else{
                this.graphInfos[index].selectStatus=true;
            }
        },
        //第一步图形选择确定
        graphItemSunmit:function(){
            var i,j=0;
            var len=this.graphInfos.length;
            var tempArray=[];
            for(i=0;i<len;i++){
               if(this.graphInfos[i].selectStatus){
                   var temp={};
                   temp.graphName=this.graphInfos[i].graphName;
                   temp.graphPath=this.graphInfos[i].graphPath;
                   temp.selectStatus=false;
                   temp.dimensions=[
                       {
                           dimenName:"第一维度",
                           dimenStatus:false},
                       {
                           dimenName:"第二维度",
                           dimenStatus:false}
                   ];
                   tempArray.push(temp);
                   j+=1;
               }
            }
            if(j==0){
                $.alert("请选择图形");
                this.showSecondStep=false;
            }else{
                this.showSecondStep=true;
                this.graphInfoSelects=tempArray;
            }
        },
        //第二步单个图形选择时类切换
        graphSelectSec:function(index){
            //所有图形初始化未选择状态
            var ii,iilen=this.graphInfoSelects.length;
            for(ii=0;ii<iilen;ii++) {
                if (this.graphInfoSelects[ii].selectStatus) {
                    this.graphInfoSelects[ii].selectStatus = false;
                    this.graphInfoSelects[ii].graphPath = this.graphInfoSelects[ii].graphPath.replace(/_selected.png/g, ".png");
                }

            }
            //当前选中的图形设为选中状态
            this.graphInfoSelects[index].selectStatus=true;
            this.graphInfoSelects[index].graphPath=this.graphInfoSelects[index].graphPath.replace(/\.png/g,"_selected.png");
            this.dimensionInfos=this.graphInfoSelects[index].dimensions;
        },
        //第二步维度选择时类切换
        paraDimensionSelect:function(index){
            if(this.dimensionInfos[index].dimenStatus){
                this.dimensionInfos[index].dimenStatus=false;
            }else{
                this.dimensionInfos[index].dimenStatus=true;
            }
        },
        //最后报告完成
        reportSubmit:function(){
            $.alert("保存报告所有信息到后台并返回设置页");
        }
    }
})