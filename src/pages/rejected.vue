<template>
  <div>
    <mt-loadmore class="mt-loadmore-div" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false">
      <list-item v-for="item in dataResource" :messagetitle="item.BXQY_DISPLAY+item.BXDD_DISPLAY" :info="item.MS" :timezone="item.BXSJ" img="http://f.named.cn/f/2fafab7df89d79ff2f5ca1f1e1c379ca.t720x541.jpg" :tag="item.tag" :all="item"></list-item>
    </mt-loadmore>
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
      pagenum: 1
    }
  },
  methods: {
    loadBottom(id) {
        this.page = this.page + 1;
        api.loadData.call(this, 'YBH', this.page);
        this.$broadcast('onBottomLoaded', id)
    }
  },
  created() {
    api.loadData.call(this, 'YBH', 1);

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
</style>
