/*
* 1套10组图片，每张图片需要大量参数
*
* */
/* 图片相关存储解析参数 */
//变量定义
//var imageSrc='';改为数组，允许用户上传2张图片
var imageSrc=[];
var hdText={};
var colorText={};
var fontStyle={};
var leftT={};
var topT={};
var alignT={};
var italicT={};//是否斜体
var fontF={};
var fontRotate={};//文字旋转
var fontN={};
var textA={};
var picA={};
var imgNumb={};
var imgSrc={};
var picLeft={};
var picTop={};
var colorDom = {
	alpha: 0,
	color: "#F00",
	color_x:0,
	color_y:0,
	color_w: 0,
	color_h: 0,
};
var strType="JPEG";
var font_num = 0;//文字对象总数
var unit_flag = 0;//单元模式，默认不开，这个版本应该不用
var unit_local = [];

var test_flag = true;/* 测试模式 */
var suitArray = [];/* 系列图片参数数组，一般为10个 */
if(test_flag){
    suitArray = ['http://localhost:63343/jd/iPic%E8%8D%94%E5%9B%AD%E7%89%88%E9%9C%80%E6%B1%82/photoCombine%20%20%20%E7%BD%91%E8%B4%AD-%E6%8B%8D%E6%8B%8D%E7%BD%91.html?#商品图#&0&0&240&225#?919191&normal&18&wryh&120&238&#good_name#&center&normal&0|ff3535&bold&15&wryh&120&263&#good_price#&normal&normal&0#?240&?295#?1&ffffff&0&225&240&70#?jpg#?none','http://localhost:63343/jd/iPic%E8%8D%94%E5%9B%AD%E7%89%88%E9%9C%80%E6%B1%82/photoCombine%20%20%20%E7%BD%91%E8%B4%AD-%E6%8B%8D%E6%8B%8D%E7%BD%91.html?#商品图#&0&0&240&225#?919191&normal&18&wryh&120&238&#good_name#&center&normal&0|ff3535&bold&15&wryh&120&263&#good_price#&normal&normal&0#?240&?295#?1&ffffff&0&225&240&70#?jpg#?none'];
}
else{
    /* 正常情况获取参数 */
}


