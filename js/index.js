(function(){
  var curIndex  = 0,
      actIndex  = 0 ,
      imgRoller = document.getElementsByClassName('indexroller-imglist')[0],
      imgArr    = imgRoller.getElementsByTagName('li'),
      imgLen    = imgArr.length,
      imgBtnGro = document.getElementsByClassName('indexroller-btngroup')[0],
      imgBtnArr = imgBtnGro.getElementsByTagName('li'),
      imgBtnLen = imgBtnArr.length,
      rolBox    = document.getElementsByClassName('indexroller')[0];
      sucList   = document.getElementsByClassName('successful-list-item'),
      menuBtn   = document.getElementsByClassName('menu-icon')[0];
//修改imglist的高度
  // cgImgListHeight(imgArr);
  // window.addEventListener("resize", function () {
  //   cgImgListHeight(imgArr);
  // }, false);
  // function cgImgListHeight(eArr){
  //   imgRoller.style.height = eArr[0].offsetHeight+'px';
  // }
//menu菜单按钮点击事件
  menuBtn.onclick = function(){
    var pubmNav = document.getElementsByClassName('publictop-menunav')[0];
    console.log(pubmNav);
    if(pubmNav.style.display == 'none'||pubmNav.style.display == ''){
      pubmNav.style.display = 'block';
    }else{
      pubmNav.style.display = 'none';
    }
  }
//为每个sucList绑定鼠标事件
  for(var i=0;i<sucList.length;i++){
    sucList[i].onmouseenter = function(){
      addClass(this,'select');
    }
    sucList[i].onmouseleave =function(){
      removeClass(this,'select');
    }
  }
//定时器autoChange
  for(var i=0;i<imgBtnLen;i++){
    imgBtnArr[i].onclick = function(){
      // window.clearInterval(autoChange);
      for(var j=0;j<imgBtnLen;j++){
        removeClass(imgBtnArr[j],'active');
      }
      addClass(this,'active');
      for(var j=0;j<imgBtnLen;j++){
        if(hasClass(imgBtnArr[j],'active')){
          if(curIndex == j){
            return;
          }else{
            curIndex = j;
            actIndex = j;
          }
        }
      }
      changeTo(curIndex,10,10);
      // autoChange = setInterval(function(){
      //   if(curIndex<imgLen-1){
      //     curIndex++;
      //   }else{
      //     curIndex = 0;
      //   }
      //   changeTo(curIndex,20,50);
      // },5000);
    }
  }
  var autoChange = setInterval(function(){
    if(curIndex<imgLen-1){
      curIndex++;
    }else{
      curIndex = 0;
    }
    changeTo(curIndex,20,50);
  },5000);
//鼠标移入停止定时器autoChange
  rolBox.onmouseenter = function(){
    window.clearInterval(autoChange);
  }
//鼠标离开重新开启定时器autoChange
  rolBox.onmouseleave = function(){
    autoChange = setInterval(function(){
      if(curIndex<imgLen-1){
        curIndex++;
      }else{
        curIndex = 0;
      }
      changeTo(curIndex,20,50);
    },5000);
  }

  function changeTo(num,outSpeed,inSpeed){
    for(var i=0;i<imgLen;i++){
      if(hasClass(imgArr[i],'active')){
        actIndex = i;
      }
    }
    fadeOut(imgArr[actIndex],outSpeed);
    removeClass(imgArr[actIndex],'active');
    removeClass(imgBtnArr[actIndex],'active');
    fadeIn(imgArr[num],inSpeed);
    addClass(imgArr[num],'active');
    addClass(imgBtnArr[num],'active');
  }

  var quickSort = function(arr){
    if(arr.length<=1){
      return arr;
    }
    var midIndex = arr.length/2;
    var midVal = arr.splice(midIndex,1);
    var left = [];
    var right = [];
    for(var i=0;i<arr.length;i++){
      if(arr[i]<midVal){
        left.push(arr[i]);
      }else{
        right.push(arr[i]);
      }
    }
    return quickSort(left).concat(midVal,quickSort(right));
  }

  var a = [1,5,2,4,3,9,8,4,3,1,6,1111,'a','b','c','abc','啊','从'];
  console.log(quickSort(a));
})();

function hasClass(elem, cls) {
  var cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}
function addClass(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
  }
}
function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ');
    }
    ele.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}

//透明度初始化
function setOpacity(ev, v){
//  ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;
  ev.style.filter ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;
}
// 淡入效果
function fadeIn(elem, speed, opacity){
  /*
   * 参数说明
   * elem==>需要淡入的元素
   * speed==>淡入速度,正整数(可选)
   * opacity==>淡入到指定的透明度,0~100(可选)
   */
  speed = speed || 20;
  opacity = opacity || 100;
  //显示元素,并将元素值为0透明度(不可见)
  elem.style.display = 'block';
  setOpacity(elem, 10);
  //初始化透明度变化值为0
  var val = 0;
  //循环将透明值以15递增,即淡入效果
  (function(){
      setOpacity(elem, val);
      val += 15;
      if (val <= opacity+500) {
          setTimeout(arguments.callee, speed);
      }else{
          return;
      }
  })();
}
//淡出效果
function fadeOut(elem, speed, opacity){
  /*
   * 参数说明
   * elem==>需要淡入的元素
   * speed==>淡入速度,正整数(可选)
   * opacity==>淡入到指定的透明度,0~100(可选)
   */
  speed = speed || 20;
  opacity = opacity || 0;
  //初始化透明度变化值为0
  var val = 150;
  //循环将透明值以5递减,即淡出效果
  (function(){
      setOpacity(elem, val);
      val -= 5;
      if (val >= opacity) {
          setTimeout(arguments.callee, speed);
      }else if (val <= 0) {
          //元素透明度为0后隐藏元素
          elem.style.display = 'none';
      }
  })();
}
