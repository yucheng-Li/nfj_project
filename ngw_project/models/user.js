
const mongoose = require('mongoose');
// 数据库连接
mongoose.connect('mongodb://localhost/nfw_project', { useNewUrlParser: true})
	// 连接成功
	.then(() => console.log('数据库连接成功'))
	// 连接失败
	.catch(err => console.log(err, '数据库连接失败'));
var Schema = mongoose.Schema

var userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model('User', userSchema)


