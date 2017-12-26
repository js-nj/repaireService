<template>
  <div class="ci-item" style="">
    <div class="ci-name">{{option.HFRY}}</div>
    <div class="ci-describe">
      <span>{{option.HFSJ}}</span>
      <!-- <span class="ci-rule">{{option.role}}</span> -->
    </div>
    <div class="ci-content">{{option.HFNR}}</div>
  </div>
</template>
<script>
import utils from '../utils.js';
export default {
  data() {
      return {

      }
    },
    filters: {
      
    },
    methods: {
      
    },
    props: {
      option:Object
    },
    created() {

    }
}
</script>
<style>
.ci-item {
  border-bottom:solid 0.5px #eee;
  margin: 16PX 0 ;
}
.ci-describe {
  font-size:12PX;
  color:#999;
}
.ci-rule {
  display:inline-block;
  padding:4PX 0 4PX 16PX;
}
.ci-name {
  font-size:14PX;
  color:#999;
}
.ci-content {
  padding: 8PX 0 16PX 0;
  font-size:16PX;
}
</style>
