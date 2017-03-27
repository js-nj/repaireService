<template>
  <div class="main">
    <div class="title-user-img">
      <mt-swipe :auto="4000" class="swipe-view" v-if="tps">
        <mt-swipe-item class="swipe-view-item" v-for="item in tps">
          <img class="swipe-view-item" :src="imgurl+item.fileUrl" @click="previewImage($index)">
        </mt-swipe-item>
      </mt-swipe>
      <div class="message-title">{{title}}</div>
      <div class="message-location">
        <i class="iconfont icon-locationon"></i>
        <span>方山校区</span>
      </div>
      <div class="message-data">
        <i class="iconfont icon-event"></i>
        <span>2017-09-12</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="progress">
      <div class="progress-title">报修进度</div>
      <div class="repair-progress">
        <div class="left">
          <div>12:01</div>
          <div>2016.09.09</div>
        </div>
        <span class="middle-icon">
          <i class="iconMobile icon-correct"></i>
        </span>
        <div class="right">
          <div>
            <span>已指派维修人员</span>
            <span class="btn" v-if="$index===0">
            <span @click ="popupVisible = true">去评价</span>
            </span>
          </div>
          <div>王秋色指派任务给皆允斌</div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>12:01</div>
          <div>2016.09.09</div>
        </div>
        <span class="middle-icon-yellow">
          <i class="iconMobile icon-loading"></i>
        </span>
        <div class="right">
          <div>
            <span>已指派维修人员</span>
            <span class="btn" v-if="$index===0">
            <span @click ="popupVisible = true">去评价</span>
            </span>
          </div>
          <div>王秋色指派任务给皆允斌</div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>12:01</div>
          <div>2016.09.09</div>
        </div>
        <span class="middle-icon-error">
          <i class="iconMobile icon-error"></i>
        </span>
        <div class="right">
          <div>
            <span>已指派维修人员</span>
            <span class="btn" v-if="$index===0">
            <span @click ="popupVisible = true">去评价</span>
            </span>
          </div>
          <div>王秋色指派任务给皆允斌</div>
        </div>
      </div>
    </div>
    <div class="admin-reply" v-show="state.adminreply">
      <span>管理员回复:</span>
      <span>{{bxadminrply}}</span>
      <tips class="comment-tips" v-show="state.adminreplytips" :bxcomment="bxcomment" :bxcommentpoints="bxcommentpoints"></tips>
    </div>
    <mt-cell class="maintenance-worker" v-show="state.worker && !iswork" title="派出维修人员" is-link href="tel:{{wxpersonphone}}">
      <a href="tel:{{wxpersonphone}}">{{wxperson}}</a>
    </mt-cell>
    <tips class="comment-tips" v-show="state.worker&&state.adminreplytips" :bxcomment="bxcomment" :bxcommentpoints="bxcommentpoints"></tips>
    <mt-button type="primary" class="comment-button" v-show="state.commentbutton" @click="doComment">评价本次报修</mt-button>
    <mt-button type="primary" class="comment-button" v-show="iswork" @click="doComplete">完工</mt-button>
  </div>
  <!-- <grade v-show="state.showgrade" :wid="wid"></grade> -->
  <mt-popup :visible.sync="popupVisible" position="bottom">
    <div class="pop-container">
      <div class="star">
        <span v-for="1 in 5"><i class="iconfont icon-wujiaoxing1"></i></span>
      </div>
      <textarea v-model.trim()="sugg" rows="7" placeholder="填写你对此次维修服务的感受..."></textarea>
      <span class="number">{{sugg.length}}/100</span>
      <mt-button type="primary" class="submit" @click="submit">提交</mt-button>
    </div>
  </mt-popup>
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
import grade from '../components/grade.vue';
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
      title: '',
      timezone: '',
      bxuser: '',
      bxuserid: '',
      bxuserphone: '',
      bxlocation: '',
      bxadminrply: '',
      bxcomment: '',
      bxcommentpoints: '',
      wxperson: '',
      wid: '',
      sugg: '',
      tps: false,
      state: {
        adminreply: false,
        showgrade: false,
        worker: false,
        commentbutton: false,
        adminreplytips: false,
      }

    }
  },
  created() {
    var _self = this;
    var info = JSON.parse(this.$route.params.info);
    this.iswork = info.iswork;
    this.title = info.MS;
    this.timezone = info.BXSJ;
    this.bxuser = info.BXRXM;
    this.bxuserid = info.BXRGH;
    this.bxuserphone = info.BXRSJ;
    this.bxlocation = info.BXQY_DISPLAY + info.BXDD_DISPLAY + info.XXDD;
    this.bxadminrply = info.BHYJ;
    this.bxcomment = info.BXRPJ;
    this.bxcommentpoints = info.PF;
    this.wxperson = info.WXR_DISPLAY + ' (' + info.WXRSJ + ')';
    this.wxpersonphone = info.WXRSJ;
    this.wid = info.WID;
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
        Toast('失败');
      });
    },
    doComment: function() {
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
      BH_MOBILE_SDK.UI.preViewImages(preImg, index);
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
    tips
  }
}
</script>
<style scoped>
#repair-mt-header {
  background-color: #fff;
  color: #000000;
}

