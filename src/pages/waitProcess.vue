<template>
  <div>
      <div v-if="dataResource.length>0">
      <mt-loadmore class="mt-loadmore-div" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false">
        <list-item v-for="item in dataResource" :key="item.WID" :messagetitle="item.BXQY_DISPLAY+item.BXDD_DISPLAY+item.XXDD" :info="item.MS" :timezone="item.BXSJ" :img="item.TP" :tag="item.GZLX_DISPLAY" :all="item"></list-item>
      </mt-loadmore>
    </div>
    <div v-if="dataResource.length===0&&loading===true" class="no-data">
      <img src="../components/img/no_data.png">
      <span>还没有报修订单呢</span>
    </div>
  </div>
</template>
<script>
import ListItem from '../components/listItem.vue';
import api from '../api.js';
import {
  Loadmore,
  Toast
} from 'bh-mint-ui2';
export default {
  data() {
      return {
        dataResource: [],
        page: 1,
        allLoaded: false,
        loading: false,
        Toast: Toast
      }
    },
    methods: {
      loadBottom(id) {
        this.page = this.page + 1;
        api.loadData.call(this, 'DCL', this.page);
        this.$broadcast('onBottomLoaded', id);
      }
    },
    created() {
      //debugger
      api.loadData.call(this, 'DCL', 1);
      if (document.querySelector('.nav-header')) {
        document.querySelector('.nav-header').style="display:block;";
      }
      if (document.querySelector('.post')) {
        document.querySelector('.post').style="display:block;";
      }
    },
    components: {
      ListItem,
      [Loadmore.name]: Loadmore
    }
}
</script>
<style scoped>
.mt-loadmore-div {
  padding-top: 0px;
}

.no-data {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  flex-direction: column;
  align-items: center;
  & img {
    width: 200px;
    margin-top: 240px;
    margin-bottom: 30px;
  }
  & span {
    font-size: 26px;
  }
}
</style>
