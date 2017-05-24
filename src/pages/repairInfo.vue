<template>
  <cp-header></cp-header>
  <div class="detail">
    <div v-if="tps.length">
      <mt-swipe :auto="200000" class="swipe-view">
        <mt-swipe-item v-for="item in tps">
          <div class="swipe-view-item" @click="previewImage($index)" :style="{backgroundImage: 'url(' + imgurl + item.fileUrl + ')'}">
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="info">
      <div class="message-title">{{title}}</div>
      <div class="message-location">
        <i class="iconfont icon-locationon"></i>
        <span>{{bxlocation}}</span>
      </div>
      <div class="message-data">
        <i class="iconfont icon-event"></i>
        <span>{{timezone}}</span>
      </div>
      <div v-show="!iswork">
        <div class="line-top"></div>
        <div class="progress">
          <div class="progress-title">报修进度</div>
          <process :status.sync='status' :visible.sync="popupVisible" :grade.sync="state.showgrade" :data.sync='processdata'></process>
        </div>
      </div>
      <div v-show="iswork">
        <div class="title">报修人信息</div>
        <div class="repair-info">
          <div class="name">
            <span>{{bxuser}}</span>
            <span>{{bxuserid}}</span>
          </div>
          <div class="phone">
            <i class="iconfont icon-call"></i>
            <a href="tel:{{bxuserphone}}">{{bxuserphone}}</a>
          </div>
        </div>
        <mt-button type="primary" class="comment-button" @click="doComplete">完工</mt-button>
      </div>
      <mt-popup :visible.sync="popupVisible" position="bottom">
        <div class="pop-container">
          <grade v-show="state.showgrade" :wid="wid"></grade>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<script>
import {
  Header,
  Button,
  Swipe,
  SwipeItem,
  Cell,
  Toast,
  Popup
} from 'bh-mint-ui';
import cpHeader from '../components/cpHeader.vue';
import grade from '../components/grade.vue';
import process from '../components/process.vue';
import tips from '../components/tips.vue';
import utils from '../utils.js';

