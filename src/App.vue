<template>
  <div class="nav-header" v-if="isstudent">
    <div class="repair-state">
      <a class="repair-state-item" :class="{ 'item-selected': repairState.waitProcess }" @click="chooseProcess('waitProcess')">
        <div>待处理</div>
      </a>
      <a class="repair-state-item" :class="{ 'item-selected': repairState.waitRepair }" @click="chooseProcess('waitRepair')">
        <div>维修中</div>
      </a>
      <a class="repair-state-item" :class="{ 'item-selected': repairState.repaired }" @click="chooseProcess('repaired')">
        <div>已维修</div>
        <span :class="{ 'item-tips': unreadNum.repaired }">{{unreadNum.repaired?unreadNum.repaired:''}}</span>
      </a>
      <a class="repair-state-item" :class="{ 'item-selected': repairState.rejected }" @click="chooseProcess('rejected')">
        <div>已退回</div>
      </a>
      <a class="repair-state-item" :class="{ 'item-selected': repairState.commented }" @click="chooseProcess('commented')">
        <div>已评价</div>
      </a>
    </div>
  </div>
  <div class="main" :class="{'mainstudent': isstudent}">
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
  <i class="post iconfont icon-jiahao01" v-if="isstudent" @click="post"></i>
</template>
<script>
import {
  Header,
  Button
} from 'bh-mint-ui';
import api from './api.js';
import SDK from 'bh-mobile-sdk';

function changeState(models, readNumModels, el) {
  models[el] = true;
  for (var i in models) {
    if (i != el) {
      models[i] = false;
    }
  }
}

function loadView(el) {
  if (el == 'waitRepair') {
    this.$router.go({
      name: 'waitRepair',
      params: {
        iswork: 'student'
      }
    });
  } else {
    this.$router.go('/' + el);
  }
}
export default {
  created() {
      //get userInfo
      let url = global.HOST + '/sys/itservicecommon/api/getUserDetails.do';
      this.$http.get(url).then((response)=>{
        this.userPhone = response.data.phone;
      })
      this.$http.get(global.HOST + "/sys/itservicecommon/api/getUserLimit.do?appName=hqwxxt").then(function(data) {
        //mock
        var data = {
          data:[{
            GNBS:'teacher_student'
          }]
        };
        if (data.data[0] && data.data[0].GNBS == "teacher_student" || data.data.length == 2) {
          this.isstudent = true;
          api.loadData.call(this, 'YWX', 1, 'home');
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
          BH_MIXIN_SDK.setTitleText('我的报修')
          this.index = localStorage.getItem('indexData') || "waitProcess";

          changeState(this.repairState, this.unreadNum, this.index)
          loadView.call(this, this.index);
        }
        if (data.data.length == 1 && data.data[0] && data.data[0].GNBS == "repairman") {
          this.isstudent = false;
          BH_MIXIN_SDK.setTitleText('待维修')
          this.$router.go({
            name: 'waitRepair',
            params: {
              iswork: 'worker'
            }
          });
        }
      }, function(err) {
        Toast('获取权限错误');
      });
    },
    data() {
      return {
        index: '',
        state: '',
        userPhone:'',
        isstudent: false,
        headertitle: '',
        repairState: {
          waitProcess: false,
          waitRepair: false,
          repaired: false,
          rejected: false,
          commented: false
        },
        unreadNum: {
          repaired: ''
        }
      }
    },
    components: {
      [Header.name]: Header,
      [Button.name]: Button
    },
    methods: {
      chooseProcess: function(elName) {
        localStorage.setItem('indexData', elName);
        loadView.call(this, elName);
        changeState(this.repairState, this.unreadNum, elName);
      },
      post: function() {
        this.$router.go({
          name: 'post',
          query:{
            userPhone:this.userPhone
          }
        });
      }
    }
}
</script>
<style scoped>
#repair-mt-header {
  background-color: #fff;
  color: #000000;
}

.nav-header {
  height: 88px;
  & .repair-state {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    height: 88px;
    line-height: 88px;
    background-color: #fff;
    border-bottom: 1Px solid #eaeaea;
    & .repair-state-item {
      font-size: 28px;
      display: block;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      -webkit-text-decoration-skip: objects;
      text-decoration: none;
      position: relative;
      & .item-tips {
        position: absolute;
        right: 0;
        bottom: 50px;
        min-width: 25px;
        height: 25px;
        border-radius: 12.5px;
        background-color: #FF571A;
        font-size: 15px;
        margin-top: -54px;
        line-height: 25px;
        color: #fff;
        display: block;
      }
    }
    & .item-selected div {
      color: #06c1ae;
      &:after {
        content: '';
        background-color: #06C1AE;
        height: 1Px;
        width: 60%;
        position: absolute;
        bottom: 0;
        left: 20%;
      }
    }
  }
}

.main {
  height: calc(100vh - 88px);
  width: 100vw;
  overflow: auto;
  -webkit-overflow-scrolling : touch;
  background-color: #fff;
}

.post {
  position: fixed;
  background: #06c1ae;
  height: 80px;
  width: 80px;
  border: none;
  color: #fff;
  text-align: center;
  line-height: 80px;
  border-radius: 40px;
  bottom: 100px;
  right: 50px;
  font-family: "iconfont" !important;
  color: #E8E9EC;
  font-size: 40px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

</style>
