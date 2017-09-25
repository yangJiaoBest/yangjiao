/**
 * Created by 00004725 on 2017/9/20.
 */
/*
 * vue实例化
 */
var vmShowQues = new Vue({
    el: '#mobileQuestion',
    data: {
        arrTitles:[{
            questName:"题目一的内容",//矩阵中题目名称
            questNameEn:"ques_1",//一个题目一个name保持单选功能
            quesSort:"1、",//题目的序号
            questValue:"",//题目选择的选项值
            questOptions:[
                {   value:"选项一",
                    id:"ques_1_1"//为input和label绑定
                },
                {
                    value:"选项二",
                    id:"ques_1_2"
                },
                {
                    value:"选项三",
                    id:"ques_1_3"
                },
                {   value:"选项四",
                    id:"ques_1_4"//为input和label绑定
                },
                {
                    value:"选项五",
                    id:"ques_1_5"
                },
                {
                    value:"选项六",
                    id:"ques_1_6"
                }
                     ],
            optionsClass:{option2:false,option3:false,option4:false,option5:false,option6:true}//适配选项个数对应不同宽度
        },{
            questName:"题目二的内容",//矩阵中题目名称
            questNameEn:"ques_2",//一个题目一个name保持单选功能
            quesSort:"2、",//题目的序号
            questValue:"",//题目选择的选项值
            questOptions:[
                {   value:"选项一",
                    id:"ques_2_1"//为input和label绑定
                },
                {
                    value:"选项二",
                    id:"ques_2_2"
                },
                {
                    value:"选项三",
                    id:"ques_2_3"
                },
                {   value:"选项四",
                    id:"ques_2_4"//为input和label绑定
                },
                {
                    value:"选项五",
                    id:"ques_2_5"
                },
                {
                    value:"选项六",
                    id:"ques_2_6"
                }
            ],
            optionsClass:{option2:false,option3:true,option4:false,option5:false,option6:true}//适配选项个数对应不同宽度
        }],
        ques_1:"ques_1",//数据未渲染时保存选中的值

    }
});