function changeState(starr) {
  for (var i in this) {
    if (starr.indexOf(i) > -1) {
      this[i] = true;
    } else {
      this[i] = false;
    }
  }
}
export default {
  filters: {
    fixtime: utils.fixTime
  },
  data() {
    return {
      imgurl: global.IMGHOST,
      popupVisible: false,
      iswork: false,
      title: '',
      timezone: '',
      bxuser: '',
      bxuserid: '',
      bxuserphone: '',
      bxlocation: '',
      bxadminrply: '',
      bxcomment: '',
      bxcommentpoints: '',
      wxperson: {
        name: '',
        phone: ''
      },
      wid: '',
      sugg: '',
      status: '',
      tps: false,
      state: {
        adminreply: false,
        showgrade: false,
        worker: false,
        commentbutton: false,
        adminreplytips: false,
      },
      processdata: {}

    }
  },
  ready(){
    var config = {
      left: {
        left1: {
          title: '',
          callFunction: function() {
            history.back();
          }
        }
      }
    };
    BH_MIXIN_SDK.setNavHeader(config);
    BH_MIXIN_SDK.setTitleText('报修详情');
  },
  created() {
    let data = JSON.parse(this.$route.params.info);
    this.iswork = data.iswork;
    this.wid = data.wid;
    let url = global.HOST + '/sys/hqwxxt/api/getDetailInfo.do'
    this.$http.get(url, {
      params: {
        wid: this.wid
      }
    }).then((response) => {
      var info = response.data.data;
      if (response.data.code === 200) {
        this.title = info.MS;
        this.timezone = info.BXSJ;
        this.bxuser = info.BXRXM;
        this.bxuserid = info.BXRGH;
        this.bxuserphone = info.BXRSJ;
        this.bxlocation = info.BXQY + info.BXDD + info.XXDD; //TODO
        this.bxadminrply = info.BHYJ; // 报修意见
        this.bxcomment = info.BXRPJ;
        this.bxcommentpoints = info.PF;
        this.wxperson.name = info.WXRXM;
        this.wxperson.phone = info.WXRSJ;
        this.status = info.ZT;
        if (info.TP) {
          let url = global.HOST + "/sys/emapcomponent/file/getUploadedAttachment/" + info.TP + ".do";
          this.$http.get(url).then((response) => {
            this.tps = response.data.items;
          }).catch((err) => {
            Toast('获取图片错误');
          })
        }
        switch (info.ZT) {
          case 'DWX':
            changeState.apply(this.state, [
              ['worker']
            ]);
            break;
          case 'YWX':
            changeState.apply(this.state, [
              ['worker', 'commentbutton']
            ]);
            break;
          case 'YBH':
            changeState.apply(this.state, [
              ['adminreply', 'commentbutton']
            ]);
            break;
          case 'YPJ':
            if (this.bxadminrply) {
              changeState.apply(this.state, [
                ['adminreply', 'adminreplytips']
              ]);
            } else {
              changeState.apply(this.state, [
                ['worker', 'adminreplytips']
              ]);
            }
            break;
          default:
            break;
        }
        this.processdata = {
          BXSJ: info.BXSJ,
          SLSJ: info.SLSJ,
          WXSJ: info.WXSJ,
          PJSJ: info.PJSJ,
          WXRXM: info.WXRXM,
          WXRSJ: info.WXRSJ,
          BXRXM: info.BXRXM,
          SLRXM: info.SLRXM,
          BHYJ: info.BHYJ,
          PF: info.PF,
          BXRPJ: info.BXRPJ,
          WXRSJ: info.WXRSJ,
          BHYJ: info.BHYJ
        }
      } else {
        Toast('获取信息失败，请稍后再试')
      }
    })

  },
  methods: {
    doComplete: function() {
      this.$http.post(global.HOST + "/sys/hqwxxt/api/finishRepair.do", {
        WID: this.wid
      }).then(function(data) {
        Toast('已完工');
        this.$router.go({
          name: 'waitRepair',
          params: {
            iswork: 'worker'
          }
        });
      }, function(err) {
        Toast('提交失败');
      });
    },
    doComment: function() {
      this.popupVisible = true;
      this.state.showgrade = true;
    },
    submit() {
      this.popupVisible = false;
    },
    previewImage(index) {
      var preImg = [];
      let img = this.tps.map((item) => {
        return global.IMGHOST + item.fileUrl;
      })
      for (let i = 0; i < img.length; i++) {
        let obj = {
          url: img[i]
        }
        preImg.push(obj)
      }
      BH_MIXIN_SDK.preViewImages(preImg, index);
    }
  },
  events: {
    'grade-close': function(notify) {
      this.state.showgrade = notify;
    }
  },
  components: {
    [Header.name]: Header,
    [Button.name]: Button,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    grade,
    process,
    tips,
    cpHeader
  }
}
</script>
<style scoped>
#repair-mt-header {
  background-color: #fff;
  color: #000000;
}

