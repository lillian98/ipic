$(function(){
    function ipicList(_url,_dom,_timeDom,_activityDom){
        this.jsonHead = 'http://om6om7its.bkt.clouddn.com/ipic';
        this.initUrl = _url;
        this.initDom = $('#'+_dom);
        this.timeDom = $('#' + _timeDom);
        this.activityDom = $('#' + _activityDom);
        this.activityUrl = [];
        this.curIndex = 0;
        this.canHover = true;
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
            var _this = this;
            this.timeDom.append('最后修改时间：',new Date(parseInt(data.timeStamp)*1000));
            var tHtml = '';
            var tIndex = -1;
            (window.location.hash !='') && (tIndex = window.location.hash.substr(1));
            $(data.list).each(function(i,k){
                if(i == 0){
                    tHtml += '<li class="active"><a href="javascript:void(0)"><span class="list-name">' + k['商品名'] + '</span></a></li>';
                }
                else{
                    tHtml += '<li class=""><a href="javascript:void(0)"><span class="list-name">' + k['商品名'] + '</span></a></li>';
                }
                $('#activityUrl').attr('href','project.html#' + k['SKUID']);
                $('#activityUrlToCopy').html(window.location.href + 'project.html#' + k['SKUID']);
                _this.activityUrl.push(k['商品链接']);
            })
            this.initDom.append(tHtml);
            this.getActivityCt(this.activityUrl[0]);
            this.bindClick(this.initDom.find('li'));
            /*if(tIndex != -1){
                //window.location.href = "project.html#" + k['商品链接'];
                $(this.initDom).find('li').hide();
                $(this.initDom).find('li').eq(tIndex-1).show();
            }*/
        },
        getActivityCt:function(_url){
            console.log('_url',_url);
            var _this = this;
            if(_this.canHover){
                _this.canHover = false;
                $.ajax({
                    url: _this.jsonHead + _url + '.json?t=' + Date.parse(new Date())/1000,
                    dataType: 'jsonp',
                    jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                    jsonpCallback:'ipicallback',//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
                    success:function(data){
                        console.log('data is',data);
                        _this.canHover = true;
                        _this.renderActivityData(data);
                    }
                })
            }

        },
        renderActivityData:function(data){
            var tHtml = '';
            //activityDom
            $(data.list).each(function(i,k){
                tHtml += '<li class="panel"><header class="panel-heading">' + k['商品名'] + '</header><div class="panel-body"><a href="' + k['商品链接'] + '" target="_blank"><img class="list-img" src="http://om6om7its.bkt.clouddn.com/' + k['商品图片'] + '"></img></a></div></li>';
            })
            this.activityDom.html(tHtml);
        },
        bindClick:function(_dom){
            var _this = this;
            $(_dom).click(function(){
                var tIndex = $(_dom).index($(this));
                if(tIndex != _this.curIndex){
                    _this.curIndex = tIndex;
                    _this.getActivityCt(_this.activityUrl[tIndex]);
                }
            })
        }
    }

    var tList = new ipicList('http://om6om7its.bkt.clouddn.com/test0829.js','listWrap','modifyTime','activityDom');


})