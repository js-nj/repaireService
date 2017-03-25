<template>
  <div class="main">
    <div class="title-user-img">
      <mt-swipe :auto="4000" class="swipe-view" v-if="tps">
        <mt-swipe-item class="swipe-view-item" v-for="item in tps">
          <img class="swipe-view-item" v-bind:src="imgurl+item.fileUrl" / @click="previewImage($index)">
        </mt-swipe-item>
      </mt-swipe>
      <div class="message-title">{{ title }}</div>
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
    <div class="repair-progress" v-for="i in 4">
      <div class="left">
        <div>12:01</div>
        <div>2016.09.09</div>
      </div>
      <i class="yellow iconfont icon-shenqingzhuangtaiicon" v-if="$index ===0"></i>
      <i class="progress-icon iconfont icon-chenggong1" v-if="$index>0"></i>
      <div class="right">
        <div>
          <span>已指派维修人员</span>
          <span class="btn" v-if="$index===0">
            <span @click ="comment">去评价</span>
          </span>
        </div>
        <div v-if="$index>0">王秋色指派任务给皆允斌</div>
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
  <grade v-show="state.showgrade" :wid="wid"></grade>
</template>
<script>
import {
  Header,
  Button,
  Swipe,
  SwipeItem,
  Cell,
  Toast
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
    this.tp = info.TP;
    if (this.tp) {
      this.$http.get(global.HOST + "/sys/emapcomponent/file/getUploadedAttachment/" + this.tp + ".do", '').then(function(data) {
        _self.tps = data.data.items;
      }, function(err) {
        Toast('获取图片错误');
      });
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
    comment() {
      alert("======>")
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
}

.repair-progress {
  background-color: #fff;
  padding: 30px;
  display: flex;
  align-items: center;
  height: 200px;
  & .left {
    margin-left: 20px;
    text-align: right;
    font-size: 26px;
  }
  & i {
    margin-left: 30px;
    margin-right: 30px;
    font-size: 40px;
    position: relative;
    &:after {
      position: absolute;
      height: 166px;
      left: 10Px;
      right: 10Px;
      top: 21Px;
      background: #E8E8E8;
      content: ''
    }
  }
  & .yellow {
    color: yellow;
  }
  & .progress-icon {
    color: #06c1ae;
  }
  & .right {
    font-size: 26px;
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

.maintenance-worker:hover,
.maintenance-worker:visited,
.maintenance-worker:link,
.maintenance-worker:active {
  text-decoration: none!important;
}
</style>
