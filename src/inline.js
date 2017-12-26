/**
 * @description [解析行内标签]
 * @create time 2017/5/22 14:36
 * @author [胡元港]
 */
const rules = {
		'img': /!\[([^\(\)\[\]]*)\]\(([^\(\)\[\]]*)\)/,
		'a': /\[([^\(\)\[\]]*)\]\(([^\(\)\[\]]*)\)/,
		'strong': /\*\*([^\*\s]+)\*\*/,
		'em': /\*([^\*\s]+)\*/
	};
const keys = Object.keys(rules);

exports.parse = function(str) {
	let item = checkRule(str);
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

function parseImg(str) {
	let s = /!\[([^\(\)\[\]]*)\]\(([^\(\)\[\]]*)\)/.exec(str)[0];
	return str.replace(s, `<img title="${RegExp.$1}" alt="${RegExp.$1}" src="${RegExp.$2}" >`);
}

function parseLink(str) {
	let s = /\[([^\(\)\[\]]*)\]\(([^\(\)\[\]]*)\)/.exec(str)[0];
	return str.replace(s, `<a href="${RegExp.$2}">${RegExp.$1}</a>`);
}
/**
 * [parseBlod 加粗]
 * @param  {string} str [description]
 * @return {string}     [description]
 */
function parseBlod(str) {
	let s = /\*\*([^\*\s]+)\*\*/.exec(str)[0];
	return str.replace(s, `<strong>${RegExp.$1}</strong>`);
}
/**
 * [parseSlant 倾斜]
 * @param  {string} str [description]
 * @return {[type]}     [description]
 */
function parseSlant(str) {
	let s = /\*([^\*\s]+)\*/.exec(str)[0];
	return str.replace(s, `<em>${RegExp.$1}</em>`);
}


function checkRule(str) {
	for(let i=0,l=keys.length; i<l; i++){
		if(!rules[keys[i]].test(str))
			continue;
		flag = true;
		return keys[i];
	}
	return false ;
}
