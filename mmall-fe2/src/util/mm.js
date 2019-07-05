//通用js工具
// import $ from 'jquery';
var $= require('jquery');
//根据官方文档，hogan新版本引入方式为: 括号里面要加.js
var Hogan = require('hogan.js');
var conf = {
    serverHost : ''
};
var _mm = {
    //网络请求工具
    request : function(param){
        var _this = this;
        $.ajax({
            type     :  param.method  ||  'get',
            url      :  param.url     ||  '',
            dataType :  param.type    ||  'json',
            data     :  param.data    ||   '',
            success  :  function(res){
                if(0 === res.status){ //请求成功
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }else if(10 === res.status){ //没有登录状态，需要强制登录
                    _this.doLogin();
                }else if(1 === res.status){ //请求数据错误
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error    :  function(err){ //请求失败 —— 404....
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    //在本例中，地址就是空字符串+path
    getServerUrl:function (path) {
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam:function(name){
        var reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板的方法
    renderHtml : function(htmlTemplate,data){
        var template = Hogan.compile(htmlTemplate);
        var result = template.render(data);
        return result;
    },
    //成功提示
    successTips: function(msg){
        alert(msg || '操作成功！');
    },
    //错误提示
    errorTips: function(msg){
        alert(msg || '哪里不对了—');
    },
    //字段的验证：支持非空、手机、邮箱的判断
    validate:function(value,type){
        var value = $.trim(value);//去除输入前后的空格,并且把不是字符串的数据转换成字符串
        if('require' === type){ //非空验证
            return !!value;
        }
        if('phone' === type){ //手机验证
            return /^1\d{10}$/.test(value);
        }
        if('email' === type){ //邮箱验证
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登陆处理：跳转到登陆页面，在移动端可以调用微信登陆等
    doLogin : function(){
        //?后面的参数表示跳转之前的页面地址，这样在登录后可以回到当前页面.编码的目的是害怕当前地址中会有特殊字符，导致拼接中断
        window.location.href = './user-login.html?redirect='+ encodeURIComponent(window.location.href) ;
    },
    //回到主页
    goHome : function () {
        window.location.href = './index.html';
    }

};
//注意：module.exports与import。。。from。。 不能混用
module.exports = _mm;//定义一个_mm对象（模块），并把该模块输出