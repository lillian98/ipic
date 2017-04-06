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
var picDrawType = [];//用户上传图画的方式。1：上传图宽比例压缩；2：上传图高比例压缩；3：同2，比原图宽、矮；4：比原图高、窄；5：宽度均小于原图
var c_l=document.getElementById("myCanvas");
var cxt_l=c_l.getContext("2d");
var font_num = 0;//文字对象总数
var unit_flag = 0;//单元模式，默认不开
var unit_local = [];
var tmpCanvasCvs = document.getElementById("tmpCanvas");
var tmpCtx = tmpCanvasCvs.getContext('2d');
var inputHaveCt = [];
var imgHaveCt = [];

//获取url
var str=window.location.href;
//str = 'http://localhost:63343/jd/iPic%E8%8D%94%E5%9B%AD%E7%89%88%E9%9C%80%E6%B1%82/photoCombine%20%20%20%E7%BD%91%E8%B4%AD-%E6%8B%8D%E6%8B%8D%E7%BD%91.html?#商品图#&0&0&240&225#?919191&normal&18&wryh&120&238&#good_name#&center&normal&0|ff3535&bold&15&wryh&120&263&#good_price#&normal&normal&0#?240&?295#?1&ffffff&0&225&240&70#?jpg#?none';/* 演示用 */
//str = 'http://127.0.0.1/ipic/ipic_old.html?bg1488877410.jpg&0&0&240&175|btn11488877410.png&15&119&75&36|#pic1#&121&65&110&110|icon11488877410.png&0&159&44&16|icon21488877410.png&206&0&34&38#?FFFFFF&normal&28&MicrosoftYaHei-Bold&15.12&38.42&#text1#&left&normal&6|FFFFFF&normal&20&MicrosoftYaHei&15.12&85.42&#text3#&left&normal&5|FFFFFF&normal&20&MicrosoftYaHei&15.12&62.42&#text2#&left&normal&6#?240&?175#?1&ffffff&0&0&0&70#?jpg#?none';
var strHerf = str.substring(str.indexOf("?")+1,str.length).split("#?");
console.log("strHerf",strHerf);
var picNumb = strHerf[0].split("|");
var paraNumb = strHerf[1].split("|");
//var colorNumb = strHerf[3].split("|");//色块处理alpha,color,w,h,x,y
var picSecrecyWord = strHerf[3];
var unitNumb = strHerf[5];
(unitNumb == "none" || unitNumb == "#none#") && (unit_flag = 1);
(unit_flag == 1) && ($(".area-pic-info").hide());
var myArray = {};
var picArray = {};
var colorArray = new Array();
var tempPicArray = [];/* 存储需要用户放入图片的index数组 */

var picRule = strHerf[2].split("&?");

document.getElementById("myCanvas").width= picRule[0];
document.getElementById("myCanvas").height= picRule[1];
document.getElementById("areaSrc").style.width= picRule[0]+"px";
document.getElementById("dropBox").style.width= picRule[0]+"px";
document.getElementById("dropBox").style.height= picRule[1]+"px";
document.getElementById("outPutImgWrap").style.width= picRule[0]+"px";
document.getElementById("outPutBox").style.width =  picRule[0]+"px";
//document.getElementById("outPutImgWrap").style.height= picRule[1]+"px";


//图片规格
$('.pic-wh').html('图片规格:'+picRule[0]+'x'+picRule[1]);

strType = strHerf[4];