function CreatePicture(param,canvasId){
    this.param = param;
    this.canvasId = canvasId;
    this.createCanvas(canvasId);
    this.init(param);
}
CreatePicture.prototype = {
    strHref:'',/* 存储带有http的url地址 */
    picNumb:'',/* 图片数组：strHerf[0].split("|") */
    paraNumb:'',/* 我也不记得是什么了：strHerf[1].split("|") */
    colorNumb:'',/* 色块处理参数：alpha,color,w,h,x,y: strHerf[3].split("|")*/
    unitNumb:'',/* 单元模式 strHerf[5]*/
    unit_flag:0,/* 单元标致 */
    myArray:{},
    picArray:{},
    colorArray:[],
    tempPicArray:[],/* 存储需要用户放入图片的index数组 */
    picRule:[300,300],/* strHerf[2].split("&?") */
    strType:'',/* 文字处理strHerf[4] */
    canvasDom:{},
    cxtDom:{},
    init:function(param)
       {
           $('.pic-wh').html('图片规格:'+this.picRule[0]+'x'+this.picRule[1]);
           this.strHref = param.substring(param.indexOf("?")+1,param.length).split("#?");
           this.paramAnalyse();
           this.bgDraw();
           this.colorDraw();
       },
    createCanvas:function(_cid){
        $('.area-pre-box').append('<canvas id="'+this.canvasId+'" width="240" height="295" class="my-canvas" style=""></canvas>');
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
        for(var i=0; i<this.paraNumb.length; i++){
           this.myArray[i]=this.paraNumb[i].split("&");
          font_num = this.myArray[i][2];
        	fontN[i] =font_num;
          if(font_num != 0){
        	  if(this.myArray[i][3]=="hwcy"){
        		fontF[i]="华文彩云";
        		$('.font-download').show();
        		$('#spe_font li:eq(0)').show();
        	  }
        	  else if(this.myArray[i][3]=="st"){
        		fontF[i]="宋体";
        	  }
        	  else if(this.myArray[i][3]=="wryh"){
        		fontF[i]="微软雅黑";
        		$('.font-download').show();
        		$('#spe_font li:eq(1)').show();
        	  }
        	  else if(this.myArray[i][3]=="ht"){
        		fontF[i]="黑体";
        	  }
        	  else if(this.myArray[i][3]=="hwxk"){
        		fontF[i]="华文行楷";
        		$('.font-download').show();
        		$('#spe_font li:eq(2)').show();
        	  }
        	  else if(this.myArray[i][3]=="ltch"){
        		fontF[i]="方正兰亭粗黑简体";
        		$('.font-download').show();
        		$('#spe_font li:eq(3)').show();
        	  }
              else if(this.myArray[i][3]=="ltch1"){
              		fontF[i]="方正兰亭黑体";
              		$('.font-download').show();
              		$('#spe_font li:eq(3)').show();
              	  }
        	  else{
        		fontF[i]="Arial";
        	  }
        	  if(typeof(this.myArray[i][9]) != "undefined"){
        		  fontRotate[i] = this.myArray[i][9];
        	  }
        	  else{
        		  fontRotate[i] = 0;
        	  }
        	  colorText[i]="#"+this.myArray[i][0];
        	  var italic_tmp = this.myArray[i][8]?this.myArray[i][8]:"normal";
        	       console.log("itatli?",italic_tmp);
        	       if(this.myArray[i][1] =="normal" && italic_tmp != "normal"){
        	           fontStyle[i]=italic_tmp+" "+font_num+"px "+fontF[i];
        	       }
        	       else if(this.myArray[i][1] =="normal" && italic_tmp == "normal"){
        	           fontStyle[i]=italic_tmp+" "+font_num+"px "+fontF[i];
        	       }
        	       else if(this.myArray[i][1] !="normal" && italic_tmp == "normal"){
        	                 fontStyle[i]=this.myArray[i][1]+" "+font_num+"px "+fontF[i];
        	             }
        	       else if(this.myArray[i][1] !="normal" && italic_tmp != "normal"){
        	                 fontStyle[i]=this.myArray[i][1]+" "+italic_tmp+" "+font_num+"px "+fontF[i];
        	             }
        	  leftT[i]=this.myArray[i][4];
        	  topT[i]=this.myArray[i][5];
        	  alignT[i] = this.myArray[i][7];
              var t_rotate = fontRotate[i];
        	  var t_tmp = parseInt(topT[i])-+parseInt(fontN[i])*0.1;
              var li_top = parseInt(topT[i])-parseInt(fontN[i])*0.1;
              var li_height = parseInt(fontN[i])+parseInt(fontN[i])*0.5;
              /* @fixme */
              if(t_rotate==888){t_rotate = 0;}
        		   $('<li class="get-'+i+'" style="left:'+leftT[i]+'px;top:'+li_top+'px;font-family:'+fontF[i]+';font-size:'+fontN[i]+'px;line-height:'+fontN[i]+'px;height:'+li_height+'px;-webkit-transform:rotate('+t_rotate+'deg)"><input placeholder = "这里输入文本内容" type="text" id="input_'+i+'" onchange="hdChange('+i+')" value="" class="input-unfocus" style="left:'+leftT[i]+'px;font-family:'+fontF[i]+';font-size:'+fontN[i]+'px;line-height:'+li_height+'px;height:'+li_height+'px;-webkit-transform:rotate('+t_rotate+'deg)"></li>').appendTo('#input_list');
        		  hdText[i]="在此输入文本";
        	  }
        }
    },
    picParamAnalyse:function(picParam){
        for(var i=0; i<picParam.length; i++){
        imageSrc.push("http");
        	this.picArray[i]=picParam[i].split("&");
        	if(this.picArray[i][0]=="c0"){
                  imgSrc[i]="http://www.paipai.com/promote/2012/images/jb_0.png";
        	}
        	else if(this.picArray[i][0]=="c1"){
        	  imgSrc[i]="http://www.paipai.com/promote/2012/images/jb_1.png";
        	}
        	else if(this.picArray[i][0]=="c2"){
        	  imgSrc[i]="http://www.paipai.com/promote/2012/images/jb_2.png";
        	}
        	else if(this.picArray[i][0]=="c3"){
        	  imgSrc[i]="http://www.paipai.com/promote/2012/images/jb_3.png";
        	}
        	else if(this.picArray[i][0]=="c4"){
        	  imgSrc[i]="http://www.paipai.com/promote/2012/images/jb_4.png";
        	}
        	else if(this.picArray[i][0]=="c999"){
        		imgSrc[i]="none";
        	}
        	else{
        		imgSrc[i]= this.picArray[i][0];
        		if(imgSrc[i].indexOf("http://")>-1){
        		var t= new Image();
        		t.onload = function(the_img){
        			console.log("111", t.src);
        			if(t.width == picRule[0] && t.height == picRule[1]){
        				$("#dropBox").css({'background':'url('+t.src+')'});
        			}
        		}
        		t.src = imgSrc[i];
        		console.log("222",t.src);
        		}
                else{
                        if(typeof(this.picArray[i][3])!="undefined"){
                            var tmp_input_html = '<div style="position:absolute;top:'+this.picArray[i][2]+'px;left:'+this.picArray[i][1]+'px;width:'+this.picArray[i][3]+'px;height:'+this.picArray[i][4]+'px;" class="input-file-div"><input type="file" size="1" onchange="onUploadImgChange(this)" style="opacity:0;position:absolute;top:0;left:0;width:100%;height:100%;" id="file_'+i+'" /><label class="input-file-tip" for="file_'+i+'">载入图片（尺寸：'+this.picArray[i][3]+'*'+this.picArray[i][4]+'）</label><img id="input_img_'+i+'"></div>';
                            $(tmp_input_html).appendTo('#file_list');
                            this.tempPicArray.push(i);
                        }
                    }
        	}

        	picLeft[i] = this.picArray[i][1];
        	picTop[i] = this.picArray[i][2];
        }
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
        	//console.log("colorArray",tmp );
        	this.colorArray.push(tmp);
        }
        console.log("colorArray",this.colorArray);
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
        		this.cxtDom.fillStyle = tmp_color.split(")")[0]+","+this.colorArray[i].alpha+")";
            this.cxtDom.fillRect(this.colorArray[i].color_x,this.colorArray[i].color_y,this.colorArray[i].color_w,this.colorArray[i].color_h);
        	}
    }
}

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


