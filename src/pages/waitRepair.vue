<template>
  <div>
      <div v-if="dataResource.length>0">
    <mt-loadmore v-show="dataResource.length > 0" class="mt-loadmore-div" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false">
      <list-item v-for="item in dataResource" :key="item.WID" :messagetitle="item.BXQY_DISPLAY+item.BXDD_DISPLAY+item.XXDD" :iswork="iswork" :info="item.MS" :timezone="item.BXSJ" :img="item.TP" :tag="item.tag" :all="item"></list-item>
    </mt-loadmore>
  </div>
  <div v-if="dataResource.length===0 && loading===true" class="no-data">
    <img src="../components/img/no_data.png">
    <span>还没有报修订单呢</span>
  </div>
  </div>
  
</template>
<script>
import ListItem from '../components/listItem.vue';
import api from '../api.js';
import {
  Loadmore
} from 'bh-mint-ui2';
export default {
  data() {
      return {
        dataResource: [],
        page: 1,
        isshow: false,
        loading: false,
        allLoaded: false
      }
    },
    watch: {
      dataResource: function(val) {
        if (val.length < 1) {
          this.isshow = true;
        } else {
          this.isshow = false;
        }
      }
    },
    methods: {
      loadBottom(id) {
        this.page = this.page + 1;
        if (iswork) {
          api.loadRepairData.call(this, 1);
        } else {
          api.loadData.call(this, 'DWX', this.page);
        }
        this.$broadcast('onBottomLoaded', id)
      }
    },
    created() {
      //debugger
      if (document.querySelector('.nav-header')) {
        document.querySelector('.nav-header').style="display:block;";
      }
      if (document.querySelector('.post')) {
        document.querySelector('.post').style="display:block;";
      }
      var work = this.$route.params.iswork;
      if (work != 'worker') {
        this.iswork = false;
        api.loadData.call(this, 'DWX', 1);
      } else {
        this.iswork = true;
        api.loadRepairData.call(this, 1);
        var config = {
          left: {
            left1: {
              title: '',
              callFunction: function() {
                BH_MIXIN_SDK.closeWebView();
              }
            }
          }
        };
        BH_MIXIN_SDK.setNavHeader(config);
        BH_MIXIN_SDK.setTitleText('待维修');
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

.search-empty {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  align-items: center;
  justify-content: center;
}

.no-data {
  background-color: #fff;
  display: flex;
  width: 100vw;
  height: 100vh;
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
