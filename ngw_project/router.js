var express = require('express')
var User = require('./models/user')
var Msg = require('./models/messageinfo')
var router = express.Router()
var axios = require('axios');
var log4js = require('./log/log4')
var reqlogger = log4js.getLogger('request');
var errorlogger = log4js.getLogger('error');
var authenticateJWT = require('./auth/authenticate')
const jwt = require('jsonwebtoken');



const accessTokenSecret = 'youraccesstokensecret';

router.post('/login', async function(req, res,next) {
    // Read username and password from request body
    const { username, password } = req.body;
    try {
        if (await User.findOne({ username: username, password: password})) {
             const accessToken = jwt.sign({ username: username,  password: password }, accessTokenSecret);
             return res.json({
                accessToken
            });
        }
        // 创建用户，执行注册
        res.status(304).json({
          err_code: 0,
          message: '用户名或密码错误'
        })
      } catch (err) {
        res.status(500).json({
          err_code: 500,
          message: err.message
        })
      }
});

router.get('/getmessage', async function(req, res, next) {
    try {
        // const collection = Msg.collection('msgs');
        console.log('qqq')
        Msg.find(function(err, data) {
            if(err) {
                res.status(500).json({
                    err_code: 500,
                    message: err.message
                  })
            }else {
                let data1 = data;
                let len = data.length;
                let list = []
                for(let i = 0; i < len; i++) {
                    list.push(data1[i].message)
                }
                res.send(list)
            }
        })     
    } catch (err) {
        res.status(500).json({
            err_code: 500,
            message: err.message
          })
    }
})

router.post('/submitinfo', function(req, res, next) {
    try {
        console.log(req.body.message)
        let info = {
            message:req.body.message
        }
        new Msg(info).save()
        return res.status(200).json({
            err_code: 1,
            message: '提交成功'
          })  

    } catch (err) {
        res.status(500).json({
            err_code: 500,
            message: err.message
          })
    }
})
router.post('/register',authenticateJWT, async function(req, res, next) {
    // Read username and password from request body
    const { username, password } = req.body;
    console.log(req.body)
    try {
        if (await User.findOne({ username: username, password:password})) {
            return res.status(200).json({
                err_code: 1,
                message: '已存在'
              })
        }
        // 创建用户，执行注册
        new User(req.body).save()
        res.status(200).json({
            err_code: 0,
            message: 'OK'
          })
      } catch (err) {
        res.status(500).json({
          err_code: 500,
          message: err.message
        })
      }
});


router.get('/books', authenticateJWT, (req, res) => {
    console.log('fff')
    res.json(books);
});

router.get('/', function (req, res) {
    var exec_start_at = Date.now();
    axios.all([
        axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-03'),
        axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-02')
      ]).then(axios.spread((response1, response2) => {
        reqlogger.mark({
            'url':'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-03'+';'+'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-02',
            "Method":"GET",
            "Timeout":String(Date.now() - exec_start_at) + 'ms'
        })
        res.render('index.html', {
            message1: response1.data.url,
            message2: response2.data.url
       })
      })).catch(error => {
        console.log(error);
        errorlogger.error(error)
      });
})     

router.post('/getinfo', function (req, res) { 
    try {
        var exec_start_at = Date.now();
        res.send('ok')
        reqlogger.mark({
            'url':req.headers.origin,
            "Method":"POST",
            "Body":req.body,
            "Timeout":String(Date.now() - exec_start_at) + 'ms'

        })
    } catch (error) {
        console.log(error);
        errorlogger.error(error)
    }
})




module.exports = router;