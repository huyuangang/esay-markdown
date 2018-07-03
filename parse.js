
// const fs = require('fs');

// const block = require('./src/block.js');
// const inline = require('./src/inline.js');

// var txt = fs.readFileSync('./test.txt', 'utf8');

var parser = (function () {
	var sub = '\r\n',
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
			for(var i=0,l=parseArr.length; i<l; i++){
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

window.EasyMarkdown = parser

// parser.parse(txt);