for(var i=0; i<paraNumb.length; i++){
   myArray[i]=paraNumb[i].split("&");
  font_num = myArray[i][2];
	fontN[i] =font_num;
  if(font_num != 0){
	  if(myArray[i][3]=="hwcy"){
		fontF[i]="华文彩云";
		$('.font-download').show();
		$('#spe_font li:eq(0)').show();
	  }
	  else if(myArray[i][3]=="st"){
		fontF[i]="宋体";
	  }
	  else if(myArray[i][3]=="wryh" || myArray[i][3].indexOf('MicrosoftYaHei') > -1){
		fontF[i]="微软雅黑";
	  }
	  else if(myArray[i][3]=="ht"){
		fontF[i]="黑体";
	  }
	  else if(myArray[i][3]=="hwxk"){
		fontF[i]="华文行楷";
	  }
	  else if(myArray[i][3]=="ltch"){
		fontF[i]="方正兰亭粗黑简体";
	  }
      else if(myArray[i][3]=="ltch1"){
      		fontF[i]="方正兰亭黑体";
      	  }
	  else if(myArray[i][3] != ''){
		  fontF[i] = myArray[i][3];
	  }
	  else{
		fontF[i]="Arial";
	  }
	  if(typeof(myArray[i][9]) != "undefined"){
		  fontRotate[i] = myArray[i][9];
	  }
	  else{
		  fontRotate[i] = 0;
	  }
	  colorText[i]="#"+myArray[i][0];
	  if(myArray[i][3].indexOf('bold') > -1 || myArray[i][3].indexOf('Bold') > -1){
		  myArray[i][1] = 'bold';
	  }
	  var italic_tmp = myArray[i][8]?myArray[i][8]:"normal";
	       console.log("itatli?",italic_tmp);
	       if(myArray[i][1] =="normal" && italic_tmp != "normal"){
	           fontStyle[i]=italic_tmp+" "+font_num+"px "+fontF[i];
	       }
	       else if(myArray[i][1] =="normal" && italic_tmp == "normal"){
	           fontStyle[i]=italic_tmp+" "+font_num+"px "+fontF[i];
	       }
	       else if(myArray[i][1] !="normal" && italic_tmp == "normal"){
	                 fontStyle[i]=myArray[i][1]+" "+font_num+"px "+fontF[i];
	             }
	       else if(myArray[i][1] !="normal" && italic_tmp != "normal"){
	                 fontStyle[i]=myArray[i][1]+" "+italic_tmp+" "+font_num+"px "+fontF[i];
	             }
	  leftT[i]=myArray[i][4];
	  topT[i]=myArray[i][5];
	  alignT[i] = myArray[i][7];
      //var t_rotate = fontRotate[i];
	  var t_fontCount = fontRotate[i];
	  var t_tmp = parseInt(topT[i])-+parseInt(fontN[i])*0.1;
      var li_top = parseInt(topT[i])-parseInt(fontN[i])*0.1;
      var li_height = parseInt(fontN[i]);//+parseInt(fontN[i])*0.5;
	  var tWidth = t_fontCount*fontN[i] ;//+ 10;
      //if(t_rotate==888){t_rotate = 0;}
		   $('<li class="get-'+i+'" style="left:'+leftT[i]+'px;top:'+li_top+'px;font-family:'+fontF[i]+';font-size:'+fontN[i]+'px;line-height:'+fontN[i]+'px;height:'+li_height+'px;width:' + tWidth + 'px;)"><input placeholder = "请输入文案" type="text" id="input_'+i+'" onchange="hdChange('+i+')" value="" maxlength= ' + t_fontCount + ' class="input-unfocus" style="left:'+leftT[i]+'px;font-family:'+fontF[i]+';font-size:'+fontN[i]+'px;line-height:'+li_height+'px;height:'+li_height+'px;width:' + t_fontCount*fontN[i] + 'px;"></li>').appendTo('#input_list');
		  hdText[i]="在此输入文本";
	  inputHaveCt.push(0);
	  }
}
if(paraNumb.length == 1 && paraNumb[0].split("&")[2] == 0){
	inputHaveCt.push(1);
}

function hdChange(numb){
	hdText[numb]=$("#input_"+numb).attr("value");
}

