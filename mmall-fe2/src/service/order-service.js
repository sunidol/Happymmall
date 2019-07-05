var _mm = require('util/mm.js');
var $= require('jquery');
var _order = {
    // 获取商品列表
    getProductList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
            // method  : 'POST',请求方式默认即可
            success : resolve,
            error   : reject
        });
    },
    //提交订单
    createOrder : function (orderInfo,resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/order/create.do'),
            // method  : 'POST',请求方式默认即可
            data : orderInfo,
            success : resolve,
            error   : reject
        });
    },
    //获取订单列表
    getOrderList : function (listParam,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/list.do'),
            // method  : 'POST',请求方式默认即可
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    getOrderDetail : function (orderNumber,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/detail.do'),
            // method  : 'POST',请求方式默认即可
            data: {
                orderNo : orderNumber
            },
            success: resolve,
            error: reject
        });
    },
    //取消订单
    cancelOrder : function (orderNumber,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/cancel.do'),
            // method  : 'POST',请求方式默认即可
            data: {
                orderNo : orderNumber
            },
            success: resolve,
            error: reject
        });
    },
}

module.exports = _order;