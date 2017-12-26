
const fs = require('fs');

const block = require('./src/block.js');
const inline = require('./src/inline.js');

let txt = fs.readFileSync('./test.txt', 'utf8');

let parser = (function () {
	let sub = '\r\n',
		parseArr = [];
	return {
		/**
		 * @param  {string} 待解析的字符串
		 * @return {string} 解析完成的字符串
		 */
		parse: function (str) {
			parseArr = str.split(sub).filter((item)=>{
				return item.trim()!=='';
			});
			for(let i=0,l=parseArr.length; i<l; i++){
				parseArr[i] = inline.parse(parseArr[i]);
				parseArr[i] = block.parse(parseArr[i],parseArr[i+1]);
			}
			console.log(parseArr.join(''));
		},
		setSub (value) {
			sub = value;
		}
	}
}())

parser.parse(txt);
