<template>
    <div class="appvue">
        <div v-if="isChoose" class="rs-choose-role">
            <!-- <template v-for="item in roleDatas" :key="item.id">
              <mt-button  v-if="item.active == true" @click="goPages(item)" type="primary" class="wi-role-button wi-button wi-button-12" size="large">{{item.text}}</mt-button>
            </template> -->
            <mt-button  v-for="item in roleDatas" :key="item.route" @click="goPages(item)" type="primary" class="wi-role-button wi-button wi-button-12" size="large">{{item.title}}</mt-button>
        </div>
        <div v-else>
            <div v-if="isstudent">
                <cp-header :isstudent="isstudent"></cp-header>
                <div class="nav-header">
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
            </div>
            <div class="main mainstudent">
                <div id="app">
                    <router-view></router-view>
                </div>
            </div>
            <i class="post iconfont icon-jiahao01" v-if="isstudent" @click="post"></i>
        </div>
    </div> 
</template>
<script>
import cpHeader from "./components/cpHeader.vue";
import api from "./api.js";
import { Button,Toast} from "bh-mint-ui2";
function changeState(models, readNumModels, el) {
  models[el] = true;
  for (var i in models) {
    if (i != el) {
      models[i] = false;
    }
  }
}

function loadView(el) {
  if (el == "waitRepair") {
    this.$router.push({
        name: 'waitRepair',
        query: {
            iswork: "student"
        }
    });
  } else {
    this.$router.push({
        name: el,
        query: {}
    });
  }
}
export default {
  
  components: {
    cpHeader,
    [Button.name]:Button,
    [Toast.name]:Toast
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': function(n){
      console.log('路由改变为---')
      console.log(n)
    }
  },
  created() {
    BH_MIXIN_SDK.setTitleText('后勤维修');
    var that = this;
    let url = WEBPACK_CONIFG_HOST + "sys/itservicecommon/api/getUserDetails.do";
    axios({method:'GET',url:url,params:{}}).then(response => {
      window.USERID = response.data.info[0];
      this.userPhone = response.data.phone;
    });
    axios({
      method:'GET',
      url:WEBPACK_CONIFG_HOST + "sys/funauthapp/api/getAppConfig/hqwxxt-4695290815807818.do?GNFW=MOBILE",
      params:{}
    }).then(function(data) {
        if(data.data.MODULES && data.data.MODULES.length>1){
          that.roleDatas = data.data.MODULES;
          that.isChoose = true;
        }else {
          //Toast('角色数组为空数组！');
          if (data.data.MODULES[0] && data.data.MODULES[0].route == "repairman") {
            that.isChoose = false;
            that.isstudent = false;
            BH_MIXIN_SDK.setTitleText("待维修");
            that.$router.push({
              name: "workerIndex",
              params: {}
            });
            
          } else if (data.data.MODULES[0]){
            that.initTeacherStudent();
          } else {
            Toast('获取角色权限为空！');
          }
        }
      },
      function(err) {
        Toast("获取权限错误");
      }
    );
    // axios({
    //   method:'GET',
    //   url:WEBPACK_CONIFG_HOST + "sys/itservicecommon/api/getUserLimit.do?appName=hqwxxt",
    //   params:{}
    // }).then(function(data) {
    //     if(data.data && data.data.length>1){
    //       that.roleDatas = data.data;
    //       that.isChoose = true;
    //     }else {
    //       if (data.data[0] && data.data[0].GNBS == "teacher_student") {
    //         that.initTeacherStudent();
    //       } else if(data.data[0] && data.data[0].GNBS == "repairman") {
    //         that.isChoose = false;
    //         that.isstudent = false;
    //         BH_MIXIN_SDK.setTitleText("待维修");
    //         that.$router.push({
    //           name: "workerIndex",
    //           params: {}
    //         });
    //       }
    //     }
    //   },
    //   function(err) {
    //     Toast("获取权限错误");
    //   }
    // );
  },
  data() {
    return {
      headerConfig: {
        left: {
          left1: {
            title: "",
            callFunction: function() {
              BH_MIXIN_SDK.closeWebView();
            }
          }
        }
      },
      headerTitle: "我的报修",
      showMintHeader: false,
      index: "",
      state: "",
      userPhone: "",
      isChoose:false,
      isstudent: false,
      headertitle: "",
      repairState: {
        waitProcess: false,
        waitRepair: false,
        repaired: false,
        rejected: false,
        commented: false
      },
      unreadNum: {
        repaired: ""
      },
      roleDatas:[]
    };
  },
  methods: {
    initTeacherStudent:function(){
      var that = this;
      that.isChoose = false;
      that.isstudent = true;
      console.log('api.loadData')
      //api.loadData.call(that, "YWX", 1, "home");
      that.loadData('YWX',1,"home");
      var config = {
        left: {
          left1: {
            title: "",
            callFunction: function() {
              BH_MIXIN_SDK.closeWebView();
            }
          }
        }
      };
      // BH_MIXIN_SDK.setNavHeader(config);
      // BH_MIXIN_SDK.setTitleText("我的报修");
      that.index = localStorage.getItem("indexData") || "waitProcess";
      changeState(that.repairState, that.unreadNum, that.index);
      loadView.call(that, that.index);
    },
    chooseProcess: function(elName) {
      localStorage.setItem("indexData", elName);
      loadView.call(this, elName);
      changeState(this.repairState, this.unreadNum, elName);
    },
    post: function() {
      // this.isstudent = false;
      // this.isChoose = false;
      this.$router.push({
        name: "post",
        query: {
          userPhone: this.userPhone
        }
      });
    },
    goPages:function(item){
      if (item.route == 'repairman'){
        this.isstudent = false;
        this.isChoose = false;
        this.$router.push({
          name: 'workerIndex',
          params: {}
        })
      } else {
        this.initTeacherStudent();
      }
    },
    postData: function (url, options, successCallback, errorCallback) {
      axios({
        method:'GET',
        url:url,
        params: options
        }).then(successCallback, errorCallback);
    },
    merge:function() {
      return Array.prototype.concat.apply([], arguments)
    },
    loadData:function(state, num, app) {
      var self = this;
      self.postData(api.getMyRepairsPagination, {
        state: state,
        pageNumber: num,
        pageSize: 10
      }, function(result) {
        self.loading = true;
        if (result.data.datas) {
          var data = result.data.datas.bxsscxwdbxjlbg;
          if (app) {
            self.unreadNum.repaired = data.totalSize;
          } else {
            if (data.rows.length > 0) {
              self.dataResource = self.merge(self.dataResource, data.rows);
            }
            if (data.rows.length < 10) {
              self.allLoaded = true;
            }
          }
        } else {
          self.allLoaded = true;
        }
      }, function(err) {
        Toast('取列表数据失败');
      });
    }
  }
};
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
    border-bottom: 1px solid #eaeaea;
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
        background-color: #ff571a;
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
        content: "";
        background-color: #06c1ae;
        height: 1px;
        width: 60%;
        position: absolute;
        bottom: 0;
        left: 20%;
      }
    }
  }
}

.main {
  height: calc(100vh);
  width: 100vw;
  /* overflow: auto; */
  -webkit-overflow-scrolling: touch;
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
  color: #e8e9ec;
  font-size: 40px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.rs-choose-role {
  position: absolute;
  top:calc(50% - 56px);
  width: 100%;
}
.wi-role-button {
  display:block;width:80%;margin:8px auto;
}
</style>
