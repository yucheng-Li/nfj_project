var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var router = require('./router')
var app = express()
var cors=require('cors');

app.use(bodyParser.json());

//跨域配置
app.use(cors({
    origin:['http://localhost:8081'],  //指定接收的地址
    methods:['GET','POST'],  //指定接收的请求类型
    alloweHeaders:['Content-Type','Authorization']  //指定header
}))
//配置一些相对地址
app.use('/public', express.static(path.join(__dirname, './public')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))

//指定.html结尾的文件使用模板引擎
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))

//post表单解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

app.listen(5000, function () {
    console.log('port:5000 running...')
  })