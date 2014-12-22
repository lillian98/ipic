/*
* 1套10组图片，每张图片需要大量参数
*
* */
/* 图片相关存储解析参数 */
//变量定义
//var imageSrc='';改为数组，允许用户上传2张图片
var imageSrc=[];
var hdText={};
var picA={};
var imgNumb={};//需要本地输入的图片对象
var imgSrc={};
var colorDom = {
	alpha: 0,
	color: "#F00",
	color_x:0,
	color_y:0,
	color_w: 0,
	color_h: 0,
    colo_deg: 0
};
var strType="JPEG";
var font_num = 0;//文字对象总数
var unit_flag = 0;//单元模式，默认不开，这个版本应该不用
var unit_local = [];

var test_flag = true;/* 测试模式 */
var baseArray = []; /* 基本参数，包括：商品图、背景图、文案、logo */
var suitArray = [];/* 系列图片参数数组，一般为10个，设定图片位置，文字形式 */
//#背景图#&0&0&140&40|#商品图#&0&0&53&40#?000000&bold&18&wryh&54&5&#文案1#&normal&normal&0|000000&normal&10&wryh&54&24&#文案2#&normal&normal&0#?140&?40#?1&ffffff&0&225&240&70#?jpg#?none
if(test_flag){
    baseArray = '#商品图#&0&0|#背景图#&300&300|#logo#&150&60#?#文案1|文案2#?1&ffffff&0&0&0&0';
    //'#背景图#&0&0&140&140|#商品图#&-5&21&83&119|http://lillian98.github.io/ipic/tmp/jd_logo_01.jpg&0&0&140&17|#logo#&65&40&75&30#?000000&bold&16&wryh&71&70&#文案1#&normal&normal&0|000000&normal&10&wryh&71&89&#文案2#&normal&normal&0#?140&?140#?1&ffffff&0&225&240&70#?jpg#?none'
    //'#背景图#&0&0&140&226|#商品图#&0&24&114&202|http://lillian98.github.io/ipic/tmp/jd_logo_01.jpg&0&0&140&20#?ffffff&bold&21&wryh&93&104&#文案1#&normal&normal&0&44#?140&?226#?1&c91423&93&102&44&44&10#?jpg#?none'
    suitArray = [
        '#背景图#&0&0&140&40|#商品图#&0&0&53&40#?000000&bold&18&wryh&54&5&#文案1#&normal&normal&0|000000&normal&10&wryh&54&24&#文案2#&normal&normal&0#?140&?40#?1&ffffff&0&225&240&70#?jpg#?none',
        '#背景图#&0&0&140&140|#商品图#&-5&21&83&119|#logo#&65&40&75&30#?000000&bold&16&wryh&71&70&#文案1#&normal&normal&0|000000&normal&10&wryh&71&89&#文案2#&normal&normal&0#?140&?140#?1&ffffff&0&225&240&70#?jpg#?none',
        '#背景图#&0&0&140&226|#商品图#&0&24&114&202|http://lillian98.github.io/ipic/tmp/jd_logo_01.jpg&0&0&140&20#?ffffff&bold&21&wryh&93&104&#文案1#&normal&normal&0&44#?140&?226#?1&c91423&93&102&44&44&10#?jpg#?none',
        '#背景图#&0&0&142&185|#商品图#&0&26&104&159|http://lillian98.github.io/ipic/tmp/jd_logo_01.jpg&0&0&142&20#?ffffff&bold&18&wryh&102&84&#文案1#&normal&normal&0&40#?142&?185#?1&c91423&100&82&38&38&10#?jpg#?none',
        '#背景图#&0&0&160&120|#商品图#&3&28&72&92|http://lillian98.github.io/ipic/tmp/jd_logo_01.jpg&0&0&160&25|#logo#&80&41&75&30#?000000&bold&18&wryh&78&72&#文案1#&normal&normal&0|000000&normal&10&wryh&78&92&#文案2#&normal&normal&0#?160&?120#?0&ffffff&0&225&240&70#?jpg#?none',
        '#背景图#&0&0&160&210|#商品图#&36&101&83&109|http://lillian98.github.io/ipic/tmp/jd_logo_01.jpg&0&0&160&27|#logo#&29&31&105&42#?000000&bold&24&wryh&80&75&#文案1#&center&normal&0#?160&?210#?0&ffffff&0&225&240&70#?jpg#?none',
        '#背景图#&0&0&198&40|#商品图#&0&0&46&40|#logo#&123&5&75&30#?000000&bold&18&wryh&56&5&normal#文案1#&normal&normal&0|000000&normal&10&wryh&56&24&#文案2#&normal&normal&0#?198&?40#?0&ffffff&0&225&240&70#?jpg#?none',
        '#背景图#&0&0&198&100|#商品图#&17&25&71&75|http://lillian98.github.io/ipic/tmp/jd_logo_01.jpg&0&0&198&25|#logo#&100&29&75&30#?000000&bold&18&wryh&100&62&#文案1#&normal&normal&0|000000&normal&10&wryh&100&82&#文案2#&normal&normal&0#?198&?100#?0&ffffff&0&225&240&70#?jpg#?none',
        '#背景图#&0&0&210&130|#商品图#&125&27&77&103|http://lillian98.github.io/ipic/tmp/jd_logo_01.jpg&0&0&210&26|#logo#&5&33&120&48#?000000&bold&28&wryh&5&86&#文案1#&normal&normal&0#?210&?130#?0&ffffff&0&225&240&70#?jpg#?none',
        '#背景图#&0&0&220&120|#商品图#&134&27&71&93|http://lillian98.github.io/ipic/tmp/jd_logo_01.jpg&0&0&220&26|#logo#&13&34&110&44#?000000&bold&28&wryh&7&83&#文案1#&normal&normal&0#?220&?120#?0&ffffff&0&225&240&70#?jpg#?none',
        '#背景图#&0&0&264&54|#商品图#&13&0&67&54|#logo#&182&14&75&30#?000000&bold&24&wryh&85&12&#文案1#&normal&normal&0|000000&normal&14&wryh&85&35&#文案2#&normal&normal&0#?264&?54#?0&ffffff&0&225&240&70#?jpg#?none',
        '#背景图#&0&0&300&80|#商品图#&171&0&96&80|#logo#&27&4&105&42#?000000&bold&26&wryh&24&51&#文案1#&normal&normal&0#?300&?80#?0&ffffff&0&225&240&70#?jpg#?none',
        '#背景图#&0&0&300&300|http://lillian98.github.io/ipic/tmp/jd_logo_01.jpg&0&0&300&35|#商品图#&0&44&178&256|#logo#&150&88&150&60#?000000&normal&34&wryh&160&150&#文案1#&left&normal&0|575753&normal&18&wryh&160&187&#文案2#&normal&normal&0#?300&?300#?0&ffffff&0&225&240&70#?jpg#?none',
    '#背景图#&0&0&760&75|#商品图#&598&0&83&75|http://lillian98.github.io/ipic/tmp/jd_logo_173_75_01.jpg&0&0&173&75|#logo#&244&13&135&54#?000000&bold&40&wryh&407&7&#文案1#&normal&normal&0|000000&normal&22&wryh&407&46&#文案2#&normal&normal&0#?760&?75#?0&ffffff&0&225&240&70#?jpg#?none',
        '#背景图#&0&0&960&75|#商品图#&671&0&81&75|http://lillian98.github.io/ipic/tmp/jd_logo_173_75_01.jpg&0&0&173&75|#logo#&311&13&135&54#?000000&bold&40&wryh&480&7&#文案1#&normal&normal&0|000000&normal&22&wryh&480&47&#文案2#&normal&normal&0#?960&?75#?0&ffffff&0&225&240&70#?jpg#?none'
    ];
}
else{
    /* 正常情况获取参数 */
}
var createPicArray = [];// 存储new pic 对象数组


