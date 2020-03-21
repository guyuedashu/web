# form 插件说明
此插件依赖于Jquery、bootstrap-css、bootstrapValidator.js 请先引入它们。

**本插件由集成了生成表单，字段验证、表单提交可以时调用方，减少代码的书写,统一管理各个表单的状态。并有回调函数可以修改，或者增加将要提交的字段**

## 1.1 全局配置

如下结构为 配置整个样式结构，请在初始化时配置，
此结构代表着，input和label的绑定关系，以及他们共同的父类，有时候为了样式，需要其嵌套一些结构，

```
不嵌套时，生成如下结构
<form>
    <label>xxxx</label><input type="text" name="xxx"/>
     <label>xxxx</label><input type="text" name="xxx"/>s
     .......
</form>


为了方便默认采用了bootstrap的表单嵌套结构
<form>
    <div class="form-group">
        <label class="col-sm-2 control-label"  >所属回路</label>
            <div class="col-sm-10">
                <input type="text"  name="in_loop">
            </div>
        </div>
    </div>
     .......
     .......
</form>
```
如果你想修改嵌套关系请在初始化时，进行下面操作

**$.fn.form.mode = myMode;**

myMode 类型 为 Object 结构如下
```
{
     element: 'div',                       
        classList: 'form-group',
        addType: '',
        children: [
            {
                element: 'label',
                classList: 'col-md-2 control-label',
                addType: 'label',
                children: null
            },
            {
                element: 'div',
                classList: 'col-md-10',
                addType: 'input',
                children: null
            }
        ]
}
```
说明 ：

| 参数          |    类型       |  必选？   |  参数说明    |
| :---:         |     :---:     |   :---:   |:---           |
| element       |   string       | Y        | 元素类型 如 div     |
| classList     |       string  | N         |className，多个请用空格 隔开      |
| children       |    []数组     | N    | 子元素 数组，数组每一项即为一个myMode  
| addType     |       string      | Y   |取值为 input / label   input：代表此元素是嵌套input元素的直接父元素，相当于上述的div.col-md-10;   label：代表此处将插入文本|
## 1.2 调用方法
```
$('#container').form({
    form：{},
    fieldList:[],
});
```
**入参** ：
| 参数          |    类型       |  必选？   |       参数说明    |
| :---:         |     :---:     |  :---   |           :---   |
| form           |   object      |  Y | form的配置 详情如下|
| fieldList     |     []数组    |Y  |   每一项为field对象 详情如下  |



**form 参数** ：
| 参数          |    类型       |  必选？   |       参数说明    |
| :---:         |     :---:     |  :---   |           :---   |
| name           |   string      |  Y | 对象名  如person、student等|
| classList     |    string    |N |className，多个请用空格 隔开      |
| url     |    string    |Y  |当前提交接口地址     |
| success     |    function    |N  |成功回调  默认打印到控制台    |
| error     |     function   |N  |失败回调     默认打印到控制台 |
| submitValidatorCall     |    function    |N  |提交前用来验证私有字段 |
| initValidatorCall     |    function    |N  |打开form时，用来清除私有的验证|

**注意：**  submitValidatorCall 和initValidatorCall 必须同时配置。


**field配置：** 
| 参数          |    类型       |  必选？   |       参数说明    |
| :---:         |     :---:     |  :---   |           :---   |
| name           |   string      |  Y | 对象名  如person、student等|
| label     |    string    |Y |className，多个请用空格 隔开      |
| option     |    object    |N | 字段配置    详情见如下配置  |


**option配置：** 
```
{
    //元素类型，如input （默认）可不传、textarea、div   
    element:'input',   

    type: 'text',  

    //className      默认 form-control 可不传     
    classList: 'form-control',

    //是否只读  默认 false 可不传 
    readonly: false

    //是否只做显示，当element为div时 请设置为true  默认 false 可不传 
    onlyShow:false,

    //当element为textarea时 显示行数，默认为3 可不传
    rows:3,

    //当input内初始值时设置，可不传
    defaultValue: null,
    
     //当input为空时提示，默认为 请填写 可不传
    placeHolder: '请填写',

    //此字段需要的规则，取值和bootstrap-validator规则相同，默认为不能为空
    rule: {
        notEmpty: {
            message: '不能为空！'
        },
    },

    //此字段 提交和显示值时，需要的回调方法，
    valueCall:{
        name:null,  // name 必须和 field中一样
        submitvalueCall:null,  提交时回调，可不传
        setvalueCall:null,    设置时回调 可不传
    },

    //当前需要监听的方法，
    callBack:{
        call:function（）{},  // 必须  方法
        type:'click',  // 必须 事件类型
        isCaptrue:false, //  是否捕获事件
        init:false   //是否立即执行且执行一次  初始化外部插件请打开他
     },

     //需要在 添加元素 父元素，或者之前之后，比如 input之前的图标/之后的label，或者input添加父元素， parent|before|after类型都为 JQ对象
     mode: {
            parent:null,   //可不传
            before:null,     //可不传
            after:null,      //可不传
            //当外部添加的元素需要存贮值时，请设置storage属性
            storage:[
                {
                    name:null,  // name 必须是parent|before|after其中的值
                    submitvalueCall:null,  提交时回调，可不传
                    setvalueCall:null,    设置时回调 可不传  
                }
                ...
    }
}
```
**回调方法说明** 
- error 
    + 入参   xhr对象  
    + 返回值 无
- success
    + 入参 服务器返回的数据
    + 返回值 无


- submitValidatorCall
    + 实现 实现自己的验证规则
    + 入参  onlyShow:true,context对象的的数组
    + 返回值 Boolean 验证值 是否适合要求

- initValidatorCall
    + 实现 清除自己的验证规则
    + 入参  onlyShow:true,context对象的的数组
    + 返回值 无

- valueCall
    + 实现 处理值
    + 入参  
        - name 当前字段名
        - value 当前值
    + 返回值 Object类型 
        - 例 {name：value} 可自定义多个属性
- call
    + 实现 触发事件
    + 入参  
        - el : 当前this 添加事件的dom元素
        - e : 事件对象
    + 返回值 无
```
context{
      name:当前提交时字段名
      context:存贮当前值的dom，
      submitValueCall:提交前 需要数据处理的回调
      setValueCall: 放置数据时的回调
}
```

