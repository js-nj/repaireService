<template>
  <div class="wrap">
    <div class="center">
    <div>
      调试地址:<input id="href" type="text" v-model="href">
      端口号:<input id="port" type="text" v-model="port">
    </div>
    <button style="background: orange" id="debug" @click="debug">调试</button>
    </div>
  </div>
</template>

<script>
  import {
    Toast
  } from 'bh-mint-ui2';
  export default {
    data () {
      return {
        href: '',
        port: ''
      }
    },
    methods: {
      debug: function() {
        if(this.href == '') {
          Toast('请输入调试地址');
          return;
        }
        if(this.port == '') {
          Toast('请输入端口号');
          return;
        }
        var link = 'http://'+this.href+':'+this.port;
        window.location.href = link;
      }
    }
  }
</script>
<style>
  /*Edite by Necfol*/
  /*Edite by Necfol*/
</style>