//图片参数获取
for(var i=0; i<picNumb.length; i++){
imageSrc.push("http");
	picArray[i]=picNumb[i].split("&");
	if(picArray[i][0]=="c0"){
          imgSrc[i]="http://www.paipai.com/promote/2012/images/jb_0.png";
	}
	else if(picArray[i][0]=="c1"){
	  imgSrc[i]="http://www.paipai.com/promote/2012/images/jb_1.png";
	}
	else if(picArray[i][0]=="c2"){
	  imgSrc[i]="http://www.paipai.com/promote/2012/images/jb_2.png";
	}
	else if(picArray[i][0]=="c3"){
	  imgSrc[i]="http://www.paipai.com/promote/2012/images/jb_3.png";
	}
	else if(picArray[i][0]=="c4"){
	  imgSrc[i]="http://www.paipai.com/promote/2012/images/jb_4.png";
	}
	else if(picArray[i][0]=="c999"){
		imgSrc[i]="none";
	}
	else{
		imgSrc[i]= picArray[i][0];
		if (imgSrc[i].indexOf("bg") > -1) {
		var t = new Image();

		t.onload = function (the_img) {
			console.log("111", t.src);
			if (t.width == picRule[0] && t.height == picRule[1]) {
				//$("#dropBox").css({'background': 'url(' + t.src + ')'});
			}
		}
			t.src = 'http://om6om7its.bkt.clouddn.com/' + imgSrc[i];
			console.log("222", t.src);
	}
	else {
		if (typeof(picArray[i][3]) != "undefined" && imgSrc[i].indexOf("#") > -1) {
			//            var tmp_position = picArray[i][3]+'&'+picArray[i][4];
			//            unit_local.push(tmp_position);
			var tWidth = parseInt(picArray[i][3]/305 * 82 );
			var tUpdateTextWidth = parseInt(picArray[i][4]/255 * 133 ) > 133 ? 133 : parseInt(picArray[i][4]/255 * 133 );
			var tUpdateTextHeight = parseInt(picArray[i][4]/255 * 46 ) > 46 ? 46 : parseInt(picArray[i][4]/255 * 46 );
			var tFontSize = tUpdateTextHeight * 0.5 < 12 ? 12 : parseInt(tUpdateTextHeight * 0.5 );
			var tmp_input_html = '<div style="position:absolute;top:' + picArray[i][2] + 'px;left:' + picArray[i][1] + 'px;width:' + picArray[i][3] + 'px;height:' + picArray[i][4] + 'px;" class="input-file-div"><input type="file" size="1" onchange="onUploadImgChange(this)" style="opacity:0;position:absolute;top:0;left:0;width:100%;height:100%;" id="file_' + i + '" /><label class="input-file-tip" for="file_' + i + '"><span class="input-file-icon" style="width:' + tWidth + 'px;height:' + tWidth +'px;"></span>商品图片<br>（' + picArray[i][3] + '*' + picArray[i][4] + '）</label><label class="input-file-tip-update" for="file_' + i + '"><span class="input-file-tip-update-text" style="height:' + tUpdateTextHeight + 'px;width:' + tUpdateTextWidth + 'px;line-height:' + tUpdateTextHeight + 'px;font-size:' + tFontSize + 'px;">替换图片</span></label><img id="input_img_' + i + '" data-width = ' + picArray[i][3] + ' data-height=' + picArray[i][4] + '></div>';
			$(tmp_input_html).appendTo('#file_list');
			tempPicArray.push(i);
			imgHaveCt.push(0);
			picDrawType.push(0);
		}
	}
}

	picLeft[i] = picArray[i][1];
	picTop[i] = picArray[i][2];
}

//色块获取
/*for(var i=0;i<colorNumb.length;i++){
	var tmp_color = colorNumb[i].split("&");
	//var tmp = {};
	var tmp ={};
	tmp.alpha = tmp_color[0];
	tmp.color = tmp_color[1];
	tmp.color_x = tmp_color[2];
	tmp.color_y= tmp_color[3];
	tmp.color_w = tmp_color[4];
	tmp.color_h = tmp_color[5];
	console.log("colorArray",tmp );
	colorArray.push(tmp);
}
console.log("colorArray",colorArray);*/

