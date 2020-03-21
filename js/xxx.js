/**  默认为bootstrap的表单
 * defalut {
 *
 *  fieldList : [],
 *  form:{
 *      class
 *      url:,
 *      success:function(data){}
 *      error:function(){}
 *  },
 *  header :xx,
 *  foot:xx,
 * }
 */

(function ($) {
    var defalut = {
            name: 'qulit.name',
            label: 'label',
            option: {
                type: 'text',
                classList: 'form-control',
                readonly: '',
                rule: {
                    notEmpty: {
                        message: '不能为空！'
                    },
                },
                defaultValue: null,
                placeHolder: '请填写',
                mode: {
                    name:'',
                    call:null,
                    type:'click',
                    isCaptrue:false,
                    init:false
                }
            }
        },
        form = {
            class: 'form-horizontal',
            url: 'xxxx',
            success: function (data) {
                console.log('form------success');
            },
            error: function () { console.log('form------faild'); }
        };
    $.fn.extend({
        form: function (option) {
            var formConfig = $.extend(true, form, option.form),
                formObj = buildForm(option, this[0], formConfig);
            return new Form(formObj, formConfig);
        }
    });
    /**
     * option 字段数组
     */
    function buildForm(option, _this, _formConfig) {
        var _form = document.createElement('form');
        _form.className = _formConfig.class;

        var inputObjList = {
            form :_form,
            fields:[],
            validators:{}
        };
        for (var i = 0; i < option.fieldList.length; i++) {

            // 防止污染默认配置，克隆两次
            var defalutTemp = $.extend(true, {}, defalut),
                item = $.extend(true, defalutTemp, option.fieldList[i]);
            var child = matchAndGenerate(item),
                completeEl = util.buildMode($.fn.form.mode, null, item, child,_form);
            _form.appendChild(completeEl);
            inputObjList.fields.push(child);
            /**构建验证规则 */
            var validator = item.option.rule;
            inputObjList.validators[item.name] = {
                validators : validator
            };
        }
        _this.appendChild(_form);
        return inputObjList;
    }
    /**
     * _item 创建元素
     */
    function matchAndGenerate(_item) {
        var el = null;
        if (_item.isTextArea) {
            el = document.createElement('textarea');
            el.rows = _item.isTextArea.rows;

        } else {
            el = document.createElement('input');
            el.type = _item.option.type;
        }
        return setAttr(el, _item);
    }
    /**设置属性 */
    function setAttr(_el, _config) {
        _el.className = _config.option.classList;
        _el.name = _config.name;
        _el.value = _config.option.defaultValue;
        _el.placeholder = _config.option.placeHolder;
        return _el;
    }
    Form.prototype = {
        /**
         * 新增或修改
         * @param {*} _idName 默认主键 _idValue 默认为null
         */
        add: function (_el,_idName, _idValue) {

            /**构建JSON
             *
             * 可能需要判断  是否此input只做显示作用，隐藏的input才是真正要提交的额数据
             */
            $(this.form).bootstrapValidator('validate');
            if(!$(this.form).data('bootstrapValidator').isValid())
            {
                _el.removeAttribute("disabled");
                return ;
            }

            var len = this.fieldList.length, json = {};
            json[_idName] = _idValue;
            for (var i = 0; i < len; i++) {
                var attr = this.fieldList[i].name,
                    value = this.fieldList[i].value;
                json[attr] = value;
            }

            console.log(json);

            util.ajax(this, json, 'post');
        },
        detail: function () {

        },
        /**
         *
         * @param {*} _mode 单对象
         */
        update: function (_mode) {

        },
    }
    function Form(formObj, formConfig) {
        this.fieldList = formObj.fields;
        this.form = formObj.form;
        this.validator = formObj.validators;

        this.success = formConfig.success;
        this.error = formObj.error;
        this.url = formConfig.url;

        console.log(this.validator)
        /**规则 */
        var bootstrapValidator = {
            message: 'This value is not valid',
            fields:  this.validator
        }
        $(this.form).bootstrapValidator(bootstrapValidator);
        return this;
    }

    $.fn.form.mode = {
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
    $.fn.form.icon = {
        time: {
            element: 'div',
            classList: 'input-group',
            addType: '',
            children: [
                {
                    // 此属性 表示当前回调方法监听的元素
                    isCallBack:true,
                    element: 'span',
                    classList: 'input-group-addon',
                    children: [
                        {
                            element: 'i',
                            classList: 'fa fa-calendar modify_able',
                            addType: '',
                            children: null
                        }
                    ]
                },
                {
                    //代表占位即此处将插入input元素
                    element: null,
                    classList: '',
                    addType:'input',
                    children: null
                },
            ]
        },
        address:{
            element: 'div',
            classList: 'input-group',
            addType: '',
            children: [
                {
                    isCallBack:true,
                    element: 'span',
                    classList: 'input-group-addon',
                    children: [
                        {
                            element: 'i',
                            classList: 'fa fa-map-marker modify_able',
                            addType: '',
                            children: null
                        }
                    ]
                },
                {
                    element: null,  //代表占位
                    classList: '',
                    addType:'input',
                    children: null
                },
                {
                    element: 'label',
                    classList: 'control-label',
                    addType: 'label',
                    text:'( , )',
                    children: null
                }
            ]
        }

    };
    var util = {
        ajax: function (_context, _data, _type) {
            $.ajax({
                url: _context.url,
                data: {
                    _data
                },
                type: _type,
                cache: false,
                dataType: 'json',
                error: function (request) {
                    _context.error();
                },
                success: function (data) {
                    _context.success(data)
                }
            });
        },
        /**
         *
         * @param {*} _mode 遍历的数据
         * @param {*} _root 为null的空节点
         * @param {*} _config 配置项
         * @param {*} _real 将插入的input
         */
        buildMode: function (_mode, _root, _config, _real,_form) {
            if(_mode.element){
                var el = document.createElement(_mode.element);
                el.className = _mode.classList;
                _root = _root ? _root.appendChild(el) : el;
                if (_mode.addType === 'label') {
                    el.innerText = _mode.text ? _mode.text : _config.label;
                }
                if (_mode.addType === 'input') {
                    if(_config.option.mode.name){
                        var name = _config.option.mode.name,
                            tmp = $.fn.form.icon[name];
                        var icons = this.buildMode(tmp,el,_config, _real,_form);
                        el.appendChild(icons);
                    }else{
                        el.appendChild(_real);
                    }
                }
                /**添加事件 */
                this.hasOwnPropertyAndNotEmpty(_mode,'isCallBack') && this.addCallBack(_config.option.mode,el,_form);
                if (_mode.children) {
                    for (var index = 0; index < _mode.children.length; index++) {
                        var element = _mode.children[index];
                        this.buildMode(element, el, _config, _real,_form);
                    }
                }
            }else{
                //添加真实input
                _root.appendChild(_real);
            }
            return _root;
        },
        /**
         * 判断是否有指定的属性切值为true
         * @param {*} _obj
         * @param {*} _attr
         */
        hasOwnPropertyAndNotEmpty:function(_obj,_attr){
            return _obj.hasOwnProperty(_attr)?_obj[_attr]:false;
        },
        /**
         * dom添加回调
         * @param {*} _type
         * @param {*} _el
         * @param {*} _fn
         * @param {*} _isCaptrue 是否捕获 默认为false
         */
        addCallBack:function(callObj,_el,_form){
            var _fn = callObj.call;
            if(callObj.init){
                _fn(_el,_form);
            }else{
                var _type = callObj.type,
                    _isCaptrue = callObj._isCaptrue;

                _el.addEventListener(_type,function(e){
                    _fn(_el,e);
                },_isCaptrue);
            }
        }
    }
})(jQuery);
