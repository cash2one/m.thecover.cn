
var jsFile = ['jweixin.js', 'sea.js', 'jquery_with_md5.js', 'juicer.js', 'nprogress.js', 'basic.js'];
for(var i = 0; i < jsFile.length; i++){
    document.write('<script src="js/'+jsFile[i]+'"></script>');
}