//html5拖拽图片
window.onload = function() {
	var oDropBox = document.getElementById('dropBox'),
		oImgInfo = document.getElementById('imgInfo');
/*禁用图片拖拽*/
	/*oDropBox.addEventListener('dragover', function(e) {
		e.stopPropagation();
		e.preventDefault();
	}, false);

	oDropBox.addEventListener('drop', handleDrop, false);*/

	function handleDrop(e) {
		e.stopPropagation();
		e.preventDefault();

		var fileList  = e.dataTransfer.files,
			fileType = fileList[0].type,
            oImg = document.createElement('img'),
        reader = new FileReader();

		if (fileType.indexOf('image') == -1) {
			//alert('请拖拽图片~');
			msgTips(['请拖拽图片~']);
			return;
		}

		reader.onload = function(e) {
			oImg.src = this.result;
			oImg.id = "bgName"
			//改变src
			imageSrc = oImg.src;
			//oDropBox.innerHTML = '';
			oDropBox.appendChild(oImg);

			oImg.onload=function(){
			var picWSelf = document.getElementById("bgName").offsetWidth;
			var picHSelf = document.getElementById("bgName").offsetHeight;
			//自适应图片大小
			/*document.getElementById("myCanvas").width= picW;
			document.getElementById("myCanvas").height= picH;
			document.getElementById("dropBox").style.width= picW+"px";
			document.getElementById("dropBox").style.height= picH+"px";
			document.getElementById("outPutImgWrap").style.width= picW+"px";
			document.getElementById("outPutImgWrap").style.height= picH+"px";	*/

			//图片规格
			  if(picWSelf==picRule[0]&&picHSelf==picRule[1]){
				$('.pic-wh').html('图片规格:'+picRule[0]+'x'+picRule[1]+' <span style="color:#3BB3D2; display:block;margin:5px">尺寸合格</span>');
			  }
			  else{
				$('.pic-wh').html('图片规格:'+picRule[0]+'x'+picRule[1]+' <span style="color:#f00; display:block;margin:5px;">你所上传的图片尺寸为'+picWSelf+'x'+picHSelf+' 尺寸不符合规格</span>');
			  }
			//
			}
		}

		reader.readAsDataURL(fileList[0]);

	};
	for(var i=0; i<picNumb.length; i++){
		imgNumb[i]=new Image();
		imgNumb[i].crossOrigin="Anonymous";
        if(imgSrc[i].indexOf("#") < 0){
		imgNumb[i].src='http://om6om7its.bkt.clouddn.com/' + imgSrc[i];
			/*imgNumb[i].onload = function(){
				tmpCtx.drawImage( this, 0, 0 );
				var dataURL = tmpCanvasCvs.toDataURL();
				this.src = dataURL;
			}*/
        }
        else imgNumb[i].src = "local";
	}

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
			  var labelDom = $(sender).parent().find(".input-file-tip");
			  labelDom.hide();
          }
          else{
              var img = $('#bgName');
              			  if(!img[0]){
              				  //$('#dropBox').html('');
              				 img = $('<img id="bgName" style=""/>').appendTo("#dropBox");
              			  }
          }
		  img.attr('style','');
		  img.file = file;
		  r.onload = (function (aImg) {
			  return function (e) {
				  var tIndex = $('.input-file-div').index($(sender).parent());
				  var tttt = tempPicArray[tIndex];
				  aImg.attr("src", e.target.result);
				  imageSrc[t_index] = e.target.result;
				  $('.input-file-div').eq(tIndex).addClass("input-file-tip-update-show");
				  imgHaveCt[tIndex] = 1;
				  updateBtnStatus();
				  setTimeout(function () {
					  picWidthHeightJudge(aImg, aImg.width(), aImg.height(), picArray[tttt][3], picArray[tttt][4], t_index);
				  }, 200);
			  };
		  })(img);

		  r.onerror = function(){
			  //alert("error");
			  msgTips(['读取文件出错，请重试']);
		  };
		  r.readAsDataURL(file);
	  }
}

