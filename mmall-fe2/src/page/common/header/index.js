require('./index.css');
var $= require('jquery');
var _mm = require('util/mm.js');
//通用页面头部
var header = {
    init : function(){
        this.bindEvent();
        this.onload();
    },
    onload : function(){
        var keyword = _mm.getUrlParam('keyword');
        //keyword存在，则回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent : function(){
        var _this = this;
        //点击搜索按钮以后，做搜索提交
        $('#search-button').click(function () {
            _this.searchSubmit();
        });
        //输入回车(13是回车键的keycode)后，做搜索提交
        $('#search-input').keyup(function (e) {
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        })
    },
    //搜索的提交
    searchSubmit : function () {
        var keyword = $.trim($('#search-input').val());
        //如果提交时候有关键字，正常跳到list页面；如果关键字为空，直接返回首页
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }else{
            _mm.goHome()
        }
    }
};
header.init();
// header中不需要输出，可以去掉module.exports
// module.exports = header.init();