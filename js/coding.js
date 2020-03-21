// 冒泡排序

var arr = [88,2,5,4,1,2,3,64,89,44,7]
console.log(arr,'原数组')
function bubb(arr,isDesc){
    var len = arr.length;
    for(var i=0;i<len;i++){
        for(var j=i+1;j<len;j++){
            if(arr[i] > arr[j]){
                var temp =  arr[i];
                arr[i] =  arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

shell(arr);
console.log(arr,'现数组')

// 插入排序分为  已排序区，和为排序区
function insert(arr){

    var len = arr.length;
    if(len == 1){
        return arr;
    }else{
        for(var i=1;i<len;i++){
            var temp = arr[i];
            for(var j=i-1;j>=0;j--){
                if( temp < arr[j]){
                    arr[j + 1] = arr[j];
                }else{
                    break;
                }
            }
            arr[j + 1] = temp;//最后插入时，临界位置
        }
    }
}
// 希尔排序  ，在插入排序上将大数据进行分组，对每个分组进行插入排序；

function shell(arr){
    var len = arr.length,
        gap = len;// 增量 通过增量在逻辑上吧原数组分组，将每个分组进行插入排序，并且减小增量大小，，直到为1  

    while(gap > 1){
        gap = Math.floor(gap / 2);
      
        for(var x=0;x<gap;x++){//分组个数

            for(var i=x+gap;i<len;i = i+gap){ 
                var temp = arr[i];
                for(var j=i-gap;j>=0;j = j-gap){
                  
                    if( temp < arr[j]){
                        arr[j + gap] = arr[j];
                    }else{
                        break;
                    }
                }
                arr[j + gap] = temp;//最后插入时，临界位置
            }
        }
    }

}