function CreatePicture(param,canvasId){
    this.param = param;
    this.canvasId = canvasId;
    this.picRule = [];
    this.picLeft=[],/* 存储图片坐标x */
        this.picTop=[],/* 存储图片坐标y */
        this.picWidth=[],/* 存储图片宽 */
        this.picHeight=[], /* 存储图片高 */
        this.netPic=[],/* 存储可能用到的网络图片 */
        this.strHref='',/* 存储带有http的url地址 */
        this.picNumb='',/* 图片数组：strHerf[0].split("|") */
        this.picIndex = [],/* 本地图片对应索引值 */
        this.paraNumb='',/* 我也不记得是什么了：strHerf[1].split("|") */
        this.colorNumb='',/* 色块处理参数：alpha,color,w,h,x,y= strHerf[3].split("|")*/
        this.unitNumb='',/* 单元模式 strHerf[5]*/
        this.unit_flag=0,/* 单元标致 */
        this.myArray={},
    this.picArray={},
    this.colorArray=[],
//        文本处理对象
    this.colorText={},
    this.fontStyle={},
    this.leftT={},
    this.topT={},
    this.alignT={},
    this.italicT={},//是否斜体
    this.fontF={},
    this.fontRotate={},//文字旋转
    this.fontN={},
    this.textA={},
        this.textWidth=0,/* 存储文字一行宽度 */
        //picRule=[300,300],/* strHerf[2].split("&?") */
        this.strType ='',/* 文字处理strHerf[4] */
        this.canvasDom = {},
    this.cxtDom = {},
    this.init(param);
    this.createCanvas(canvasId);

}
CreatePicture.prototype = {
    init:function(param)
       {
        this.strHref = param.split("#?");
        this.picRule[0] = this.strHref[2].split('&?')[0];
           this.picRule[1] = this.strHref[2].split('&?')[1];
           this.test = [1,1];
       },
    createCanvas:function(_cid){
        $('.area-pre-box').append('<canvas id="'+this.canvasId+'" width="'+ this.picRule[0] +'" height="'+ this.picRule[1] +'" class="my-canvas" style=""></canvas><img id="img'+ this.canvasId+'" />');
        this.canvasDom = document.getElementById(this.canvasId);
        this.cxtDom=this.canvasDom.getContext("2d");
    },
    paramAnalyse:function(){
        this.picNumb = this.strHref[0].split("|");
        this.paraNumb = this.strHref[1].split("|");
        this.colorNumb = this.strHref[3].split("|");
        this.unitNumb = this.strHref[5];
        (this.unitNumb == "none" || this.unitNumb == "#none#") && (this.unit_flag = 1);
        (this.unit_flag == 1) && ($(".area-pic-info").hide());
        this.strType = this.strHref[4];
        this.textPro(this.paraNumb);
        this.picParamAnalyse(this.picNumb);
        this.colorParamAnalyse(this.colorNumb);
    },
    textPro:function(textParam){
        var that = this;
        for(var i=0; i<this.paraNumb.length; i++){
           this.myArray[i]=this.paraNumb[i].split("&");
          font_num = this.myArray[i][2];
            that.fontN[i] =font_num;
          if(font_num != 0){
        	  if(this.myArray[i][3]=="hwcy"){
        		that.fontF[i]="华文彩云";
        		$('.font-download').show();
        		$('#spe_font li:eq(0)').show();
        	  }
        	  else if(this.myArray[i][3]=="st"){
                  that.fontF[i]="宋体";
        	  }
        	  else if(this.myArray[i][3]=="wryh"){
                  that.fontF[i]="微软雅黑";
        		$('.font-download').show();
        		$('#spe_font li:eq(1)').show();
        	  }
        	  else if(this.myArray[i][3]=="ht"){
                  that.fontF[i]="黑体";
        	  }
        	  else if(this.myArray[i][3]=="hwxk"){
                  that.fontF[i]="华文行楷";
        		$('.font-download').show();
        		$('#spe_font li:eq(2)').show();
        	  }
        	  else if(this.myArray[i][3]=="ltch"){
                  that.fontF[i]="方正兰亭粗黑简体";
        		$('.font-download').show();
        		$('#spe_font li:eq(3)').show();
        	  }
              else if(this.myArray[i][3]=="ltch1"){
                  that.fontF[i]="方正兰亭黑体";
              		$('.font-download').show();
              		$('#spe_font li:eq(3)').show();
              	  }
        	  else{
                  that.fontF[i]="Arial";
        	  }
        	  if(typeof(this.myArray[i][9]) != "undefined"){
                  that.fontRotate[i] = this.myArray[i][9];
        	  }
        	  else{
                  that.fontRotate[i] = 0;
        	  }
        	  this.colorText[i]="#"+this.myArray[i][0];
        	  var italic_tmp = this.myArray[i][8]?this.myArray[i][8]:"normal";
        	       if(this.myArray[i][1] =="normal" && italic_tmp != "normal"){
                       that.fontStyle[i]=italic_tmp+" "+font_num+"px "+that.fontF[i];
        	       }
        	       else if(this.myArray[i][1] =="normal" && italic_tmp == "normal"){
                       that.fontStyle[i]=italic_tmp+" "+font_num+"px "+that.fontF[i];
        	       }
        	       else if(this.myArray[i][1] !="normal" && italic_tmp == "normal"){
                       that.fontStyle[i]=this.myArray[i][1]+" "+font_num+"px "+that.fontF[i];
        	             }
        	       else if(this.myArray[i][1] !="normal" && italic_tmp != "normal"){
                       that.fontStyle[i]=this.myArray[i][1]+" "+italic_tmp+" "+font_num+"px "+that.fontF[i];
        	             }
        	  that.leftT[i]=this.myArray[i][4];
        	  that.topT[i]=this.myArray[i][5];
        	  that.alignT[i] = this.myArray[i][7];
              var t_rotate = that.fontRotate[i];
        	  var t_tmp = parseInt(that.topT[i])-+parseInt(that.fontN[i])*0.1;
              var li_top = parseInt(that.topT[i])-parseInt(that.fontN[i])*0.1;
              var li_height = parseInt(that.fontN[i])+parseInt(that.fontN[i])*0.5;
              /* S 增加文字行宽限制 */
              if(typeof(this.myArray[i][10])!='undefined'){
                  that.textWidth = this.myArray[i][10];
              }
              /* E 增加文字行宽限制 */
              /* @fixme */
              if(t_rotate==888){t_rotate = 0;}

        	  }
        }
    },
    picParamAnalyse:function(picParam){
//        这段要改成确定图片位置:#商品图#&0&0&300&300|#logo#&0&150&150&150
        //console.log('修改成找到相应的图片参数、坐标、大小',picParam);//"#背景图#&0&0&300&300", "http://localhost:63342/..._logo_01.jpg&0&0&300&35", "#商品图#&0&0&300&300", "#logo#&150&60&150&150"
        var that = this;
        $(picParam).each(function(_index,_k){
            var tt = _k.split('&');
            if(tt[0].indexOf('http://')>-1){
                var tPic=new Image();
                tPic.src=tt[0];
                that.netPic.push(tPic);
                that.picIndex.push(-1);
            }
            else{
                $(baseObj.picArray).each(function(_indexx,_kk){
                    if(tt[0].indexOf(_kk[0]) == 0){
                        that.picIndex.push(_indexx);
                    }
                })
            }
            that.picLeft.push(tt[1]);
            that.picTop.push(tt[2]);
            that.picWidth.push(tt[3]);
            that.picHeight.push(tt[4]);
        })
    },
    colorParamAnalyse:function(colorParam){
        for(var i=0;i<colorParam.length;i++){
        	var tmp_color = colorParam[i].split("&");
        	var tmp ={};
        	tmp.alpha = tmp_color[0];
        	tmp.color = tmp_color[1];
        	tmp.color_x = tmp_color[2];
        	tmp.color_y= tmp_color[3];
        	tmp.color_w = tmp_color[4];
        	tmp.color_h = tmp_color[5];
            if(typeof(tmp_color[6]) !='undefined'){
                tmp.color_d = tmp_color[6];
            }
            else{
                tmp.color_d = 0;
            }
        	this.colorArray.push(tmp);
        }

    },
    bgDraw:function(){
        //插入图片:单元模式，非单元模式区分
        	 if(this.unit_flag != 1){
        	 this.cxtDom.drawImage($("#bgName")[0],0,0);
        	 }
        	 else{

        	 }
    },
    colorDraw:function(){
        for(var i=0;i<this.colorArray.length;i++){
        	var tmp_color = rgb2num(this.colorArray[i].color);
            if(this.colorArray[i].color_d != 0){
                this.cxtDom.fillStyle = "#"+this.colorArray[i].color;
                this.cxtDom.roundRect(this.colorArray[i].color_x,this.colorArray[i].color_y,this.colorArray[i].color_w,this.colorArray[i].color_h,this.colorArray[i].color_d).fill();
            }
            else{
                this.cxtDom.beginPath();
                this.cxtDom.fillStyle = tmp_color.split(")")[0]+","+this.colorArray[i].alpha+")";
                this.cxtDom.fillRect(this.colorArray[i].color_x,this.colorArray[i].color_y,this.colorArray[i].color_w,this.colorArray[i].color_h);
                this.cxtDom.closePath();
                this.cxtDom.save();
            }


        	}
    },
    picDraw:function(){
        //图片套餐
        for(var i=0; i<this.picNumb.length; i++){
            picA[i]=this.cxtDom;
            var that = this;
//            画本地上传图片
            if(this.picNumb[i].indexOf('http://')<0){
//                画哪张图需要重新判断
                var t_img_id = "#input_img_"+that.picIndex[i];
                       var t_img = $(t_img_id);
                that.ratioDraw(t_img[0],t_img[0].width,t_img[0].height,that.picWidth[i],that.picHeight[i],that.picLeft[i],that.picTop[i],picA[i]);
            }
            else if(this.picNumb[i].indexOf('http://') > -1) {
                $(that.netPic).each(function(_index,_k){
                    if(that.picNumb[i].split('&')[0] == $(_k).attr('src')){
                        picA[i].drawImage(_k,that.picLeft[i],that.picTop[i],that.picWidth[i],that.picHeight[i]);
                    }

                })

            }

        }
    },
    textDraw:function(){
        var canvas_c = this.cxtDom;
        var that = this;
        for(var i=0; i<this.paraNumb.length; i++){

            var heightFina=parseInt(that.topT[i])+parseInt(that.fontN[i])*0.8;

            canvas_c.fillStyle = that.colorText[i];
            canvas_c.textAlign = that.alignT[i];
            canvas_c.font = that.fontStyle[i];

            canvas_c.textBaseline = "alphabetic";
            if(that.fontRotate[i] != 0 && that.fontRotate[i] != 888){
                canvas_c.save();
                canvas_c.translate(that.leftT[i],heightFina);
                canvas_c.rotate(that.fontRotate[i]*Math.PI/180);

                // leftT[i] = leftT[i]+3;
                //heightFina = heightFina-4;
                canvas_c.fillText(hdText[i], 0, 0);
//                    174,428
                canvas_c.restore();
            }
            /* 临时增加下划线 */
            else if (that.fontRotate[i] == 888) {
                //cxt_l.fillRect(100,100,100,100);
                cxt_l.fillRect(that.leftT[i], heightFina - parseInt(that.fontN[i]) * 0.35, canvas_c.measureText(hdText[i]).width, 1);
                canvas_c.save();
                canvas_c.rotate(Math.Pi * 0);
                canvas_c.fillText(hdText[i], that.leftT[i], heightFina);
            }
            else if(that.textWidth>0){
                var tArray  = []; /* 存储文字一个个字 */
                var tempWidth = 0; /* 每画一个字算宽度 */
                var tempTop = heightFina; /* 文字输出高度，如果换行，值+已经画文字的高度 */
                for(var j = 0;j<hdText[i].length;j++){
                    tArray.push(hdText[i].substr(j,1));
                }
                $(tArray).each(function(_index,_k){
                    tempWidth+= canvas_c.measureText(_k).width;
                    if(tempWidth>that.textWidth){
                        /* 换行 */
                        tempTop += parseInt(that.fontN[i]);
                        tempWidth = canvas_c.measureText(_k).width;
                    }
                    /* 当前行写字 */
                    else{

                    }
                    var drawLeft = parseInt(that.leftT[i]) + parseInt(tempWidth) - parseInt(canvas_c.measureText(_k).width);
                    canvas_c.save();
                    canvas_c.rotate(Math.Pi * 0);
                    canvas_c.fillText(_k,drawLeft,tempTop);
                })
            }
            else{
                canvas_c.save();
                canvas_c.rotate(Math.Pi*0);
                canvas_c.fillText(hdText[i], that.leftT[i], heightFina);
            }
        }
    },
    preview:function(){
        /* @fixme 生成预览图 */
        if (strType == "PNG" || strType == "png")
            document.getElementById("outPutBox").innerHTML='<img src="'+this.canvasDom.toDataURL("image/png")+'"/>';
        else if (strType == "BMP" || strType == "bmp")
            document.getElementById("outPutBox").innerHTML='<img src="'+this.canvasDom.toDataURL("image/bmp")+'"/>';
        else if (strType == "JPEG" || strType == "jpeg")
            document.getElementById("outPutBox").innerHTML='<img src="'+this.canvasDom.toDataURL("image/jpeg")+'"/>';
        else{
            document.getElementById("outPutBox").innerHTML='<img src="'+this.canvasDom.toDataURL("image/jpeg")+'"/>';
        }
    },
    ratioDraw:function(_img,_imgWidth,_imgHeight,_descWidth,_descHeight,_descLeft,_descTop,_cxtDom){
        var midCanvasDom = document.getElementById("midCanvas");
        var midCxt = midCanvasDom.getContext("2d");
        var oriRatio = _imgWidth/_imgHeight;//原始图片比例
        var descRatio = _descWidth/_descHeight;//新区域比例
        var midWidth,midHeight;
        if(descRatio/oriRatio > 1 ){
            //如果不处理，图片会变扁，解决方案：按宽同比例计算，然后取中间高画
            midWidth = _descWidth;
            midHeight = midWidth/oriRatio;
            midCanvasDom.width = midWidth;
            midCanvasDom.height = midHeight;
            midCxt.drawImage(_img,0,0,midWidth,midHeight);
            var tSrcY;
            if(_descHeight/_imgHeight<0.3){
                tSrcY = (midHeight-_descHeight)/2;
            }
            else{
                tSrcY = 0;
            }
            _cxtDom.drawImage(midCanvasDom,0,tSrcY,_descWidth,_descHeight,_descLeft,_descTop,_descWidth,_descHeight);
        }
        else if(descRatio/oriRatio < 0.9){
//        如果不处理，图片会变扁，解决方案：按高同比例计算，去中间高度画
        midHeight = _descHeight;
        midWidth = midHeight*oriRatio;
        midCanvasDom.width = midWidth;
        midCanvasDom.height = midHeight;
        midCxt.drawImage(_img,0,0,midWidth,midHeight);

        var tSrcX;
        if(_descWidth/_imgWidth>0.6){
            tSrcX = (midWidth-_descWidth);
        }
        else{
            tSrcX = 0;
        }
        _cxtDom.drawImage(midCanvasDom,tSrcX,0,_descWidth,_descHeight,_descLeft,_descTop,_descWidth,_descHeight);
            //_cxtDom.drawImage(_img,_descLeft,_descTop,_descWidth,_descHeight);

        }
        else{
//        容许范围内直接压缩拉伸画图

            _cxtDom.drawImage(_img,_descLeft,_descTop,_descWidth,_descHeight);
        }
    },
    wrapTextDraw:function(){

    }
};