.main {
  & .title-user-img {
    width: 100%;
    background-color: #fff;
    & .swipe-view {
      height: 400px;
      width: 100%;
      color: #fff;
      font-size: 30px;
      text-align: center;
      vertical-align: middle;
      & .swipe-view-item {
        height: 400px;
        width: 100%;
      }
    }
    & .message-title {
      color: #403F44;
      font-size: 32px;
      padding: 30px;
      word-break: break-all;
    }
    & .message-location {
      font-size: 26px;
      line-height: 50px;
      padding-left: 30px;
      & i {
        color: #06c1ae;
        margin-right: 20px;
      }
    }
    & .message-data {
      font-size: 26px;
      line-height: 50px;
      padding-left: 30px;
      & i {
        color: #06c1ae;
        margin-right: 20px;
      }
    }
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
    margin-top: 20px;
    & a:hover,
    & a:visited,
    & a:link,
    & a:active {
      text-decoration: none;
      color: #B4B4B4;
    }
  }
  & .comment-button {
    width: 100%;
    top: 20px;
    height: 100px;
    border-radius: 0;
  }
}

.line {
  height: 30px;
  background-color: #f9f9f9;
  border-top: 1Px solid #efefef;
  border-bottom: 1Px solid #efefef;
}

.progress {
  background-color: #fff;
  & .progress-title {
    font-size: 28px;
    height: 80px;
    line-height: 80px;
    margin-left: 30px;
    border-bottom: 1Px solid #E8E8E8;
  }
  & .repair-progress {
    padding: 30px;
    display: flex;
    align-items: center;
    height: 200px;
    & .left {
      margin-left: 20px;
      text-align: right;
      font-size: 26px;
      color: #BDC0C5;
    }
    & .middle-icon {
      display: inline-block;
      margin-left: 20px;
      margin-right: 20px;
      background-color: #06c1ae;
      width: 24Px;
      height: 24Px;
      overflow: hidden;
      border-radius: 50%;
      & i {
        font-size: 40px;
        position: relative;
        color: #fff;
        /* &:after {
          position: absolute;
          height: 166px;
          left: 10Px;
          right: 10Px;
          top: 21Px;
          background: #E8E8E8;
          content: ''
        }*/
      }
    }
    & .middle-icon-yellow {
      display: inline-block;
      margin-left: 20px;
      margin-right: 20px;
      background-color: #ffb200;
      width: 24Px;
      height: 24Px;
      overflow: hidden;
      border-radius: 50%;
      & i {
        font-size: 35px;
        position: relative;
        color: #fff;
        top: 2px;
        left: 2px;
        /* &:after {
          position: absolute;
          height: 166px;
          left: 10Px;
          right: 10Px;
          top: 21Px;
          background: #E8E8E8;
          content: ''
        }*/
      }
    }
    & .middle-icon-error{
      display: inline-block;
      margin-left: 20px;
      margin-right: 20px;
      background-color: #ff571a;
      width: 24Px;
      height: 24Px;
      overflow: hidden;
      border-radius: 50%;
      & i {
        font-size: 35px;
        position: relative;
        color: #fff;
        top: 2px;
        left: 2px;
        /* &:after {
          position: absolute;
          height: 166px;
          left: 10Px;
          right: 10Px;
          top: 21Px;
          background: #E8E8E8;
          content: ''
        }*/
      }
    }
    & .right {
      font-size: 26px;
      color: #BDC0C5;
      & div {
        word-break: break-all;
      }
      & .btn {
        color: #06C1AE;
        font-size: 22px;
        & span {
          border-radius: 12Px;
          padding: 4px 12px 6px 12px;
          display: inline-block;
          border: 1px solid #BAFFF6;
        }
      }
    }
  }
}

.repair-user {
  padding-left: 30px;
  padding-right: 30px;
}

.pop-container {
  height: 500px;
  width: 100vw;
  padding: 30px;
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

.maintenance-worker:hover,
.maintenance-worker:visited,
.maintenance-worker:link,
.maintenance-worker:active {
  text-decoration: none!important;
}
</style>
