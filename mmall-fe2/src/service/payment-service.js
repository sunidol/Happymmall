var _mm = require('util/mm.js');
var $= require('jquery');
var _payment = {
    // 获取支付信息
    getProductList : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/pay.do'),
            // method  : 'POST',请求方式默认即可
            data : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    //获取订单状态
    getPaymentStatus :  function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/query_order_pay_status.do'),
            // method  : 'POST',请求方式默认即可
            data : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
}

module.exports = _payment;