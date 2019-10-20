/** 插件的写法 ，，避免全局变量的污染，，方法私有化，避免同名冲图
 *  dom      1 需要dom元素，，作为轮播图的容器
 *  option   2 数组 配置  [
 *                          {
 *                              imgUrl : xxx.png,
 *                              linkSrc : www.baidu.com
 *                            },
 *                          ........
 *                       ] 
   config{
      changeTime  时间
      isClear : true 
   }
*/
function generateCarousel(dom,option,config){
    /**
     *  1 创建 图片
     *  2 创建 角标  小圆点
     */

     var imgDom = document.createElement('div');

     var imgIndexdom = document.createElement('div');
     var currentIndex = 0;
     var timer = null ;
     var timerImg = null;
     // 图片
    function initImg(){
      
        if(config.isClear){
            imgDom.addEventListener('mouseenter',function(){
                // alert()
                clearInterval(timer);
                timer = null;
            },false);
            imgDom.addEventListener('mouseleave',function(){
                autoChange();
            },false);
        }     
        imgDom.style.display = 'flex';
        imgDom.style.width = '100%';
        imgDom.style.height = '100%';
        for(var i = 0; i < option.length; i++){

            var img = document.createElement('img');
            img.src = option[i].imgUrl;
            img.style.width = '100%';
            img.style.height = '100%';
            imgDom.appendChild(img);
        }
        dom.appendChild(imgDom);
        imgDom.children[0].style.marginLeft = 0;
        imgDom.style.overflow = 'hidden';
    }
    // 下标
    function initIndex(){
        imgIndexdom.style.textAlign = 'center'; 
        imgIndexdom.style.position = 'relative';
        imgIndexdom.style.top = '-15%';

        for(var i = 0; i < option.length; i++){
            
            var span = document.createElement('span');
            span.style.width = '12px';
            span.style.height = '12px';
            span.style.backgroundColor = '#8b7f7f';
            span.style.display = 'inline-block';
            span.style.margin = '0 10px';
            span.style.borderRadius = '50%';
            span.style.cursor = 'pointer';

            // 立即执行 + 闭包 解决数组下标超出问题
            (function(index){
                span.addEventListener('click',function(){
                    currentIndex = index;
                    setIndexAndChangeImg();
                },false)
            }(i));
            imgIndexdom.appendChild(span);
        }
        dom.appendChild(imgIndexdom);
    }
    // 下标状态 图片
    function setIndexAndChangeImg(){
        // 下标状态
        for(var i = 0; i < imgIndexdom.children.length; i++){
            if( i === currentIndex){
                imgIndexdom.children[i].style.backgroundColor = 'red';
            }else{
                imgIndexdom.children[i].style.backgroundColor = '#8b7f7f';
            }
        }

        // 图片  优化切换时动画
       
        if(timerImg){
            clearInterval(timerImg);
        }
        var end = -currentIndex * 100;
        var start = parseInt(imgDom.children[0].style.marginLeft);
        var duration = 800;
        var speed = (end - start) /duration;

        
        
        timerImg = setInterval(function(){

            start += 20*speed;
            imgDom.children[0].style.marginLeft = start + '%';
   
            if(Math.abs(start-end)< 1){
              
                clearInterval(timerImg);
                imgDom.children[0].style.marginLeft = end + '%';
            }
        
        },20)

        // imgDom.children[0].style.marginLeft = targetMarginLeft + '%';
    }
    // 自动切换
    function autoChange(){
        setIndexAndChangeImg();
        timer = setInterval(function(){
            if(option.length - 1 - currentIndex == 0){
                currentIndex = 0;
            }else{
                currentIndex++;
               
            }          
            setIndexAndChangeImg();

        },config.changeTime)
    }
    
    initImg();
    initIndex();

    // setIndexAndChangeImg();
    autoChange();
   

}