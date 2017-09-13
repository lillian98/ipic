$(function(){
    function ipicList(_url,_index,_dom,_titleDom,_navDom){
        this.jsonHead = 'http://om6om7its.bkt.clouddn.com/ipic';
        this.listUrl = _url,
        this.jsonIndex = _index;
        this.initDom = $('#'+_dom);
        this.titleDom = $('#'+_titleDom);
        this.navDom = $('#'+_navDom);
        this.modifyDom = $('#modifyTime');
        this.widthArray = ['全部'];
        this.curIndex = -1;
        this.canHover = true;
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
                            _this.titleDom.html(k['商品名']);
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
            var _this = this;
            var modifyDate = new Date(parseInt(data.timeStamp)*1000);
            this.modifyDom.html('最后修改时间：' + modifyDate);
            var tHtml = '';
            var navHtml = '';
            $(data.list).each(function(i,k){
                var tParamWidth = k['自定义字段1'].split("#?")[2].split("&?")[0];
                var tParamHeight = k['自定义字段1'].split("#?")[2].split("&?")[1];
                if ($.inArray(tParamWidth + '*' + tParamHeight, _this.widthArray) == -1) {
                    _this.widthArray.push(tParamWidth + '*' + tParamHeight);
                    // do something special
                }
                tHtml += '<li data-width="' + tParamWidth +'" data-height="' + tParamHeight + '" class="panel"><header class="panel-heading">' + k['商品名'] + '</header><div class="panel-body"><a href="' + k['商品链接'] + '" target="_blank"><img class="list-img" src="http://om6om7its.bkt.clouddn.com/' + k['商品图片'] + '"></img></a></div></li>';

            })
            $(_this.widthArray).each(function(i,k){
                navHtml += '<li><a href="javascript:void(0)"><span class="list-name">' + k + '</span></a></li>';
            })
            this.initDom.append(tHtml);
            this.navDom.append(navHtml);
            this.showCurModels(0);
            this.bindClick(this.navDom.find('li'));
        },
        bindClick:function(_dom){
            var _this = this;
            $(_dom).click(function(){
                var tIndex = $(_dom).index($(this));
                if(tIndex != _this.curIndex){
                    _this.curIndex = tIndex;
                    _this.showCurModels(tIndex);
                }
            })
        },
        showCurModels:function(_index){
            var _this = this;
            this.navDom.find('li').removeClass('active');
            this.navDom.find('li').eq(_index).addClass('active');
            this.curIndex = _index;
            var _curWidth = this.widthArray[_index].split('*')[0];
            var _curHeight = this.widthArray[_index].split('*')[1];
            $(this.initDom).find('li').hide();
            if(_index == 0){
                $(this.initDom).find('li').show()
            }
            else{
                $("li[data-width='" + _curWidth + "'][data-height='" + _curHeight + "']").show();
            }

        }
    }

    var tList = new ipicList('http://om6om7its.bkt.clouddn.com/test0829.js',window.location.hash.substr(1),'listWrap','titleDom','navDom');


})