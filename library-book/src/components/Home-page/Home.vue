<template>
<div class="home-top">
    <div class="home-bg">
        </div>
    <router-link to="/login" class="home-to-login">
        this is home    
    </router-link>
        <div class="home-search" ref="searchInput">
            <input type="text" ref="inputinfo" class="form-control " id="exampleInputName2" placeholder="Jane Doe">
            <div class="home-submit" @click="submitinfo()"><span>submit</span></div>
        </div>
        <Content class="home-content" ref="domContent"></Content>
    
</div>
</template>

<script>
import './Home.css'

import Content from './content.vue'
export default {
    data() {
        return {
            scrollTop:0,
        }
    },
    methods: {
        handleScroll() {
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if(this.scrollTop > 100) {
                  //当滚动距离大于250px时执行下面的东西
            console.log(this.$refs.domContent.$el.style)

            this.$refs.searchInput.$el.style.visibility = 'hidden';

            }
        },
        submitinfo() {
            console.log( this.$refs.inputinfo.value)
            let token = localStorage.getItem('token')
            if(!token) {
                alert('请先登录');
                return;
            }
            let info = {
                message:this.$refs.inputinfo.value
            }

            this.$axios.defaults.headers.common['Authorization'] = token

            this.$axios.post('http://127.0.0.1:5000/submitinfo',info)
            .then((response) => {
                console.log(response.data);
                this.$axios.defaults.headers.common['Authorization'] = response.data.accessToken
            }).catch(function (error) {
                console.log(error);
            });
            this.$refs.inputinfo.value = ''
            this.$router.go(0);
        }
    },
    components: {
        Content
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll, true)
        
    },
}
</script>
 
 
<style lang=''> 
    
</style>
