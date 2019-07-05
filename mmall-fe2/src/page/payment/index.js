


require('page/common/nav/index.js');

require('page/common/header/index.js');

require('./index.css');

var _mm = require('util/mm.js');

var $ = require('jquery');

var _payment = require('service/payment-service.js');

var templateIndex = require('./index.string');

var page = {
    data : {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init:function () {
        this.onLoad();
    },
    onLoad:function () {
        //加载detail数据
        this.loadPaymentInfo();
    },
    //加载订单列表
    loadPaymentInfo : function () {
        var _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getProductList(this.data.orderNumber,function (res) {
            //渲染html
            paymentHtml = _mm.renderHtml(templateIndex,res);
            $pageWrap.html(paymentHtml);
            //监听订单状态
            _this.listenOrderStatus();
        },function (errMsg) {
            $pageWrap.html('<p class="err-tip">'+ errMsg +'</p>')
        });
    },
    //监听订单状态
    listenOrderStatus : function () {
        var _this = this;
        //5s轮询一次，监听
        this.paymentTimer = window.setInterval(function () {
            _payment.getPaymentStatus(_this.data.orderNumber,function (res) {
                if(res == true){ //已经支付成功
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;

                }
            })
        },5e3)
    }
};
$(function () {
    page.init();
});