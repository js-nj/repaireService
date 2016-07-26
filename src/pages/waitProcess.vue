<template>
<div>
  <mt-loadmore class="mt-loadmore-div" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false">
    <list-item v-for="item in dataResource" :messagetitle="item.BXQY_DISPLAY+item.BXDD_DISPLAY" :info="item.MS" :timezone="item.BXSJ" img="http://f.named.cn/f/2fafab7df89d79ff2f5ca1f1e1c379ca.t720x541.jpg" :tag="item.tag"></list-item>
  </mt-loadmore>
</div>
</template>

<script>
import ListItem from '../components/listItem.vue';
import api from '../api.js';
import { Loadmore } from 'bh-mint-ui';
var merge = function() {
  return Array.prototype.concat.apply([], arguments)
};
function loadData(num) {
  var self = this;
  api.call(this,'/getMyRepairsPagination.do',{state:'DCL',pageNumber:num,pageSize:10}, function(result) {
    var data = result.data.datas.bxsscxwdbxjlbg;
    if(data.rows.length>0) {
      self.dataResource=merge(self.dataResource,data.rows);
    }else{
      this.allLoaded = true;
    }
  },function(err) {
  })  
}
export default {
  data() {
    return {
      dataResource: [],
      pagenum: 1
    }
  },
  methods: {
    loadBottom(id) {
        this.page = this.page + 1;
        loadData.call(this,this.page,);
        // this.getCardList(this.page)
        // if(this.page < 880) {
        //   this.allLoaded = true
        // }
        this.$broadcast('onBottomLoaded', id)
    }
  },
  created() {
    // var self = this;
    loadData.call(this,1);
    // api.call(this,'/getMyRepairsPagination.do',{state:'DCL',pageNumber:1,pageSize:10}, function(result) {
    //   var data = result.data.datas.bxsscxwdbxjlbg;
    //   self.dataResource = data.rows;
    //   console.log(data)
    // },function(err) {
    //   console.log(err)
    // })
  },
  components: {
    ListItem,
    [Loadmore.name]:Loadmore
  }
}
</script>

<style scoped>
.mt-loadmore-div {
  padding-top: 0px;
}
/*.post {
    position: fixed;
    background: red;
    top: 900px;
    right: 50px;
}*/
</style>