$('#btn_create').click(function test(){
    $(suitArray).each(function (_index, _k) {
        var t_canvas = 'canvas'+_index;
        var t_c = new CreatePicture(_k,t_canvas);
        /* @fixme 生成预览图 */
        if (strType == "PNG"|strType == "png")
        		document.getElementById("outPutBox").innerHTML='<img src="'+c.toDataURL("image/png")+'"/>';
        	else if (strType == "BMP"|strType == "bmp")
        		document.getElementById("outPutBox").innerHTML='<img src="'+c.toDataURL("image/bmp")+'"/>';
        	else if (strType == "JPEG"|strType == "jpeg")
        		document.getElementById("outPutBox").innerHTML='<img src="'+c.toDataURL("image/jpeg")+'"/>';
        	else{
        		document.getElementById("outPutBox").innerHTML='<img src="'+c.toDataURL("image/jpeg")+'"/>';
        	}
    })
    testJsCanvasToLocal();
});


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
              			  console.log("11");
              			  var img = $(sender).parent().find("img");
              			  console.log("11",img,sender);
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
var tttt = this.tempPicArray[tIndex];
					  aImg.attr("src",e.target.result);
					  imageSrc[t_index] =e.target.result;
                      setTimeout(function(){
                          picWidthHeightJudge(aImg.width(),aImg.height(),picArray[tttt][3],picArray[tttt][4]);
                      },200);
				  };
			  })(img);

		  r.onerror = function(){
			  alert("error");
		  };
		  r.readAsDataURL(file);
	  }
}

/* 判断用户上传图片大小 */
function picWidthHeightJudge(srcW,srcH,oriW,oriH){
    console.log(srcW,srcH,oriW,oriH);
    if(srcW == parseInt(oriW) && srcH == parseInt(srcH)){

    }else{
        alert('上传图片不合尺寸，请重新上传，图片尺寸：',oriW,'*',oriH);
    }
}

/* @fixme: how to save */
function testJsCanvasToLocal(){
    var c=document.getElementById("myCanvas");
    var t_img = c.getContext('2d').getImageData(0,0, c.width, c.height);
    $('.area-pre-box').append('<canvas id="myCanvas1" width="240" height="295" class="my-canvas" style=""></canvas><canvas id="myCanvas2" width="240" height="295" class="my-canvas" style=""></canvas>');
    document.getElementById('myCanvas1').getContext('2d').putImageData(t_img,0,0);
    document.getElementById('myCanvas2').getContext('2d').putImageData(t_img,0,0);
    autoSave();
}

function autoSave(){
    $('.area-pre-box canvas').each(function(_index,el){
        var t_canvas = el;
        var t_context = el.getContext('2d');
        var type = 'jpeg';
        var imgData = t_canvas.toDataURL(type);
        console.log(el.getContext('2d'));
        imgData = imgData.replace(_fixType(type),'image/octet-stream');
// 下载后的问题名
var filename = 'lillian_' + (new Date()).getDay() + _index + '.' + type;
// download
saveFile(imgData,filename);
    });
}
