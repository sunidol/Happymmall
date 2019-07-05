require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var _mm = require('util/mm.js');
var $ = require('jquery');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        productId      : _mm.getUrlParam('productId') || ''
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        //如果没有传productId，自动跳回首页
        if(!this.data.productId){
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function() {
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function () {
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // count的操作
        $(document).on('click', '.p-count-btn', function () {
            var $pCount = $('.p-count'),
                currCount = parseInt($pCount.val()),
                type = $(this).hasClass('plus') ? 'plus' : 'minus',
                minCount = 1,
                maxCount = _this.data.detailInfo.stock || 1;
            if (type === 'plus') {
                if (currCount >= maxCount) {
                    _mm.errorTips('该商品数量已达到上限');
                    console.log(maxCount);
                    return;
                }
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            } else if (type === 'minus') {
                if (currCount <= minCount) {
                    return;
                }
                $pCount.val(currCount > minCount ? currCount - 1 : maxCount);
            }

        });
        // 加入购物车
        $(document).on('click', '.cart-add', function () {
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            }, function (res) {
                window.location.href = './result.html?type=cart-add';
            }, function (errMsg) {
                _mm.errorTips(errMsg);
            });
        });
    },
    // 加载商品详情的数据
    loadDetail: function(){
        var _this = this;
        var html = '';
        var $pageWrap = $('.page-wrap');
        //loading
        $pageWrap.html('<div class="loading"></div>');
        //请求detail信息
        _product.getProductDetail(this.data,function (res) {
            _this.filter(res);
            // 缓存住detail的数据
            _this.data.detailInfo = res;
            html = _mm.renderHtml(templateIndex,res);
            $pageWrap.html(html);
        },function (errMsg) {
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了/(ㄒoㄒ)/~~</p>');
        })
    },
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};
$(function () {
    page.init();
})