function CreateBaseInfo(_baseparam){
    this.baseinfo = _baseparam;
    this.init();
}

CreateBaseInfo.prototype = {
    baseParam:'',/* 存储基本参数 */
    baseParamPic:[],/* 存储基本图片数组：商品图、背景图、logo等 */
    baseParamText:[],/* 存储文案信息，可能有多个 */
    baseParamBg:'',/* 存储背景色，默认： 1&ffffff&0&0&0&0*/
    picArray:[], /* 存储图片尺寸 */
    localPicArray:[],/* 存储本地上传的图片 */
    init:function(){
        var tArray = this.baseinfo.split('#?');/* baseArray = '#商品图#&300&300|#背景图#&300&300|#logo#&150&150#?#文案1|文案2#?1&ffffff&0&0&0&0'; */
        if(tArray.length>2){
            this.baseParamBg = tArray[2];
            this.baseBg();
        }
        this.baseParamPic = tArray[0];
        this.baseParamText = tArray[1];
        this.basePic();
        this.baseText();
    },
    basePic:function() {
        var picParam = this.baseParamPic.split('|');
        for (var i = 0; i < picParam.length; i++) {
            imageSrc.push("http");
            this.picArray[i] = picParam[i].split("&");
            if (this.picArray[i][0] == "c0") {
                imgSrc[i] = "http://www.paipai.com/promote/2012/images/jb_0.png";
            }
            else if (this.picArray[i][0] == "c1") {
                imgSrc[i] = "http://www.paipai.com/promote/2012/images/jb_1.png";
            }
            else if (this.picArray[i][0] == "c2") {
                imgSrc[i] = "http://www.paipai.com/promote/2012/images/jb_2.png";
            }
            else if (this.picArray[i][0] == "c3") {
                imgSrc[i] = "http://www.paipai.com/promote/2012/images/jb_3.png";
            }
            else if (this.picArray[i][0] == "c4") {
                imgSrc[i] = "http://www.paipai.com/promote/2012/images/jb_4.png";
            }
            else if (this.picArray[i][0] == "c999") {
                imgSrc[i] = "none";
            }
            else {
                imgSrc[i] = this.picArray[i][0];
                if (imgSrc[i].indexOf("http://") > -1) {
                    var t = new Image();
                    t.onload = function (the_img) {

                        if (t.width == picRule[0] && t.height == picRule[1]) {
                            $("#dropBox").css({'background': 'url(' + t.src + ')'});
                        }
                    }
                    t.src = imgSrc[i];

                }
                else {
                    if (typeof(this.picArray[i][1]) != "undefined") {
                        var tPicW = this.picArray[i][1];
                        var tPicH = this.picArray[i][2];
                        if(this.picArray[i][1] == 0){
                            tPicW = 300;
                        }
                        if(this.picArray[i][2] == 0){
                            tPicH = 300;
                        }
                        var tmp_input_html = '<div style="position:relative;width:' + tPicW + 'px;height:' + tPicH + 'px;" class="input-file-div"><input type="file" size="1" onchange="onUploadImgChange(this)" style="opacity:0;position:absolute;top:0;left:0;width:100%;height:100%;" id="file_' + i + '" /><label class="input-file-tip" for="file_' + i + '">载入'+ this.picArray[i][0] +'图片（尺寸：' + this.picArray[i][1] + '*' + this.picArray[i][2] + '）</label><img id="input_img_' + i + '"></div>';
                        $(tmp_input_html).appendTo('#file_list');
                        this.localPicArray.push(i);
                    }
                }
            }
        }
    },
    baseText:function() {
        var textParam = this.baseParamText.split('|');
        for (var i = 0; i < textParam.length; i++) {
            $('<li class="get-' + i + '"><input placeholder = "这里输入文本内容" type="text" id="input_' + i + '" onchange="hdChange(' + i + ')" value="" class="input-unfocus"></li>').appendTo('#input_list');
            hdText[i] = "在此输入文本";
        }
    },
    baseBg:function(){
//        增加颜色输入框
    },
    canDraw:function(){
//        判断CreateBaseInfo中的信息已经有填充return true；or return false
        var canDrawPic = this.canDrawPic();
        var canDrawText = this.canDrawText();
        if(canDrawPic && canDrawText ){
            return true;
        }
        else{
            return false;
        }
    },
    canDrawPic:function(){
        var inputFileObj = $('#file_list input');
        var tFlag = true;
        $(inputFileObj).each(function(_index,_k){
            if($(_k).val() == '' || $(_k).val() == 'undefined'){
                tFlag = false;
            }
        });
        return tFlag;
    },
    canDrawText:function(){
        var inputTextObj = $('#input_list input');
        var tFlag = true;
        $(inputTextObj).each(function(_index,_k){
            if($(_k).val() == '' || $(_k).val() == 'undefined'){
                tFlag = false;
            }
        });
        return tFlag;
    }
};

