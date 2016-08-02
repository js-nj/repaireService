<template>
  <mt-header fixed title="报修详情" id="repair-mt-header">
    <mt-button v-link="'/'" icon="back" slot="left"></mt-button>
  </mt-header>
  <div class="main">
    <div class="title-user-img" v-if="tps">
      <mt-swipe :auto="4000" class="swipe-view">
        <mt-swipe-item class="swipe-view-item" v-for="item in tps">
          <img class="swipe-view-item" v-bind:src="'http://amptest.wisedu.com'+item.fileUrl"/>
        </mt-swipe-item>
      </mt-swipe>
      <span class="message-title">{{ title }}</span>
      <div class="user-info">
        <div class="avatar-name">
          <img class="avatar" src="http://csres.wisedu.com/scenes/public/images/demo/user1.png">
          <span>
            {{bxuser}}（{{bxuserid}}）
          </span>
        </div>
        <span> </span>
        <span class="time-zone">{{timezone | fixtime}}</span>
      </div>
    </div>
    <div class="location-phone">
      <div class="phone">
        <span><i class="icon-call"></i>{{bxuserphone}}</span>
      </div>
      <div class="location">
        <span><i class="icon-locationon"></i>{{bxlocation}}</span>
      </div>
    </div>
    <div class="admin-reply" v-show="state.adminreply">
      <span>管理员回复:</span>
      <span>{{bxadminrply}}</span>
      <tips class="comment-tips" v-show="state.adminreplytips" :bxcomment="bxcomment" :bxcommentpoints="bxcommentpoints"></tips>
    </div>
    <mt-cell class="maintenance-worker" v-show="state.worker && !iswork" title="派出维修人员" is-link>
      <a href="tel:{{wxpersonphone}}">{{wxperson}}</a>
    </mt-cell>
    <tips class="comment-tips" v-show="state.worker&&state.adminreplytips" :bxcomment="bxcomment" :bxcommentpoints="bxcommentpoints"></tips>
    <mt-button type="primary" class="comment-button" v-show="state.commentbutton" @click="doComment">评价本次报修</mt-button>
    <mt-button type="primary" class="comment-button" v-show="iswork" @click="doComplete">完工</mt-button>
  </div>
  <grade v-show="state.showgrade" :wid="wid"></grade>
</template>

<script>
import { Header, Button, Swipe, SwipeItem, Cell, Toast} from 'bh-mint-ui';
import grade from '../components/grade.vue';
import tips from '../components/tips.vue';
import utils from '../utils.js';
function changeState(starr) {
  for(var i in this) {
    if(starr.indexOf(i) > -1) {
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
      title: '',
      timezone: '',
      bxuser: '',
      bxuserid: '',
      bxuserphone:'',
      bxlocation: '',
      bxadminrply: '',
      bxcomment: '',
      bxcommentpoints: '',
      wxperson: '',
      wid:'',
      tps:false,
      state: {
        adminreply: false,
        showgrade: false,
        worker: false,
        commentbutton:false,
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
    this.bxlocation = info.BXQY_DISPLAY+info.BXDD_DISPLAY;
    this.bxadminrply = info.BHYJ;
    this.bxcomment = info.BXRPJ;
    this.bxcommentpoints = info.PF;
    this.wxperson = info.WXR_DISPLAY + ' (' + info.WXRSJ + ')';
    this.wxpersonphone = info.WXRSJ;
    this.wid = info.WID;
    this.tp = info.TP;
    if(this.tp) {
      this.$http.post("http://amptest.wisedu.com/ggfw/sys/emapcomponent/file/getUploadedAttachment/"+this.tp+".do",'' ).then(function(data) {
        _self.tps = data.data.items;
      }, function(err) {
        Toast('获取图片错误');
      });
    }
    switch (info.DQZT) {
      case '待维修':
        changeState.apply(this.state,[['worker']]);
        break;
      case '已维修':
        changeState.apply(this.state,[['worker','commentbutton']]);
        break;
      case '已驳回':
        changeState.apply(this.state,[['adminreply','commentbutton']]);
        break;
      case '已评价':
        if(this.bxadminrply){
          changeState.apply(this.state,[['adminreply','adminreplytips']]);
        } else {
          changeState.apply(this.state,[['worker','adminreplytips']]);
        }
        break;
      default:
        break;
    }
  },
  methods: {
    doComplete: function() {
      this.$http.post("http://amptest.wisedu.com/ggfw/sys/hqwxxt/api/finishRepair.do", {
        WID: this.wid
      }).then(function(data) {
        Toast('完成');
        this.$router.go({name:'waitRepair', params: {iswork:'worker'}});
      }, function(err) {
        Toast('失败');
      });
    },
    doComment: function() {
      this.state.showgrade = true;
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
  /*height: 120px;*/
}
.main {
  margin-top: 65px;
  & .title-user-img{
    /*height: 670px;*/
    width: 100%;
    background-color: #fff;
    & .swipe-view {
      height: 400px;
      width: 100%;
      color: #fff;
      font-size: 30px;
      text-align: center;
      vertical-align: middle;
      margin-bottom: 20px;
      & .swipe-view-item {
        height: 400px;
        width: 100%;
      }
    }
    & .message-title {
      display: block;
      color: #403F44;
      font-size: 32px;
      padding: 4px 16px;
    }
    & .user-info {
      width: 100%;
      margin-top: 20px;
      height: 70px;
      line-height: 50px;
      color: #B4B4B4;
      & span, & div {
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
    height: 200px;
    margin-top: 20px;
    color: #403F44;
    font-size: 28px;
    background-color: #fff;
    & span {
      display: block;
      height: 100px;
      line-height: 100px;
      margin-left: 20px;
    }
    & .phone {
      height: 100px;
      line-height: 100px;
      border-bottom: 1px solid #E8E9EC;
      & .icon-call {
        margin-right: 10px;
        font-family:"iconfont" !important;
        color: #FF8605;
        font-size:32px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
      }
    }
    & .location {
      height: 100px;
      & .icon-locationon {
        margin-right: 10px;
        font-family:"iconfont" !important;
        color: #FF8605;
        font-size:32px;font-style:normal;
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
    & a:hover, & a:visited, & a:link, & a:active {
      text-decoration: none;
      color:#B4B4B4;
    }
  }
  & .comment-button {
    width: 100%;
    top: 20px;
    height: 100px;
    border-radius: 0;
  }
}
</style>