/* 判断用户上传图片大小 */
function picWidthHeightJudge(_img,srcW,srcH,oriW,oriH,t_index){
    console.log(srcW,srcH,oriW,oriH);
	var oldW = parseInt(oriW);
	var oldH = parseInt(oriH);
    if(srcW == oldW && srcH == oldH){
		picDrawType[t_index] = 0;
    }
	else if(srcW > oldW && srcH > oldH && srcW/oldW > srcH/oldH){
		//上传图比规范图宽、高且宽的比例大
		picDrawType[t_index] = 1;
		_img.css({'width':oldW,'height':parseInt(oldW/srcW * srcH),'top':srcH - oldH});
		//alert('上传图比规范图宽、高，将会按照比例进行压缩');
		msgTips(['分辨率不符','上传图比规范图宽、高，将会按照比例进行压缩']);
	}
	else if(srcW > oldW && srcH > oldH && srcW/oldW <= srcH/oldH){
		//上传图比规范图宽、高且高的比例大
		picDrawType[t_index] = 2;
		_img.css({'width':parseInt(oldH/srcH * srcW),'height':oldH,'left':parseInt((srcW - oldW)/2)});
		//alert('上传图比规范图宽、高，将会按照比例进行压缩');
		msgTips(['分辨率不符','上传图比规范图宽、高，将会按照比例进行压缩']);
	}
	else if(srcW >= oldW && srcH <= oldH){
		//上传图比规范图宽、矮
		picDrawType[t_index] = 3;
		_img.css({'width':oldW,'height':parseInt(oldW/srcW * srcH),'top':oldH - srcH});
		//alert('上传图比规范图宽、高，将会按照比例进行压缩');
		msgTips(['分辨率不符','上传图比规范图宽、高，将会按照比例进行压缩']);
	}
	else if(srcW < oldW && srcH > oldH){
		//上传图比规范图窄、高
		picDrawType[t_index] = 4;
		_img.css({'width':parseInt(oldH/srcH * srcW),'height':oldH,'left':parseInt((oldW - srcW)/2)});
		//alert('上传图比规范图宽、高，将会按照比例进行压缩');
		msgTips(['分辨率不符','上传图比规范图宽、高，将会按照比例进行压缩']);
	}
	else if(srcW <= oldW && srcH <= oldH){
		//上传图比规范图窄、矮
		picDrawType[t_index] = 5;
		_img.css({'left':parseInt((oldW - srcW)/2),'top':oldH - srcH});
		//alert('上传图比规范图宽、高，将会按照比例进行压缩');
		msgTips(['分辨率不符','上传图比规范图宽、高，将会按照比例进行压缩']);
	}
	else{
		//alert('上传图比规范图宽、高，将会按照比例进行压缩');
		msgTips(['分辨率不符','上传图比规范图宽、高，将会按照比例进行压缩']);
    }
}
$('#btn_create').click(function test(){
	var c=document.getElementById("myCanvas");
	var cxt=c.getContext("2d");
	var canDraw = true;
	 //插入图片:单元模式，非单元模式区分
	 if(unit_flag != 1){
	 cxt.drawImage($("#bgName")[0],0,0);
	 }
	 else{

	 }
	if($('#input_list li input').length > 0){
		$('#input_list li input').each(function(i,k){
			if($(k).val() == ''){
				canDraw = false;
				msgTips(['请输入文案']);
			}
		})
	}
	//colorDraw();//@by lillian画色块
	 //图片套餐
	if(canDraw){
		msgTips(['处理中请不要关闭窗口']);
		for (var i = 0; i < picNumb.length; i++) {
			picA[i] = c.getContext("2d");
			if (imgNumb[i] == "local" || imgNumb[i].src.indexOf("local") > 0) {
				var t_img_id = "#input_img_" + i;
				var t_img = $(t_img_id);
				var tWidth = t_img.width();
				var tHeight = t_img.height();
				var ruleLeft = parseInt(picLeft[i]);
				var ruleTop = parseInt(picTop[i]);
				var ruleWidth = parseInt(t_img.attr('data-width'));
				var ruleHeight = parseInt(t_img.attr('data-height'));
				console.log('upload width',tWidth,';height:',tHeight);
				//1：上传图比规范图宽、高且宽的比例大；2：上传图比规范图宽、高且高的比例大；3：上传图比规范图宽、矮；4：上传图比规范图窄、高；5：上传图比规范图窄、矮
				switch (picDrawType[i]){
					case 0:
						picA[i].drawImage(t_img[0], ruleLeft, ruleTop);
						break;
					case 1:
					case 3:
						tWidth = ruleWidth;
						var newHeight = parseInt(ruleWidth/tWidth * tHeight);
						var tTop = ruleTop + ruleHeight - newHeight ;
						picA[i].drawImage(t_img[0], ruleLeft, tTop, tWidth, newHeight);
						break;
					case 2:
					case 4:
						tHeight = ruleHeight;
						var newWidth = parseInt(ruleHeight/tHeight * tWidth);
						var tLeft = ruleLeft + parseInt(ruleWidth - newWidth)/2 ;
						picA[i].drawImage(t_img[0], tLeft, ruleTop, newWidth, tHeight);
						break;
					case 5:
						var tLeft = ruleLeft + parseInt(ruleWidth - tWidth)/2 ;
						var tTop = ruleTop + ruleHeight - tHeight ;
						picA[i].drawImage(t_img[0], tLeft, tTop, tWidth, tHeight);
						break;
					default :
						break;
				}
			}
			else if (imgNumb[i].src != "http://www.paipai.com/none" && imgNumb[i].src.indexOf("http://") > -1 && imgNumb[i].src != "c999&0&0") {
				picA[i].drawImage(imgNumb[i], picLeft[i], picTop[i]);//跨域

			}

		}

		if (font_num) textDraw();

		//插入文字
		function textDraw(){
			var canvas_c = c.getContext("2d");
			for(var i=0; i<paraNumb.length; i++){
				console.log("hdText["+i+"]="+hdText[i]+alignT[i]);
				var heightFina=parseInt(topT[i])+parseInt(fontN[i])*0.9;

				canvas_c.fillStyle = colorText[i];
				canvas_c.textAlign = alignT[i];
				canvas_c.font = fontStyle[i];
				console.log('1111',fontStyle[i]);
				canvas_c.textBaseline = "alphabetic";
				/*if(fontRotate[i] != 0 && fontRotate[i] != 888){
				 canvas_c.save();
				 canvas_c.translate(leftT[i],heightFina)
				 canvas_c.rotate(fontRotate[i]*Math.PI/180);
				 console.log("left:",leftT[i],"top:",heightFina);
				 // leftT[i] = leftT[i]+3;
				 //heightFina = heightFina-4;
				 canvas_c.fillText(hdText[i], 0, 0);
				 //                    174,428
				 canvas_c.restore();
				 }
				 /!* 临时增加下划线 *!/
				 else if (fontRotate[i] == 888) {
				 //cxt_l.fillRect(100,100,100,100);
				 cxt_l.fillRect(leftT[i], heightFina - parseInt(fontN[i]) * 0.35, canvas_c.measureText(hdText[i]).width, 1);
				 canvas_c.save();
				 canvas_c.rotate(Math.Pi * 0);
				 canvas_c.fillText(hdText[i], leftT[i], heightFina);
				 }*/

				canvas_c.save();
				canvas_c.rotate(Math.Pi*0);
				canvas_c.fillText(hdText[i], leftT[i], heightFina);

			}
		}
		document.getElementById("outPutImgWrap").innerHTML='<img src="'+c.toDataURL("image/jpeg",1.0)+'"/>';
		setTimeout(function(){
			fileSecrecy(c.getContext("2d"),c,'JPEG');
		},100);
	}

});
$('#btn_save').click(function(){
	autoSave();
})
function colorDraw(){
	for(var i=0;i<colorArray.length;i++){
		var tmp_color = rgb2num(colorArray[i].color);
		//var tmp_str = tmp_color.split(")")[0]+","+colorArray[i].alpha+")";
		cxt_l.fillStyle = tmp_color.split(")")[0]+","+colorArray[i].alpha+")";
		//cxt_l.fillRect(100,100,100,100);
		cxt_l.fillRect(colorArray[i].color_x,colorArray[i].color_y,colorArray[i].color_w,colorArray[i].color_h);
	}
}

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