/* rgb颜色转换 */
function rgb2num(_c){
	if(_c.length == 3){
		var tmp1 = _c.substr(0,1);
		var tmp2 = _c.substr(1,1);
		var tmp3 = _c.substr(2,1);
		_c = tmp1+tmp1+tmp2+tmp2+tmp3+tmp3;
	}
	_a=parseInt(_c.substr(0,2),16);
	_b=parseInt(_c.substr(2,2),16);
	_d=parseInt(_c.substr(4,2),16);
	_k='rgba('+_a+','+_b+','+_d+')';
	return _k;
}

/*  @fixme */
function hdChange(numb){
	hdText[numb]=$("#input_"+numb).attr("value");
}

var baseObj = new CreateBaseInfo(baseArray);

$(suitArray).each(function (_index, _k) {
    var t_canvas = 'canvas'+_index;
    var t_c = new CreatePicture(_k,t_canvas);
    createPicArray.push(t_c);

    t_c.paramAnalyse();
});


$('#btn_create').click(function test(){
    if(baseObj.canDraw()){
        $(createPicArray).each(function (_index, _k) {
            _k.bgDraw();
            _k.picDraw();
            _k.colorDraw();
            if (font_num) _k.textDraw();
            _k.preview();
        });
        createDownload();
        //testJsCanvasToLocal();
    }
else{
        alert('输入元素不够');
    }
});

