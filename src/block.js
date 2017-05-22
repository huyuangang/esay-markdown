/**
 * @description [解析块级标签]
 * @create time 2017/5/22 14:36
 * @author [胡元港]
 */
const rules = {
	'h': /^#+(.+)?/,
	'hr': /^[=-]{3,}$/,
	'li': /^[*+]{1}(.+)?/,
	'blockquote': /^>{1}.+/
}


var	isUl = false,
	isBlock = false,
	keys = Object.keys(rules);

exports.parse = function(str, nextStr) {
	let isParse = false;
	keys.forEach((item) => {
		if(!rules[item].test(str))
			return;
		isParse = true;
		if(item === 'h'){
			str = parseH(str);
			return;
		}
		if(item === 'li'){
			if(isUl){
				if(nextStr && rules[item].test(nextStr)){
					str = parseUl(str, 0);
				}
				else{
					isUl = false;
					str = parseUl(str, -1);
				}
			}
			else{
				if(!nextStr||!rules[item].test(nextStr)){
					str = parseUl(str, -2);
				}else{
					isUl = true;
					str = parseUl(str, 1);
				}
			}
			return;
		}
		if(item === 'hr'){
			str = '<hr >';
			return;
		}
		if(item === 'blockquote' ){
			if(isBlock){
				if(nextStr && rules[item].test(nextStr)){
					str = parseBlock(str, 0);
				}
				else{
					isBlock = false;
					str = parseBlock(str, -1);
				}
			}
			else{
				if(!nextStr || !rules[item].test(nextStr)){
					str = parseBlock(str, -2);
				}else{
					isBlock = true;
					str = parseBlock(str, 1);
				}
			}
			return;
		}
	})
	if(!isParse){
		str = `<p>${str}</p>`;
	}
	return str;
}

function parseH (str) {
	let h = str.match(/^#+/)[0];
	if(h.length < 7){
		return `<h${h.length}>${str.substr(h.length).trim()}</h${h.length}>`;
	}
	else {
		return `<h6>${str.substr(6)}</h6>`;
	}
}

function parseUl(str, flag) {
	let li = str.match(/^[*+-]{1}/)[0];
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