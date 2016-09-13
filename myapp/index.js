var express = require('express');
var app = express();

// 加载hbs模块
var hbs = require('hbs');

// 加载数据模块
var blogEngine = require('./blog');

// 指定模板文件的后缀名为html
app.set('view engine', 'html');

// 运行hbs模块
app.engine('html', hbs.__express);

//模板文件默认存放在views子目录。这时，如果要在网页中加载静态文件（比如样式表、图片等），就需要另外指定一个存放静态文件的目录。
//上面代码在文件index.js之中，指定静态文件存放的目录是public。于是，当浏览器发出非HTML文件请求时，服务器端就到public目录寻找这个文件。比如，浏览器发出如下的样式表请求：
//<link href="/bootstrap/css/bootstrap.css" rel="stylesheet">
//服务器端就到public/bootstrap/css/目录中寻找bootstrap.css文件。
app.use(express.static('public'));

app.use(express.bodyParser());

//开始
app.get('/', function(req, res) {
    res.render('index',{title:"最近文章", entries:blogEngine.getBlogEntries()});
});

app.get('/about', function(req, res) {
    res.render('about', {title:"自我介绍"});
});

app.get('/article/:id', function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title, blog:entry});
});

app.listen(3000);