function createDownload(){
    var downHtml = '<a id="btn_download" class="btn" onclick="autoSave();">下载合成图</a>';
    $('#dropBox').append(downHtml);
    //testJsCanvasToLocal();
}

//html5拖拽图片 @fixme
window.onload = function() {

};

//html filereader
function onUploadImgChange(sender){
    var t_index = -1;

if($(sender).attr("id") != '' && $(sender).attr("id") != "undefined"){
    t_index = $(sender).attr("id").split("file_")[1];
}
	var userAgent = navigator.userAgent.toLowerCase();
	browser={
			version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
			safari: /webkit/.test( userAgent ),
			opera: /opera/.test( userAgent ),
			msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
			mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
	}


	  if(userAgent.indexOf("firefox")!=-1||userAgent.indexOf("safari")!=-1){
		  //判断为firefox||chrome
		  //sender: localfile input html;sender.value:file path&name
		  var r=new FileReader();
		  var file=sender.files[0];
          if(t_index != -1){

              			  var img = $(sender).parent().find("img");

          }
          else{
              var img = $('#bgName');
              			  if(!img[0]){
              				  //$('#dropBox').html('');
              				 img = $('<img id="bgName" style="position:absolute;top:0;left:0;z-index:-1;"/>').appendTo("#dropBox");
              			  }
          }


		  img.file = file;
		  r.onload=(function(aImg){
				  return function(e){
                      var tIndex = $('.input-file-div').index($(sender).parent());
var tttt = baseObj.localPicArray[tIndex];
					  aImg.attr("src",e.target.result);
					  imageSrc[t_index] =e.target.result;
                      setTimeout(function(){
                          picWidthHeightJudge(aImg.width(),aImg.height(),baseObj.picArray[tttt][1],baseObj.picArray[tttt][2]);
                          //ratioDraw($('#input_img_0')[0],185,293,72,92,0,0,document.getElementById('canvas4').getContext('2d'));
                      },200);
				  };
			  })(img);

		  r.onerror = function(){
			  alert("error");
		  };
		  r.readAsDataURL(file);
	  };
    for(var i=0; i<baseObj.picArray.length; i++){
        imgNumb[i]=new Image();
        if(imgSrc[i].indexOf("http://")>-1){
            imgNumb[i].src=imgSrc[i];
        }
        else imgNumb[i].src = "local";
    }
}

