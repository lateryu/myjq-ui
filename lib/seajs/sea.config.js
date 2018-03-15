// 类库包配置文件
seajs.config({
    //base: 'plugins',
    alias: {
        'jquery': 'jquery.js',
        'class': './class.js',
        'superClass': './super.class.js',
        'loading': './loading.js',
        'button': './plugins/button.js',
        'star': './plugins/star.js'
    },
    map: [
        /*[ '.js', '-min.js' ],*/
        [/^(.*\.(?:css|js))(.*)$/i, '$1?t=21050722']
    ],
 
    charset: 'utf-8',
    timeout: 20000,
    debug: false
});
