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
        <span>{{bxlocation}}</span>
      </div>
      <div class="message-data">
        <i class="iconfont icon-event"></i>
        <span>{{timezone}}</span>
      </div>
    </div>
    <div v-show="!iswork">
      <div class="line-top"></div>
    <!--   <div class="maintenance-worker" v-show="state.worker && !iswork">
        <div class="worker-info">
          <span class="label">维修人员</span>
          <span class="name">{{wxperson.name}}</span>
          <a href="tel:{{wxpersonphone}}">{{wxperson.phone}}</a>
        </div>
        <div class="line-bottom"></div>
      </div> -->
      <div class="progress">
        <div class="progress-title">报修进度</div>
        <process :status.sync ='status' :visible.sync="popupVisible" :grade.sync="state.showgrade"></process>
      </div>
      <mt-button type="primary" class="comment-button" v-show="state.commentbutton" @click="doComment">评价本次报修</mt-button>
      <div class="admin-reply" v-show="state.adminreply">
        <span>管理员回复:</span>
        <span>{{bxadminrply}}</span>
        <tips class="comment-tips" v-show="state.adminreplytips" :bxcomment="bxcomment" :bxcommentpoints="bxcommentpoints"></tips>
      </div>
      <!-- 我的评价 -->
      <tips class="comment-tips" v-show="state.worker&&state.adminreplytips" :bxcomment="bxcomment" :bxcommentpoints="bxcommentpoints"></tips>
    </div>
    <!-- worker -->
    <div v-show="iswork">
      <div class="repair-info">
        <div class="title">报修人信息</div>
        <div class="name">
          <span>{{bxuser}}</span>
          <span>{{bxuserid}}</span>
        </div>
        <div class="phone"><i class="iconfont icon-call"></i>{{bxuserphone}}</div>
      </div>
      <mt-button type="primary" class="comment-button" @click="doComplete">完工</mt-button>
    </div>
  </div>
  <!-- 评价 -->
  <mt-popup :visible.sync="popupVisible" position="bottom">
    <div class="pop-container">
      <grade v-show="state.showgrade" :wid="wid"></grade>
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
      status:'',
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
    process,
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
  & .comment-button {
    width: 100%;
    top: 20px;
    border-radius: 0;
  }
}

.line-top {
  height: 40px;
  background-color: #f9f9f9;
  border-top: 1Px solid #efefef;
}

.line-bottom {
  height: 30px;
  background-color: #f9f9f9;
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
      width: 120px;
    }
    & .middle-icon-green {
      display: inline-block;
      margin-left: 20px;
      margin-right: 20px;
      background-color: #06c1ae;
      width: 24Px;
      height: 24Px;
      border-radius: 50%;
      & i {
        font-size: 40px;
        position: relative;
        color: #fff;
        &:after {
          position: absolute;
          height: 156px;
          left: 19px;
          right: 18px;
          top: 23Px;
          background: #e8e8e8;
          content: ''
        }
      }
    }
    & .middle-icon-yellow {
      display: inline-block;
      margin-left: 20px;
      margin-right: 20px;
      background-color: #ffb200;
      width: 24Px;
      height: 24Px;
      border-radius: 50%;
      & i {
        font-size: 35px;
        position: relative;
        color: #fff;
        top: 2px;
        left: 2px;
        &:after {
          position: absolute;
          height: 155px;
          left: 17px;
          right: 15px;
          top: 22Px;
          background: #E8E8E8;
          content: ''
        }
      }
    }
    & .middle-icon-error {
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
        &:after {
          position: absolute;
          height: 166px;
          left: 19px;
          right: 18px;
          top: 21Px;
          background: #E8E8E8;
          content: ''
        }
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

.repair-info {
  background-color: #fff;
  padding-left: 30px;
  & .title {
    height: 77px;
    line-height: 77px;
    background-color: #f9f9f9;
    color: #92969C;
    font-size: 28px;
  }
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
    color: #06C1AE;
    font-size: 28px;
    & i {
      margin-right: 33px;
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
