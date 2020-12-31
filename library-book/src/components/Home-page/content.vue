<template>
<div class="content-first">
    <div class="content-main" ref="contentMain">
        <ul class="content-item">
            <li
                v-for="item in content_item_list" :key="item.index" 
            ><div class="content-item-logo">
                
            </div>
            <p>{{item}}</p>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import './content.css'
import BScroll from 'better-scroll' 
export default {
    data() {
        return {
            content_item_list:[
            
            ]
        }
    },
    methods: {
        toggle1(){
            this.foodScroll = new BScroll(this.$refs.contentMain,{probeType: 3 ,mouseWheel: true});
        }
    },
    mounted() {
        this.toggle1()
        this.$axios.get('http://127.0.0.1:5000/getmessage')
            .then((response) => {
                console.log(response.data);
                this.content_item_list = response.data.reverse()
            }).catch(function (error) {
                console.log(error);
            });
    },
}
</script>
 
 
<style lang=''> 
    
</style>
