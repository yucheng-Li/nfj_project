<template>
<div class="login-top">
    <div class="login-bg">
        <router-link to="/">
        Back
        </router-link>
        <div class="login-window">
            <div class="login-form">
                <label for="" class="login-logo">Login</label>
                <div class="login-input">
                    <div class="form-group login-name">
                      <label for="exampleInputName2">Student Number</label>
                      <input type="text" class="form-control"  placeholder="your name" ref="num">
                    </div>
                    <div class="form-group login-password">
                      <label for="exampleInputEmail2">Password</label>
                      <input type="password" class="form-control"  placeholder="password" ref="password1">
                    </div>
                    <div class="form-group login-password" v-show="flag">
                      <label for="exampleInputEmail2">input password again</label>
                      <input type="password" class="form-control"  placeholder="password" ref="password2">
                    </div>
                    <div class="login-btn">
                        <button type="submit" v-show="!flag" class="btn btn-default login-btn" @click="showbtn()">Register</button>
                        <button type="submit" v-show="flag" class="btn btn-default" @click="setinfo()">Register</button>
                        <button type="submit" v-show="!flag" class="btn btn-default login-btn logincolor" @click="postinfo()">Login</button>
                    </div>
                </div>  
            </div>

        </div>
    </div>

</div>
</template>

<script>
import './Login.css'
export default {
    data() {
        return {
            flag:false
        }
    },
    methods: {
        showbtn() {
            this.flag = !this.flag            
        },
        setinfo() {
            let num = this.$refs.num.value
            let password1 = this.$refs.password1.value
            let password2 = this.$refs.password2.value
            if(!num || !password1 || !password2) {
                alert('请输入完整')
                return
            }
            if(password1 != password2) {
                alert('前后输入密码不一致')
                return
            }
            let info = {
                'username': num,
                'password':password1
            }
            console.log(info)
            this.$axios.post('http://127.0.0.1:5000/register',info)

            .then((response) => {
                console.log(response.data.message);
                if(response.data.message == 'OK') {
                    alert('注册成功')
                    this.$router.go('/login')
                }
                this.$axios.defaults.headers.common['Authorization'] = response.data.accessToken
            }).catch(function (error) {
                console.log(error);
            });
        },
        postinfo() { 
            let num = this.$refs.num.value
            let password1 = this.$refs.password1.value
            let info = {
                'username': num,
                'password':password1
            }
            console.log(info)
            this.$axios.post('http://127.0.0.1:8000/login',info)
            .then((response) => {
                console.log(response.data);
                this.$axios.defaults.headers.common['Authorization'] = response.data.accessToken
                localStorage.setItem('token', response.data.accessToken);

                if(response.data) {
                    this.$router.push({ path: '/' })
                    console.log("chengg")
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    },
}
</script>
<style lang=''> 
    
</style>

