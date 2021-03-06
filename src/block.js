/**
 * @description [解析块级标签]
 * @create time 2017/5/22 14:36
 * @author [胡元港]
 */
EasyMarkdown.blockParse = (function() {
	var blockRules = {
		'h'          : /^#+(.+)?/,
		'hr'         : /^[=-]{3,}$/,
		'li'         : /^[*+]{1}(.+)?/,
		'blockquote' : /^>{1}.+/,
		'tableHead'  : /^(\|.+?)+$/,
		'tableCut'   : /^(\|:?-+:?)+\|$/,
		'tableBody'  : /^(\|.+?)+$/,
		'codeStart'  : /^`{3}.+?$/,
		'codeEnd'		 : /^`{3}$/
	}
	
	var hasUl 				= false,   //是否已经解析到ul
			hasBlock      = false,	 //是否已经解析到块
			hasTable      = false,   //是否已经解析到表格
			hasCode				= false,   //是否已经解析到code
			codeType 			= 'js',		 //code类型
			tableHead     = [],      //表格头部
			tableBody     = [],			 //表格内容
			blockKeys          = Object.keys(blockRules);  //所有规则

	function parseH (str) {
		var h = str.match(/^#+/)[0];
		if(h.length < 7){
			return `<h${h.length}>${str.substr(h.length).trim()}</h${h.length}>`;
		}
		else {
			return `<h6>${str.substr(6)}</h6>`;
		}
	}
	
	function parseUl(str, flag) {
		var li = str.match(/^[*+-]{1}/)[0];
		if(flag === 1)
			return `<ul><li>${str.substr(1).trim()}</li>`;
		if(flag === 0)
			return `<li>${str.substr(1).trim()}</li>`;
		if(flag === -1)
			return `<li>${str.substr(1).trim()}</li></ul>`;
		if(flag === -2)
			return `<ul><li>${str.substr(1).trim()}</li></ul>`;
	}
	
	function parseBlock(str, flag) {
		if(flag === 1)
			return `<blockqutoe><p>${str.substr(1).trim()}</p>`;
		if(flag === 0)
			return `<p>${str.substr(1).trim()}</p>`;
		if(flag === -1)
			return `<p>${str.substr(1).trim()}</p></blockqutoe>`;
		if(flag === -2)
			return `<blockqutoe><p>${str.substr(1).trim()}</p></blockqutoe>`;
	}
	
	function parseTable(str, flag) {
		if(flag === 0) {
			var stri = '<table><tr>'
			for(var i = 0, l = tableHead.length; i < l; i++) {
				if(!tableHead[i]) {
					continue;
				}
				stri += `<th>${tableHead[i]}</th>`
			}
			stri += '</tr>'
			return stri;
		}
	
		if(flag === 1) {
			return '';
		}
	
		if(flag === 2) {
			return '</table>'
		}
	
		if(flag === 3 || flag === 4) {
			var tableBodys = str.substr(1).split('|'),
			stri    = '<tr>';
	
			for(var i = 0, l = tableBodys.length; i < l ; i++) {
				if(!tableBodys[i]) {
					continue;
				}
				stri += `<td>${tableBodys[i]}</td>`
			}
			stri += '</tr>';
			if(flag === 4) {
				stri += '</table>';
			}
			return stri;
		}
	}
	
	/**
	 * @Author     Huyuangang
	 * @DateTime   2017-12-25
	 * @str    		 {[String]} 当前解析串
	 * @nextStr    {[String]} 下一行解析串
	 * @return     {[String]} 解析结果
	 */
	blockParse = function(str, nextStr) {
		
		//是否解析成功
		var isParse = false;
		
		if (hasCode && !blockRules['codeEnd'].test(str)) {
			//如果解析到代码
			
			return '\n' + str;
		}
	
		blockKeys.forEach((item) => {
	
			//不符合当前规则直接返回。
			if(!blockRules[item].test(str))
				return;
	
			if(item === 'tableHead' && hasTable) {
				item = 'tableBody';
			}
			if(item === 'tableBody' && !hasTable) {
				return;
			}
	
			//解析成功
			isParse = true;
	
			//如果是标题
			if(item === 'h'){
				str = parseH(str);
				return;
			}
	
			//如果是列表
			if(item === 'li'){
	
				if(hasUl){
					//如果已经解析到ul
	
					if(nextStr && blockRules[item].test(nextStr)){
						//如果下一行存在且下一行也是列表
	
						str = parseUl(str, 0);
					}
					else{
						// 下一行不存在或者不是列表
	
						hasUl = false;
						str = parseUl(str, -1);
					}
				}
				else{
					//如果之前未解析到ul
	
					if(!nextStr || !blockRules[item].test(nextStr)){
						//下一行不存在或者不是列表
	
						str = parseUl(str, -2);
					}else{
						//下一行是列表
	
						hasUl = true;
						str = parseUl(str, 1);
					}
				}
				return;
			}
	
			//分割线
			if(item === 'hr'){
				str = '<hr >';
				return;
			}
	
			//块级
			if(item === 'blockquote' ){
	
				if(hasBlock){
					//块级已经存在
	
					if(nextStr && blockRules[item].test(nextStr)){
						//下一行存在且下一行也是block
						
						str = parseBlock(str, 0);
					}
					else{
						//写一行不存在或下一行不存在block
						
						hasBlock = false;
						str = parseBlock(str, -1);
					}
				}
				else{
					//块级还不存在
					
					if(!nextStr || !blockRules[item].test(nextStr)){
						//下一行不存在或者下一行不是block
						
						str = parseBlock(str, -2);
					} else {
						//下一行存在并且下一行是block
						
						hasBlock = true;
						str = parseBlock(str, 1);
					}
				}
				return;
			}
	
			//表格
			if(item === 'tableHead') {
	
				if(blockRules['tableCut'].test(nextStr)) {
	
					tableHead = str.substr(1).split('|');
					str       = parseTable(str, 0);
					hasTable  = true;
					return;
				} else {
					isParse = false;
					return;
				}
			}
	
			//表格分隔
			if(item === 'tableCut') {
	
				if(blockRules['tableBody'].test(nextStr)) {
	
					str = parseTable(str, 1);
				} else {
	
					str = parseTable(str, 2);
					hasTable = false;
				}
				return ;
			}
	
			if (item === 'tableBody') {
				//表格内容
	
				if(blockRules['tableBody'].test(nextStr)) {
					str = parseTable(str, 3);
				} else {
					str = parseTable(str, 4);
					hasTable = false;
				}
				return ;
			}
	
			if (item === 'codeStart') {
				//代码开始
				codeType = str.substr(3);
				str      = '<pre><code>';
				hasCode  = true;
				return;
			}
	
			if (item === 'codeEnd') {
				//代码结束
				hasCode = false;
				str     = '</code></pre>';
				return;
			}
	
		})
	
		//如果没有解析成功，以文本处理
		if(!isParse){
			str = `<p>${str}</p>`;
		}
		return str;
	}

	return blockParse;
})()