function fileSecrecy(canvas_c,c,strType){
	/*if(writeMsgToCanvas('myCanvas',picSecrecyWord,'jJytT1W19jZ2uHi4',1)!=null){
		var myCanvas = document.getElementById("myCanvas"); //canvasid='canvas'
		var image = myCanvas.toDataURL("image/jpeg",1.0);
		console.log('Secrecy done');
		if (strType == "PNG"|strType == "png")
			document.getElementById("outPutImgWrap").innerHTML='<img src="'+c.toDataURL("image/png")+'"/>';
		else if (strType == "BMP"|strType == "bmp")
			document.getElementById("outPutImgWrap").innerHTML='<img src="'+c.toDataURL("image/bmp")+'"/>';
		else if (strType == "JPEG"|strType == "jpeg")
			document.getElementById("outPutImgWrap").innerHTML='<img src="'+c.toDataURL("image/jpeg",1.0)+'"/>';
		else{
			document.getElementById("outPutImgWrap").innerHTML='<img src="'+c.toDataURL("image/jpeg",1.0)+'"/>';
		}
		$('.tips').hide();
		$('.area-pre-box').show();
	}*///整图频域处理
	/* 仅针对前面50*50像素加密 */
	var smallC = document.getElementById("smallCanvas");
	var cxtSmall = smallC.getContext("2d");
	var imgData= canvas_c.getImageData(0,0,50,50);
	cxtSmall.putImageData(imgData,0,0);
	if(writeMsgToCanvas('smallCanvas',picSecrecyWord,'jJytT1W19jZ2uHi4',3)!=null){
		var myCanvas = document.getElementById("smallCanvas"); //canvasid='canvas'
		var image = myCanvas.toDataURL("image/jpeg",1.0);
		console.log('Secrecy done');
		var tImgData = cxtSmall.getImageData(0,0,50,50);
		canvas_c.putImageData(tImgData,0,0,0,0,50,50);
		if (strType == "PNG"|strType == "png")
			document.getElementById("outPutImgWrap").innerHTML='<img src="'+c.toDataURL("image/png")+'"/>';
		else if (strType == "BMP"|strType == "bmp")
			document.getElementById("outPutImgWrap").innerHTML='<img src="'+c.toDataURL("image/bmp")+'"/>';
		else if (strType == "JPEG"|strType == "jpeg")
			document.getElementById("outPutImgWrap").innerHTML='<img src="'+c.toDataURL("image/jpeg",1.0)+'"/>';
		else{
			document.getElementById("outPutImgWrap").innerHTML='<img src="'+c.toDataURL("image/jpeg",1.0)+'"/>';
		}
		$('.tips').hide();
		$('.area-pic').fadeOut(function(){
			$('.area-pre-box').fadeIn(100);
		})
	}
}

