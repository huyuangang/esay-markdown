//废弃的
(function(){
    var e = function(config){
        var me = this;
        me.ul = false;
        me.regs = {
            '^>':'blockquote',
            '^[+-]':'li'
        }
    }
    e.prototype.mark = function(text){
        var me = this;
        var markArr = text.split('\n');
        var str = '';
        for(var i=0,l=markArr.length; i<l; i++){
            if(markArr[i].trim())
                str += me.parseStr(markArr[i]);
                
        }
        return str;
    }
    e.prototype.parseStr = function(str){
        var me = this;
        if(/(^#+)/.test(str)){
            if(RegExp.$1.length<7)
                return '<h'+RegExp.$1.length+'>'+ str.replace(RegExp.$1,'').trim() + '</h'+RegExp.$1.length+'>';
            else
                return '<h6>'+ str.substr(6)+'</h6>';
        }
        else{
            var p = false;
            for(var reg in me.regs){
                console.log(reg);
                if(me.regs.hasOwnProperty(reg)){
                    if(new RegExp('('+reg+')').test(str)){
                        p = true;
                        return '<'+me.regs[reg]+'>' + str.replace(RegExp.$1,'').trim() + '</'+me.regs[reg]+'>';
                    }
                        
                }
            }
            if(!p)
                return str;
        }
    }
    window.EasyMarkdown = e;
}())

