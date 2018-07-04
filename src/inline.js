/**
 * @description [解析行内标签]
 * @create time 2017/5/22 14:36
 * @author [胡元港]
 */



EasyMarkdown.inlineParse = function(str) {

	var rules = {
		'img': /!\[([^\(\)\[\]]*)\]\(([^\(\)\[\]]*)\)/,
		'a': /\[([^\(\)\[\]]*)\]\(([^\(\)\[\]]*)\)/,
		'strong': /\*\*([^\*\s]+)\*\*/,
		'em': /\*([^\*\s]+)\*/
	};
	var keys = Object.keys(rules);


	function parseImg(str) {
		var s = /!\[([^\(\)\[\]]*)\]\(([^\(\)\[\]]*)\)/.exec(str)[0];
		return str.replace(s, `<img title="${RegExp.$1}" alt="${RegExp.$1}" src="${RegExp.$2}" >`);
	}
	
	function parseLink(str) {
		var s = /\[([^\(\)\[\]]*)\]\(([^\(\)\[\]]*)\)/.exec(str)[0];
		return str.replace(s, `<a href="${RegExp.$2}">${RegExp.$1}</a>`);
	}
	/**
	 * [parseBlod 加粗]
	 * @param  {string} str [description]
	 * @return {string}     [description]
	 */
	function parseBlod(str) {
		var s = /\*\*([^\*\s]+)\*\*/.exec(str)[0];
		return str.replace(s, `<strong>${RegExp.$1}</strong>`);
	}
	/**
	 * [parseSlant 倾斜]
	 * @param  {string} str [description]
	 * @return {[type]}     [description]
	 */
	function parseSlant(str) {
		var s = /\*([^\*\s]+)\*/.exec(str)[0];
		return str.replace(s, `<em>${RegExp.$1}</em>`);
	}
	
	
	function checkRule(str) {
		for(var i=0,l=keys.length; i<l; i++){
			if(!rules[keys[i]].test(str))
				continue;
			flag = true;
			return keys[i];
		}
		return false ;
	}

	var item = checkRule(str);
	while(item){
		if(item === 'img'){
			str = parseImg(str);
		}
		if(item === 'a'){
			str = parseLink(str);
		}
		if(item === 'strong'){
			str = parseBlod(str);
		}
		if(item === 'em'){
			str = parseSlant(str);
		}
		item = checkRule(str);
	}
	return str;
}


