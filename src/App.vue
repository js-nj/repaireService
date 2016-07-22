<template>
  <mt-header fixed title="我的保修" id="repair-mt-header">
    <mt-button v-link="'/'" icon="back" slot="left"></mt-button>
  </mt-header>
  <div class="nav-header">
    <div class="repair-state">
      <a class="repair-state-item" v-bind:class="{ 'item-selected': repairState.waitProcess }" v-on:click="chooseProcess('waitProcess')">
        <div>
          待处理
        </div> 
        <span v-bind:class="{ 'item-tips': (!repairState.waitProcess)&&unreadNum.waitProcess }">{{unreadNum.waitProcess?unreadNum.waitProcess:''}}</span>
      </a> 
      <a class="repair-state-item" v-bind:class="{ 'item-selected': repairState.waitRepair }" v-on:click="chooseProcess('waitRepair')">
        <div>
          待维修
        </div> 
        <span v-bind:class="{ 'item-tips': (!repairState.waitRepair)&&unreadNum.waitRepair }">{{unreadNum.waitRepair?unreadNum.waitRepair:''}}</span>
      </a> 
      <a class="repair-state-item" v-bind:class="{ 'item-selected': repairState.repaired }" v-on:click="chooseProcess('repaired')">
        <div>
          已维修
        </div>
        <span v-bind:class="{ 'item-tips': (!repairState.repaired)&&unreadNum.repaired }">{{unreadNum.repaired?unreadNum.repaired:''}}</span>
      </a> 
      <a class="repair-state-item" v-bind:class="{ 'item-selected': repairState.rejected }" v-on:click="chooseProcess('rejected')">
        <div>
          已驳回
        </div>
        <span v-bind:class="{ 'item-tips': (!repairState.rejected)&&unreadNum.rejected }">{{unreadNum.rejected?unreadNum.rejected:''}}</span>
      </a> 
      <a class="repair-state-item" v-bind:class="{ 'item-selected': repairState.commented }" v-on:click="chooseProcess('commented')">
        <div>
          已评价
        </div>
        <span v-bind:class="{ 'item-tips': (!repairState.commented)&&unreadNum.commented }">{{unreadNum.commented?unreadNum.commented:''}}</span>
      </a> 
    </div>
  </div>
  <div class="main">
    <div id="app">
      <router-view></router-view>
    </div>
    <button class="post" v-on:click="post">
      H
    </button>
  </div>
</template>

<script>
import { Header, Button } from 'bh-mint-ui';

function changeState(models, readNumModels, el) {
    models[el] = true;
    readNumModels[el] = 0;
    for(var i in models) {
      if(i != el) {
        models[i] = false;
      }
    }
}
function loadView(el) {
  this.$router.go(el);
}
export default {
  data () {
    return {
      repairState: {
        waitProcess: true,
        waitRepair: false,
        repaired: false,
        rejected: false,
        commented: false
      },
      unreadNum: {
        waitProcess: 0,
        waitRepair: 10,
        repaired: 10,
        rejected: 10,
        commented: 10
      }
    }
  },
  components: {
    [Header.name]:Header,
    [Button.name]:Button
  },
  methods: {
    chooseProcess: function(elName) {
      loadView.call(this,elName);
      changeState(this.repairState, this.unreadNum, elName);
    },
    post: function() {
      this.$router.go('post');
    }
  }
}
</script>

<style scoped>
#repair-mt-header {
  background-color: #fff;
  color: #000000;
  /*height: 120px;*/
}
.nav-header {
  margin-top: 65px;
  height: 60px;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 1;
  & .repair-state {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    height: 60px;
    line-height: 60px;
    background-color: #F5F5F5;
    & .repair-state-item {
      font-size: 26px;
      display: block;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      color: #0A1A22;
      background-color: transparent;
      -webkit-text-decoration-skip: objects;
      text-decoration: none;
      & .item-tips {
        width: 25px;
        height: 25px;
        border-radius: 12.5px;
        background-color: #F86262;
        float: right;
        font-size: 15px;
        margin-top: -54px;
        /*& span {*/
          line-height: 25px;
          /*height: 25px;*/
          /*font-size: 10px;*/
          color: #fff;
          display: block;
        /*}*/
      }
    }
    & .item-selected {
      color: #2196F3
    }
  }
}
.main {
  /*height: 960px;*/
  margin-top: 125px;
}
.post {
    position: fixed;
    background: #16162A;
    height: 80px;
    width: 80px;
    border: none;
    color: #fff;
    border-radius: 40px;
    top: 900px;
    right: 50px;
}
</style>