/* 判断用户上传图片大小 */
function picWidthHeightJudge(srcW,srcH,oriW,oriH){

    if(srcW == parseInt(oriW) && srcH == parseInt(srcH) || oriW == 0 || oriH == 0 ){

    }else{
        alert('上传图片不合尺寸，请重新上传，图片尺寸：',oriW,'*',oriH);
    }
}

function autoSave(){
    $('.area-pre-box canvas').each(function(_index,el){
        if(_index == 0){

        }
        else{

            var t_canvas = el;
            var t_context = el.getContext('2d');
            var type = 'jpeg';
            var imgData = t_canvas.toDataURL(type);

            imgData = imgData.replace(_fixType(type),'image/octet-stream');
// 下载后的问题名
            var filename = 'lillian_' + (new Date()).getDay() + _index + '.' + type;
// download
            setTimeout(function(){
                saveFile(imgData,filename);
            },300);
        }
    });
}

/**
 * 获取mimeType
 * @param  {String} type the old mime-type
 * @return the new mime-type
 */
var _fixType = function(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    var r = type.match(/png|jpeg|bmp|gif/)[0];
    return 'image/' + r;
};

var saveFile = function(data, filename){
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;

    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
};

//圆角
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    x = parseInt(x);
    y = parseInt(y);
    w = parseInt(w);
    h = parseInt(h);
    r = parseInt(r);
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y, x+w, y+h, r);
    this.arcTo(x+w, y+h, x, y+h, r);
    this.arcTo(x, y+h, x, y, r);
    this.arcTo(x, y, x+w, y, r);
// this.arcTo(x+r, y);
    this.closePath();
    return this;
};

