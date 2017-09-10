$(function(){
    function ipicList(_url,_dom){
        this.initUrl = _url;
        this.initDom = $('#'+_dom);
        this.init();
    }
    ipicList.prototype = {
        init:function(){
            var _this = this;
            $.ajax({
                url: _this.initUrl + '?t=' + Date.parse(new Date())/1000,
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
            this.initDom.append('最后修改时间：',new Date(parseInt(data.timeStamp)*1000));
            var tHtml = '<ul class="cf list-ul">';
            var tIndex = -1;
            (window.location.hash !='') && (tIndex = window.location.hash.substr(1));
            $(data.list).each(function(i,k){
                tHtml += '<li><a href="project.html#' + k['SKUID'] + '" target="_blank"><span class="list-name">' + k['商品名'] + '</span><span class="list-url">' + k['商品链接'] + '</span></a></li>';
            })
            tHtml += '</ul>';
            this.initDom.append(tHtml);
            if(tIndex != -1){
                //window.location.href = "project.html#" + k['商品链接'];
                $(this.initDom).find('li').hide();
                $(this.initDom).find('li').eq(tIndex-1).show();
            }
        }
    }

    var tList = new ipicList('http://om6om7its.bkt.clouddn.com/test0829.js','listWrap');


})