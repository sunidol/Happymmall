var _mm = require('util/mm.js');
var $= require('jquery');
var _product = {
    // 获取商品列表
    getProductList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            // method  : 'POST',请求方式默认即可
            success : resolve,
            error   : reject
        });
    },
    // 获取商品详细信息
    getProductDetail : function(detailInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : detailInfo,
            // method  : 'POST',请求方式默认即可
            success : resolve,
            error   : reject
        });
    },
}

module.exports = _product;