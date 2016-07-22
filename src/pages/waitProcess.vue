<template>
<div>
  <list-item v-for="item in dataResource" :messagetitle="item.messagetitle" :info="item.info" :timezone="item.timezone" :img="item.img" :tag="item.tag"></list-item>
</div>
</template>

<script>
import ListItem from '../components/listItem.vue';
export default {
  data() {
    return {
      dataResource: [{
            messagetitle:'爱上',
            info:'爱上一匹野马，可我的家里没有草原，这让我感到忧伤',
            timezone: '1小时前',
            tag:'网络',
            img: 'http://f.named.cn/f/2fafab7df89d79ff2f5ca1f1e1c379ca.t720x541.jpg'
        
      },{
            messagetitle:'呵呵',
            info:'空调全是坏的',
            timezone: '1小时前',
            tag:'网络',
            img: 'http://f.named.cn/f/2fafab7df89d79ff2f5ca1f1e1c379ca.t720x541.jpg'
        
      },{
            messagetitle:'呵呵',
            info:'空调全是坏的',
            timezone: '1小时前',
            tag:'网络',
            img: 'http://f.named.cn/f/2fafab7df89d79ff2f5ca1f1e1c379ca.t720x541.jpg'
        
      },{
            messagetitle:'呵呵',
            info:'空调全是坏的',
            timezone: '1小时前',
            tag:'网络',
            img: 'http://f.named.cn/f/2fafab7df89d79ff2f5ca1f1e1c379ca.t720x541.jpg'
        
      },{
            messagetitle:'呵呵',
            info:'空调全是坏的',
            timezone: '1小时前',
            tag:'网络',
            img: 'http://f.named.cn/f/2fafab7df89d79ff2f5ca1f1e1c379ca.t720x541.jpg'
        
      },{
            messagetitle:'呵呵',
            info:'空调全是坏的',
            timezone: '1小时前',
            tag:'网络',
            img: 'http://f.named.cn/f/2fafab7df89d79ff2f5ca1f1e1c379ca.t720x541.jpg'
        
      },{
            messagetitle:'呵呵',
            info:'空调全是坏的',
            timezone: '1小时前',
            tag:'网络',
            img: 'http://f.named.cn/f/2fafab7df89d79ff2f5ca1f1e1c379ca.t720x541.jpg'
        
      },{
            messagetitle:'呵呵',
            info:'空调全是坏的',
            timezone: '1小时前',
            tag:'网络',
            img: 'http://f.named.cn/f/2fafab7df89d79ff2f5ca1f1e1c379ca.t720x541.jpg'
        
      },{
            messagetitle:'呵呵',
            info:'空调全是坏的',
            timezone: '1小时前',
            tag:'网络',
            img: 'http://f.named.cn/f/2fafab7df89d79ff2f5ca1f1e1c379ca.t720x541.jpg'
        
      }]
    }
  },
  components: {
    ListItem
  }
}
</script>

<style scoped>
/*.post {
    position: fixed;
    background: red;
    top: 900px;
    right: 50px;
}*/
</style>
