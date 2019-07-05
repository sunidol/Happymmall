var webpack = require('webpack');

var path = require('path');

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var htmlWebpackPlugin = require('html-webpack-plugin');
//封装函数解决每个页面都需要处理html模板问题
var getHtmlConfig = function(name,title){
    return{
        template:path.resolve(__dirname, 'src/view/'+name+'.html'),//指定模板文件路径
        filename:'view/'+name+'.html',
        favicon : './favicon.ico',
        title:title,
        inject:true,
        hash:true,
        chunks:['commons',name]
    };
};

//环境变量的配置，dev / online 通过变量判断是线上或开发环境
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

var config = {
    devServer: {
        disableHostCheck: true,
        // port :8088,
        // historyApiFallback : {
        //     index : '/dist/view/index.html',
        // },
        // proxy : {
        //     '/user':{
        //         target:'http://test.happymmall.com',
        //         changeOrigin:true
        //     }
        // }
    },
    entry:{
        'commons':[path.join(__dirname,'./src/page/common/index.js')],
        'index':[path.join(__dirname,'./src/page/index/index.js')],
        'list':[path.join(__dirname,'./src/page/list/index.js')],
        'detail':[path.join(__dirname,'./src/page/detail/index.js')],
        'cart':[path.join(__dirname,'./src/page/cart/index.js')],
        'order-confirm':[path.join(__dirname,'./src/page/order-confirm/index.js')],
        'order-list':[path.join(__dirname,'./src/page/order-list/index.js')],
        'order-detail':[path.join(__dirname,'./src/page/order-detail/index.js')],
        'payment':[path.join(__dirname,'./src/page/payment/index.js')],
        'user-login':[path.join(__dirname,'./src/page/user-login/index.js')],
        'user-register':[path.join(__dirname,'./src/page/user-register/index.js')],
        'user-pass-reset':[path.join(__dirname,'./src/page/user-pass-reset/index.js')],
        'user-center':[path.join(__dirname,'./src/page/user-center/index.js')],
        'user-center-update':[path.join(__dirname,'./src/page/user-center-update/index.js')],
        'user-pass-update':[path.join(__dirname,'./src/page/user-pass-update/index.js')],
        'result':[path.join(__dirname,'./src/page/result/index.js')],
        'about':[path.join(__dirname,'./src/page/about/index.js')],
    },
    output:{
        path:path.join(__dirname,'./dist'),//存放文件的路径,必须为绝对路径才有效
        filename:'js/[name].js',
        publicPath:'/dist/', //访问文件时用的路径
        chunkFilename:"js/[name].js"
    },
    // externals : {
    //     'jquery': 'window.jQuery'
    // },
    resolve:{
        alias : { //配置各文件路径的别名，方便引用，__dirname表示当前项目根目录
            util : __dirname + '/src/util',
            page : __dirname + '/src/page',
            service : __dirname + '/src/service',
            image : __dirname + '/src/image',
            node_modules : __dirname + '/node_modules',
        }
    },
    module:{
      rules:[
          { test: /\.css$/, use: [ MiniCssExtractPlugin.loader,'css-loader'] },
          { test: /\.(png|jpg|gif|bmp|jpeg)$/, use: [{
                  loader:'url-loader',
                  options:{
                      limit:100,
                      outputPath:'resource/',
                      name:'[name].[ext]'
                  }
              }],
          },
          { test: /\.(ttf|eot|svg|woff|woff2)\??.*$/, use: 'url-loader' },
          { test:  /\.string$/,
            loader: 'html-loader',
            query : {
              minimize : true,
              removeAttributeQuotes : false
            }
          }
      ]
    },
    plugins:[ // 添加所有webpack 插件的配置节点
        new MiniCssExtractPlugin({ //css文件单独打包
            filename:"css/[name].css", //保存到dist目录下，有一个css文件夹
            chunkFilename:"[id].css"
        }),
        //每个html页面都需要new，不现实，所以通过封装函数解决
        new htmlWebpackPlugin(getHtmlConfig('index' ,'首页')),
        new htmlWebpackPlugin(getHtmlConfig('list' ,'商品列表')),
        new htmlWebpackPlugin(getHtmlConfig('detail' ,'商品详情')),
        new htmlWebpackPlugin(getHtmlConfig('cart' ,'购物车')),
        new htmlWebpackPlugin(getHtmlConfig('order-confirm' ,'订单确认')),
        new htmlWebpackPlugin(getHtmlConfig('order-list' ,'订单列表')),
        new htmlWebpackPlugin(getHtmlConfig('order-detail' ,'订单详情')),
        new htmlWebpackPlugin(getHtmlConfig('payment' ,'订单支付')),
        new htmlWebpackPlugin(getHtmlConfig('user-login' ,'用户登录')),
        new htmlWebpackPlugin(getHtmlConfig('user-register' ,'用户注册')),
        new htmlWebpackPlugin(getHtmlConfig('user-pass-reset' ,'找回密码')),
        new htmlWebpackPlugin(getHtmlConfig('user-center' ,'个人中心')),
        new htmlWebpackPlugin(getHtmlConfig('user-center-update' ,'修改个人信息')),
        new htmlWebpackPlugin(getHtmlConfig('user-pass-update' ,'修改密码')),
        new htmlWebpackPlugin(getHtmlConfig('result','操作结果')),
        new htmlWebpackPlugin(getHtmlConfig('about','关于mmall')),
        // new htmlWebpackPlugin({
        //     template:'./src/view/index.html',//指定模板文件路径
        //     filename:'view/index.html',
        //     inject:true,
        //     hash:true,
        //     chunks:['commons','index']
        // })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                //打包 业务中的公共代码，独立通用模块到js/common.js
                commons: {
                    name: 'commons' ,  // 提取出来的文件命名
                    // name： ‘common/common’ //  即先生成common文件夹
                    // chunks: 'initial',   // initial表示提取入口文件的公共css及js部分
                    // chunks: 'all' // 提取所有文件的公共部分
                    // test： '/\.css$/'  // 只提取公共css ，命名可改styles
                    minChunks:2, // 表示提取公共部分最少的文件数
                    minSize: 0  // 表示提取公共部分最小的大小
                    // 如果发现页面中未引用公共文件，加上enforce: true
                },
            }
        }
    }
    };

    //设置了这一步之后，就可以用npm run dev命令来代替webpack打包了
    if('dev' === WEBPACK_ENV){
        config.entry.commons.push('webpack-dev-server/client?http://localhost:8080/');
    }
    module.exports = config;
