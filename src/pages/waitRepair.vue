<template>
  <mt-loadmore v-show="dataResource.length > 0" class="mt-loadmore-div" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false">
    <list-item v-for="item in dataResource" :messagetitle="item.BXQY_DISPLAY+item.BXDD_DISPLAY" :iswork="iswork" :info="item.MS" :timezone="item.BXSJ" :img="item.TP" :tag="item.tag" :all="item"></list-item>
  </mt-loadmore>
  <div v-show="dataResource.length < 1" class="search-empty">
    <div>
      <img src="../images/icn_nodata.png" width="100" height="100" style="display: block;">
      暂无相关数据
    </div>
  </div>
</template>

<script>
import ListItem from '../components/listItem.vue';
import api from '../api.js';
import { Loadmore } from 'bh-mint-ui';
export default {
  data() {
    return {
      dataResource: [],
      page: 1,
      allLoaded: false
    }
  },
  methods: {
    loadBottom(id) {
        this.page = this.page + 1;
        if(iswork) {
          api.loadRepairData.call(this,1);
        }else {
          api.loadData.call(this, 'DWX', this.page);
        }
        this.$broadcast('onBottomLoaded', id)
    }
  },
  created() {
    var work = this.$route.params.iswork;
    if(work != 'worker') {
      this.iswork = false;
      api.loadData.call(this, 'DWX', 1);
    } else {
      this.iswork = true;
      api.loadRepairData.call(this,1);
    }
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
.search-empty {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
