
const mongoose = require('mongoose');
// 数据库连接
mongoose.connect('mongodb://localhost/nfw_project', { useNewUrlParser: true})
	// 连接成功
	.then(() => console.log('留言数据库连接成功'))
	// 连接失败
	.catch(err => console.log(err, '留言数据库连接失败'));
var Schema = mongoose.Schema

var messageSchema = new Schema({
    message:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model('Msg', messageSchema)


