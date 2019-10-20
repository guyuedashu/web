/**
 * 
 * @param {*} dom 容器
 * @param {*} arr 图片数组
 * @param {*} width 等宽
 * 
 * 图片会异步加载 ，所以在获取图片的height时，，无法拿到其值，，
 * 
 * 图片加载事件，，再去调用
 */
 function createWaterFall(dom,arr,width){
     var columnSum = 0;//列数
     var space = 0;//间距

    // dom.style.position = 'relative';
    initImgDom();
    cla();
 

    function initImgDom(){
        for(var i = 0; i<arr.length; i++){

            var img = document.createElement('img');
            img.src = arr[i];
            img.style.width = width + 'px';
            img.style.position = 'absolute';

            // 加载完成后，，再去设置position
            img.addEventListener('load',function(){
                setImgPosition();
            },false)

            dom.appendChild(img);

        }
    }

    function setImgPosition(){

       
        // Y 坐标
        var columnY = new Array(columnSum);
        columnY.fill(0);

        for(var i = 0; i<dom.children.length; i++){

            var img = dom.children[i];
            // 最小值 Y 坐标
            var minY = Math.min(...columnY);
            // 第几列
            var index = columnY.indexOf(minY);

            var x = (index + 1) * space + index *width;

            img.style.left = x + 'px';
            img.style.top = minY + 'px';

            // 更新数组
            columnY[index] += parseInt(img.height) + space;

            // 更新容器
            var height = Math.max(...columnY);
            dom.style.height = height + 'px';
        }
    }

    function cla(){
        var total = parseInt(dom.clientWidth);
        columnSum = Math.floor(total / width);
        space = Math.floor((total - columnSum*width) / (columnSum + 1));

        console.log(columnSum)
        console.log(space)

        console.log(space)


    }

    // 窗口事件
    var timer = null ;
    window.addEventListener('resize',function(){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(function(){
            cla();
            setImgPosition();
        },3000)
      
    },false)
 }