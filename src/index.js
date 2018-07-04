
window.EasyMarkdown = {
  sub: '\r\n',
  setSub (value) {
    this.sub = value || '\r\n';
  }
}

EasyMarkdown.parse = function(str) {
  var parseArr = str.split(this.sub).filter((item)=>{
    return item.trim()!=='';
  });
  for(var i=0,l=parseArr.length; i<l; i++){
    parseArr[i] = this.inlineParse(parseArr[i]);
    parseArr[i] = this.blockParse(parseArr[i],parseArr[i+1]);
  }
  return parseArr.join(this.sub);
}