.detail {
  width: 100%;
  & .swipe-view {
    height: 400px;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    & .swipe-view-item {
      height: 400px;
      width: 100%;
      overflow: hidden;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
  }
  & .info {
    background-color: #fff;
    & .message-title {
      color: #403F44;
      font-size: 32px;
      padding: 30px 30px 30px 0;
      margin-left: 30px;
      word-break: break-all;
      border-bottom: 1Px solid #E8E8E8;
    }
    & .message-location {
      padding-top: 20px;
      font-size: 26px;
      background-color: #fff;
      line-height: 50px;
      padding-left: 30px;
      padding-right: 30px;
      display: flex;
      & i {
        color: #06c1ae;
        margin-right: 20px;
        flex: 0 0 auto;
      }
      & span {
        word-break: break-all;
      }
    }
    & .message-data {
      padding-bottom: 20px;
      background-color: #fff;
      font-size: 26px;
      line-height: 50px;
      padding-left: 30px;
      & i {
        color: #06c1ae;
        margin-right: 20px;
      }
      & span {
        position: relative;
        right: 8px;
      }
    }
  }
}


/*TODO*/

.main {
  width: 100%;
  background-color: #fff;
  & .info {}
  & .user-info {
    width: 100%;
    margin-top: 20px;
    height: 70px;
    line-height: 50px;
    color: #B4B4B4;
    & span,
    & div {
      display: inline-block;
    }
    & .avatar-name {
      float: left;
      margin-left: 20px;
      & .avatar {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 25px;
      }
    }
    & .time-zone {
      float: right;
      margin-right: 20px;
    }
  }
  & .location-phone {
    width: 100%;
    /*height: 200px;*/
    margin-top: 20px;
    color: #403F44;
    font-size: 28px;
    background-color: #fff;
    & .phone {
      & span {
        display: block;
        height: 100px;
        line-height: 100px;
        margin-left: 20px;
      }
      height: 100px;
      line-height: 100px;
      border-bottom: 1px solid #E8E9EC;
      & .icon-call {
        margin-right: 10px;
        font-family: "iconfont" !important;
        color: #FF8605;
        font-size: 32px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
      }
    }
    & .location {
      & span {
        display: block;
        line-height: 1.2;
        margin-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      & .icon-locationon {
        margin-right: 10px;
        font-family: "iconfont" !important;
        color: #FF8605;
        font-size: 32px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
      }
    }
  }
  & .admin-reply {
    background-color: #fff;
    width: 100%;
    color: #403F44;
    font-size: 20px;
    padding: 20px 20px;
    margin-top: 20px;
    & span {
      display: block;
      margin-top: 10px;
    }
    & .comment-tips {
      margin-top: 30px;
    }
  }
  & .maintenance-worker {
    background-color: #fff;
    font-size: 26px;
    line-height: 80px;
    & .worker-info {
      padding-left: 30px;
    }
    & .label {
      color: #92969c;
    }
    & .name {
      margin-right: 16px;
      margin-left: 16px;
    }
    & a {
      text-decoration: none;
      color: #06c1ae;
    }
  }
}

.line-top {
  height: 40px;
  background-color: #f9f9f9;
  border-top: 1Px solid #E8E8E8;
  border-bottom: 1Px solid #E8E8E8;
}

.pop-container {
  height: 540px;
  width: 100vw;
  margin: 0 30px;
  position: relative;
  & .star {
    height: 40px;
  }
  & textarea {
    outline: none;
    resize: none;
    width: 100%;
    font-size: 24px;
    border: 0;
  }
  & .number {
    position: absolute;
    right: 30px;
  }
  & .submit {
    width: calc(100% - 60px);
    position: absolute;
    bottom: 30px;
    left: 30px;
  }
}

.title {
  height: 77px;
  line-height: 77px;
  padding-left: 30px;
  background-color: #f9f9f9;
  color: #92969C;
  font-size: 28px;
}

.repair-info {
  background-color: #fff;
  padding-left: 30px;
  & .name {
    height: 100px;
    line-height: 100px;
    background-color: #fff;
    font-size: 28px;
    border-bottom: 1Px solid #E8E8E8;
    & span {
      margin-right: 16px;
    }
  }
  & .phone {
    height: 100px;
    line-height: 100px;
    background-color: #fff;
    border-bottom: 1Px solid #e8e8e8;
    color: #06C1AE;
    font-size: 28px;
    & i {
      margin-right: 33px;
    }
    & a {
      text-decoration: none;
      color: #06C1AE;
    }
  }
}

.progress {
  background-color: #fff;
  border-bottom: 1px solid #E8E8E8;
  & .progress-title {
    font-size: 28px;
    height: 80px;
    line-height: 80px;
    margin-left: 30px;
    border-bottom: 1Px solid #E8E8E8;
  }
}

.comment-button {
  width: calc(100% - 60px);
  margin-left: 30px;
  margin-right: 30px;
  top: 20px;
  border-radius: 10px;
}
</style>
<style>
body {
  background-color: #f9f9f9;
}
</style>
