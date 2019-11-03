// 分页插件
/**
 * totalNum : 20,  总页数
 * pageSize :5,    每页多少条
 * currentPage : 1   当前选中第几页
 * backFn：function（pageNO）  点击回调
 * 
 * 利用立即执行函数，实现变量私有化  
 * jQuery = $
 *   $.fn.extend({
        传入一个参数代表扩展方法
        传入多个参数代表参数合并 第一个参数
    })
 */
(function($){
    $.fn.extend({
        page:function(option){
            var args = $.extend({
                totalNum : 20,  
                pageSize :5,    
                currentPage : 1  , 
                backFn:function(pageNo){}  
            },option)  //可以使用默认选项  合并对象
            initPage(this,args);
        }
    });

    function initPage(dom,option){
       console.log(dom)
       if(option.currentPage <= option.totalNum / option.pageSize){
        buildHtml(dom,option)
        bindEvent(dom,option)
       }else{

       }
    }

    function buildHtml(dom,option){
        // 上下页 
        var lastPage = option.totalNum / option.pageSize //总页数

        var current = parseInt(option.currentPage);

        if(current > 1){
            dom.append('<a href="#" class="prePage">上一页</a>')
        }else{
            dom.append('<span href="#" class="disablePage">上一页</span>')
        }

        // 第一页
        if(current >= 4){
            dom.append('<a href="#" class="pageNo">1</a>')
        }

        if(current - 2 > 2 ){
            dom.append('<span>...</span>')
        }


        var start = current -2,
            end = current + 2;
        for(;start <= end; start ++){
            if(start >= 1 && start < lastPage){
                if(start == current){
                    dom.append('<span href="#" class="active">'+start+'</span>')
                }else{
                    dom.append('<a href="#" class="pageNo">'+start+'</a>')
                }
                
            }
        }

        if(current + 2 < lastPage -1 ){
            dom.append('<span>...</span>')
        }
        // 最后一页
        if(current == lastPage){
            dom.append('<span href="#" class="active">'+lastPage+'</span>')

        }else{
            dom.append('<a href="#" class="pageNo">'+lastPage+'</a>');

        }

        if(current < lastPage){
            dom.append('<a href="#" class="nextPage">下一页</a>')
        }else{
            dom.append('<span href="#" class="disablePage">下一页</span>')
        }
    }

    function bindEvent(dom,option){
        dom.on('click','.pageNo',function(){
            console.log(this.text)
            gotoPage(dom,this.text,option);
        });
        dom.on('click','.nextPage',function(){
            gotoPage(dom,option.currentPage +1,option);
        });
        dom.on('click','.prePage',function(){
            gotoPage(dom,option.currentPage - 1,option);
        });

    }

    function gotoPage(dom,_pageNo,option){
        dom.empty()
        option.currentPage = _pageNo;
        buildHtml(dom,option);
        option.backFn(_pageNo);
    }

}(jQuery))
// 传入的  为window上的JQuery对象