/**
 * Created by 00004725 on 2017/9/11.
 */
/*
 * vue实例化
 */
var javaURI='http://assessment.boe.com:8080/ac/';
var vmQuesSearch = new Vue({
    el: '#mobileSearch',
    data: {
        quesName: '',
    },
    methods:{
        search:function(){
            $.alert(this.quesName);
            //window.location.href="mobile-search.html?name="+this.questionnaire;
        }
    }
});
