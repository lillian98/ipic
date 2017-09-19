$(function(){
    function ipicList(_url,_index,_dom,_titleDom,_navDom){
        this.jsonHead = '//om6om7its.bkt.clouddn.com/ipic';
        this.listUrl = _url,
        this.jsonIndex = _index;
        this.initDom = $('#'+_dom);
        this.titleDom = $('#'+_titleDom);
        this.navDom = $('#'+_navDom);
        this.modifyDom = $('#modifyTime');
        this.widthArray = ['全部'];
        this.floorArray = ['全部'];
        this.titleArray = [];
        this.floorObjArray = [];
        this.categoryType = -1;//0:默认为宽度分类，1为按文件名分类
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
                if(k['商品名'].split("-").length == 3){
                    ( _this.categoryType == -1) && (_this.categoryType = 1);
                    var tParamFloor = k['商品名'].split("-")[0];
                    var tParamTitle = k['商品名'].split("-")[1];
                    if ($.inArray(tParamFloor, _this.floorArray) == -1) {
                        var __obj = {
                            "name":k['商品名'].split("-")[2],
                            "url":k['商品链接'],
                            "pic":k['商品图片']
                        };
                        var __array = [__obj];
                        _this.floorArray.push(tParamFloor);
                        _this.titleArray.push([tParamTitle]);
                        var _tObj = {
                            "Floor":tParamFloor,
                            "TitleList":[tParamTitle],
                            "ModuleList":[]
                        }
                        _this.floorObjArray.push(_tObj);
                        _this.floorObjArray[_this.floorArray.length-2].ModuleList.push(__array);
                    }
                    else{
                        var _floorIndex = $.inArray(tParamFloor, _this.floorArray) - 1;
                        if ($.inArray(tParamTitle, _this.floorObjArray[_floorIndex].TitleList) == -1) {
                            _this.titleArray[_this.titleArray.length-1].push(tParamTitle);
                            _this.floorObjArray[_floorIndex].TitleList.push(tParamTitle);
                            var __obj = {
                                "name":k['商品名'].split("-")[2],
                                "url":k['商品链接'],
                                "pic":k['商品图片']
                            };
                            var __array = [__obj];
                            _this.floorObjArray[_floorIndex].ModuleList.push(__array);
                        }
                        else{
                            var __index = $.inArray(tParamTitle, _this.floorObjArray[_floorIndex].TitleList);
                            var __obj = {
                                "name":k['商品名'].split("-")[2],
                                "url":k['商品链接'],
                                "pic":k['商品图片']
                            }
                            _this.floorObjArray[_floorIndex].ModuleList[__index].push(__obj);
                        }
                    }
                }
                else{
                    ( _this.categoryType == -1) && (_this.categoryType = 0);
                    var tParamWidth = k['自定义字段1'].split("#?")[2].split("&?")[0];
                    var tParamHeight = k['自定义字段1'].split("#?")[2].split("&?")[1];
                    if ($.inArray(tParamWidth + '*' + tParamHeight, _this.widthArray) == -1) {
                        _this.widthArray.push(tParamWidth + '*' + tParamHeight);
                    }
                    tHtml += '<li data-width="' + tParamWidth +'" data-height="' + tParamHeight + '" class="panel"><header class="panel-heading">' + k['商品名'] + '</header><div class="panel-body"><a href="' + k['商品链接'] + '" target="_blank"><img class="list-img" src="http://om6om7its.bkt.clouddn.com/' + k['商品图片'] + '"></img></a></div></li>';
                }
            })
            console.log('11111',_this.floorObjArray);
            if(_this.categoryType == 0){
                tHtml = '<ul class="cf list-ul">' + tHtml + '</ul>';
                $(_this.widthArray).each(function(i,k){
                    navHtml += '<li><a href="javascript:void(0)"><span class="list-name">' + k + '</span></a></li>';
                })
            }
            else if(_this.categoryType == 1){
                $(_this.floorArray).each(function(i,k){
                    navHtml += '<li><a href="javascript:void(0)"><span class="list-name">' + k + '</span></a></li>';
                })
                $(_this.floorObjArray).each(function(i,k){
                    $(_this.floorObjArray[i].TitleList).each(function(_i,_k){
                        var _moduleCt = '';
                        $(_this.floorObjArray[i].ModuleList[_i]).each(function(__i,__k){
                            _moduleCt += '<div class="module-floor" data-title="' + _k + '" class="panel"><header class="panel-heading">' + __k.name + '</header><div class="panel-body"><a href="' + __k.url + '" target="_blank"><img class="list-img" src="http://om6om7its.bkt.clouddn.com/' + __k.pic + '"></img></a></div></div>';
                        })
                        tHtml += '<div class="title-floor panel" data-floor="' + k.Floor + '"><h2>' + _k + _moduleCt + '</h2></div>';
                    })
                    //tHtml += '<div class="wrap-floor">' + k.Floor  + '</div>';
                })
            }
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
            if(_index == 0){
                $(this.initDom).find('li').show()
            }
            else{
                if(_this.categoryType == 0){
                    $(this.initDom).find('li').hide();
                    var _curWidth = this.widthArray[_index].split('*')[0];
                    var _curHeight = this.widthArray[_index].split('*')[1];
                    $("li[data-width='" + _curWidth + "'][data-height='" + _curHeight + "']").show();
                }
                else if(_this.categoryType == 1){
                    $(this.initDom).find('.panel').hide();
                    var _curFloor = this.floorArray[_index];
                    $("#listWrap div[data-floor='" + _curFloor + "']").show();
                }

            }

        }
    }

    var tList = new ipicList('//om6om7its.bkt.clouddn.com/test0829.js',window.location.hash.substr(1),'listWrap','titleDom','navDom');


})