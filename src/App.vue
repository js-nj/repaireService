<template>
  <mt-header fixed :title="headertitle" id="repair-mt-header">
    <mt-button @click="goManager" icon="back" slot="left"></mt-button>
  </mt-header>
  <div class="nav-header" v-if="isstudent">
    <div class="repair-state">
      <a class="repair-state-item" v-bind:class="{ 'item-selected': repairState.waitProcess }" v-on:click="chooseProcess('waitProcess')">
        <div>
          待处理
        </div>
        <!-- <span v-bind:class="{ 'item-tips': (!repairState.waitProcess)&&unreadNum.waitProcess }">{{unreadNum.waitProcess?unreadNum.waitProcess:''}}</span> -->
      </a>
      <a class="repair-state-item" v-bind:class="{ 'item-selected': repairState.waitRepair }" v-on:click="chooseProcess('waitRepair')">
        <div>
          待维修
        </div>
        <!-- <span v-bind:class="{ 'item-tips': (!repairState.waitRepair)&&unreadNum.waitRepair }">{{unreadNum.waitRepair?unreadNum.waitRepair:''}}</span> -->
      </a>
      <a class="repair-state-item" v-bind:class="{ 'item-selected': repairState.repaired }" v-on:click="chooseProcess('repaired')">
        <div>
          已维修
        </div>
        <!-- <span v-bind:class="{ 'item-tips': (!repairState.repaired)&&unreadNum.repaired }">{{unreadNum.repaired?unreadNum.repaired:''}}</span> -->
        <span v-bind:class="{ 'item-tips': unreadNum.repaired }">{{unreadNum.repaired?unreadNum.repaired:''}}</span>
      </a>
      <a class="repair-state-item" v-bind:class="{ 'item-selected': repairState.rejected }" v-on:click="chooseProcess('rejected')">
        <div>
          已驳回
        </div>
        <!-- <span v-bind:class="{ 'item-tips': (!repairState.rejected)&&unreadNum.rejected }">{{unreadNum.rejected?unreadNum.rejected:''}}</span> -->
      </a>
      <a class="repair-state-item" v-bind:class="{ 'item-selected': repairState.commented }" v-on:click="chooseProcess('commented')">
        <div>
          已评价
        </div>
        <!-- <span v-bind:class="{ 'item-tips': (!repairState.commented)&&unreadNum.commented }">{{unreadNum.commented?unreadNum.commented:''}}</span> -->
      </a>
    </div>
  </div>
  <div class="main" v-bind:class="{'mainstudent': isstudent}">
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
  <i class="icon-bordercolor" v-if="isstudent" v-on:click="post"></i>
</template>

<script>
import { Header, Button } from 'bh-mint-ui';
import api from './api.js';

function changeState(models, readNumModels, el) {
    models[el] = true;
    // readNumModels[el] = 0;
    for(var i in models) {
      if(i != el) {
        models[i] = false;
      }
    }
}
function loadView(el) {
  if(el == 'waitRepair') {
    this.$router.go({name:'waitRepair', params: {iswork:'student'}});
  } else {
    this.$router.go('/'+el);
  }
}
export default {
  created() {
    var self = this;
    this.$http.get(global.HOST+"/sys/itservicecommon/api/getUserLimit.do?appName=hqwxxt").then(function(data) {
      if(data.data[0] && data.data[0].GNBS == "teacher_student") {
        this.isstudent = true;
        this.headertitle = '我的报修';
        api.loadData.call(this, 'YWX', 1, 'home');
        this.$router.go('/waitProcess');
      }
      if(data.data[0] && data.data[0].GNBS == "repairman") {
        this.isstudent = false;
        this.headertitle = '待维修';
        this.$router.go({name:'waitRepair', params: {iswork:'worker'}});
      }
    }, function(err) {
      Toast('获取权限错误');
    });
  },
  data () {
    return {
      isstudent: false,
      headertitle: '',
      repairState: {
        waitProcess: true,
        waitRepair: false,
        repaired: false,
        rejected: false,
        commented: false
      },
      unreadNum: {
        // waitProcess: 0,
        // waitRepair: 10,
        repaired: ''
        // rejected: 10,
        // commented: 10
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
    },
    goManager() {
      TrunPage.goBack()
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
  margin-top: 40Px;
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
    & .item-selected div {
      color: #2196F3
    }
  }
}
.main {
  /*height: 960px;*/
  margin-top: 40Px;
}
.mainstudent {
  margin-top: 125px;
}
.icon-bordercolor {
  position: fixed;
  background: #2196F3;
  height: 80px;
  width: 80px;
  border: none;
  color: #fff;
  text-align: center;
  line-height: 80px;
  border-radius: 40px;
  /*top: 900px;*/
  bottom: 100px;
  right: 50px;
  font-family:"iconfont" !important;
  color: #E8E9EC;
  font-size:36px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
