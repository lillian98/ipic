$(function(){
    function ipicList(_url,_index,_dom){
        this.jsonHead = 'http://om6om7its.bkt.clouddn.com/ipic';
        this.listUrl = _url,
        this.jsonIndex = _index;
        this.initDom = $('#'+_dom);
        this.init();
    }
    ipicList.prototype = {
        init:function(){
            var _this = this;
            $.ajax({
                url: _this.listUrl + '?t=' + Date.parse(new Date())/1000,
                dataType: 'jsonp',
                jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                jsonpCallback:'ipicallback',//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
                success:function(data){
                    console.log('data is',data);
                    $(data.list).each(function(i,k){
                        if(_this.jsonIndex == i + 1){
                            _this.getJson(k['商品链接']);
                        }
                    })
                }
            })
        },
        getJson:function(_url){
            var _this = this;
            $.ajax({
                url: _this.jsonHead + _url + '.json?t=' + Date.parse(new Date())/1000,
                dataType: 'jsonp',
                jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                jsonpCallback:'ipicallback',//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
                success:function(data){
                    console.log('data is',data);
                    _this.renderData(data);
                }
            })
        },
        renderData:function(data){
            var modifyDate = new Date(parseInt(data.timeStamp)*1000);
            this.initDom.append('最后修改时间：',modifyDate);
            var tHtml = '<ul class="cf list-ul">';
            $(data.list).each(function(i,k){
                tHtml += '<li><a href="' + k['商品链接'] + '" target="_blank"><div class="list-name">' + k['商品名'] + '</div><img class="list-img" src="http://om6om7its.bkt.clouddn.com/' + k['商品图片'] + '"></img></a></li>';
            })
            tHtml += '</ul>';
            this.initDom.append(tHtml);
        }
    }

    var tList = new ipicList('http://om6om7its.bkt.clouddn.com/test0829.js',window.location.hash.substr(1),'listWrap');


})