$("#input_list input").click (function(){
	($(this).val() == "请输入文案") && ($(this).val(""));
	$(this).removeClass("input-unfocus");
});

function updateBtnStatus(){
	var canUse = true;
	$(inputHaveCt).each(function(i,k){
		if(k == 0){
			canUse = false;
		}
	})
	$(imgHaveCt).each(function(i,k){
		if( k == 0){
			canUse = false;
		}
	})
	if(canUse){
		$('#btn_create').addClass("can-use");
	}
	else{
		$('#btn_create').removeClass("can-use");
	}
}

$("#input_list input").blur (function(){
	$(this).addClass("input-unfocus");
});
$("#input_list input").change (function(){
    var t = $(this).val();
    if(containSpecial(t)){
        //alert("请不要输入特殊字符");
		msgTips(['请不要输入特殊字符']);
        $(this).val("");
    }
	if($(this).val() != "" && $(this).val() != " "){
		inputHaveCt[$("#input_list input").index($(this))] = 1;
	}
	else{
		inputHaveCt[$("#input_list input").index($(this))] = 0;
	}
	updateBtnStatus();
});
function containSpecial( s ){
    var containSpecial = RegExp(/[(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
    return ( containSpecial.test(s) );
}

function testJsCanvasToLocal(){
    var c=document.getElementById("myCanvas");
    var t_img = c.getContext('2d').getImageData(0,0, c.width, c.height);
    //$('.area-pre-box').append('<canvas id="myCanvas1" width="240" height="295" class="my-canvas" style=""></canvas><canvas id="myCanvas2" width="240" height="295" class="my-canvas" style=""></canvas>');
   // document.getElementById('myCanvas1').getContext('2d').putImageData(t_img,0,0);
    //document.getElementById('myCanvas2').getContext('2d').putImageData(t_img,0,0);
    //autoSave();
}

function autoSave(){
    $('.area-pre-box canvas').each(function(_index,el){
        var t_canvas = el;
        var t_context = el.getContext('2d');
        var type = 'image/jpeg';
        var imgData = t_canvas.toDataURL(type,1.0);
        console.log(el.getContext('2d'));
        imgData = imgData.replace(_fixType(type),'image/octet-stream');
// 下载后的问题名
var filename = 'photocombine_' + (new Date()).getDay() + _index + '.jpg';
// download
saveFile(imgData,filename);
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

$('.tips-btn').bind('click',function(e){
	$('.tips').hide();
})

$('.pre-btn-close').bind('click',function(e){
	$('.area-pre-box').fadeOut(function(){
		$('.area-pic').fadeIn(100);
	});
})

function msgTips(_contentArray){
	var tipsDom = $('.tips-content');
	if (_contentArray.length < 2) {
		tipsDom.html('<div class="tips-ct-18">' + _contentArray[0] + '</div>')
	}
	else {
		var tDom = '';
		for(var i = 0;i<_contentArray.length;i++){
			if(i == 0){
				tDom += '<div class="tips-ct-20">' + _contentArray[0] + '</div>';
			}
			else{
				tDom += '<div class="tips-ct-14">' + _contentArray[i] + '</div>';
			}
		}
		tipsDom.html(tDom);
	}
	$('.tips').show();
}

$(function(){
	updateBtnStatus();
})