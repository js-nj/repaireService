<template>
  <div>
    <cp-header></cp-header>
    <div class="detail">
      <div v-if="tps.length">
        <mt-swipe :auto="200000" class="swipe-view">
          <mt-swipe-item v-for="item in tps" :key="item.WID">
            <div class="swipe-view-item" @click="previewImage($index)" :style="{backgroundImage: 'url('+ item.fileUrl + ')'}">
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
        <div v-if="!iswork">
          <div class="line-top"></div>
          <div class="progress">
            <div class="progress-title">报修进度</div>
            <process :status.sync='status' :visible.sync="popupVisible" :grade.sync="state.showgrade" :data.sync='processdata'></process>
          </div>
        </div>
        <div v-else="iswork">
          <div class="title">报修人信息</div>
          <div class="repair-info">
            <div class="name">
              <span>{{bxuser}}</span>
              <span>{{bxuserid}}</span>
            </div>
            <div class="phone">
              <i class="iconfont icon-call"></i>
              <a :href="'tel:'+bxuserphone">{{bxuserphone}}</a>
            </div>
          </div>
        </div>
        <div class="ri-comment-area" style="">
            <label  @click="goCommentPage">
              留言区 （<span>{{commentsList.length}}</span>）
            </label>
            <mt-button type="primary" v-if="commentsList.length == 0 || showCommentsList" size="small" @click="showCommentPop">添加留言</mt-button>
        </div>
        <div v-show="showCommentsList" style="padding-left:16px;">
          <comment-item v-for="item in commentsList" :key="item.WID" :option="item"></comment-item>
        </div>
        <!-- 四个tab页面对应不同的按钮组操作 -->
        <div v-if="fromTab == '1'" class="wi-buttons">
          <mt-button type="primary" class="wi-button wi-button-1" size="large" @click="saveJd">接单</mt-button>
          <i class="iconfont icon-gengduo wi-icon-more" @click="showActionSheet"></i>
        </div>
        <div v-else-if="fromTab == '2'" class="wi-buttons">
          <mt-button type="primary" class="wi-button wi-button-2" size="large" @click="actionComplete2">完工</mt-button>
          <mt-button type="default" class="wi-button wi-button-2" size="large" @click="actionHandUp2">挂起维修</mt-button>
        </div>
        <div v-else-if="fromTab == '3'" class="wi-buttons">
          <mt-button type="primary" class="wi-button wi-button-12" size="large" @click="saveJxwxUrl">继续维修</mt-button>
        </div>
        <div v-else></div>
        <!-- <mt-actionsheet
          :actions="iconActions"
          v-model="sheetVisible">
        </mt-actionsheet> -->
        <mt-popup :visible.sync="popupVisible" position="bottom">
          <div class="pop-container">
            <grade v-show="state.showgrade" :wid="wid"></grade>
          </div>
        </mt-popup>
        <!-- <mt-popup
          v-model="popupVisible1"
          position="bottom"
          popup-transition="popup-fade">
          <div style="overflow:auto;">
            <span class="pop-button" style="float:left;" @click="cancelPop">取消</span>
            <span class="pop-button" :class="{'pop-button-ok':isPopButtonOk}" style="float:right;" @click="submitPop(selected)">提交</span>
          </div>
          <mt-field label="" placeholder="请填写理由" type="textarea" rows="6" v-model="introduction"></mt-field>
        </mt-popup> -->
        <mt-popup
          v-model="popupVisible2"
          position="bottom"
          popup-transition="popup-fade">
          <div style="overflow:auto;padding: 4px;">
            <span class="pop-button" style="float:left;" @click="cancelPop2">取消</span>
            <span class="pop-button" :class="{'pop-button-ok':isPopButtonOk}" style="float:right;" @click="submitPop2(selected)">提交</span>
          </div>
          <mt-field label="" placeholder="请填写理由" type="textarea" rows="6" v-model="introduction2"></mt-field>
        </mt-popup>
      </div>
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
} from 'bh-mint-ui2';
import cpHeader from '../components/cpHeader.vue';
import grade from '../components/grade.vue';
import process from '../components/process.vue';
import tips from '../components/tips.vue';
import commentItem from '../components/CommentItem.vue';
import * as utils from '../utils';
import moment from 'moment';
import API from "../api.js";
import axios from 'axios';

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
    fixtime: utils._fixTime
  },
  data() {
    return {
      imgurl: '',
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
      processdata: {},
      detail:{},
      fromTab:'4',
      //sheetVisible:false,
      //iconActions:[{name:'挂起',method:this.actionHandUp},{name:'拒绝',method:this.actionReject}],
      //introduction:'',
      //popupVisible1:false,
      popAction:'',
      isPopButtonOk:false,
      commentsList:[],
      introduction2:'',
      popupVisible2:false,
      isPopButtonOk:false,
      showCommentsList:''
    }
  },
  created() {
    this.imgurl = WEBPACK_CONIFG_HOST.split('/publicapp')[0];
    console.log('xxx:'+this.imgurl)
    if (document.querySelector('.nav-header')) {
      document.querySelector('.nav-header').style="display:none;";
    }
    if (document.querySelector('.post')) {
      document.querySelector('.post').style="display:none;";
    }
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
    //SDK.setNavHeader(config);
    SDK.setTitleText('报修详情');
    let data = JSON.parse(this.$route.params.info);
    this.iswork = data.iswork;
    this.wid = data.wid;
    this.detail = data.detail;
    if (this.detail && this.detail.ZT) {
      switch (this.detail.ZT) {
        case 'DFP':
          this.fromTab = '1';
          break;
        case 'DWX':
          this.fromTab = '2';
          break;
        case 'UPDWX':
          this.fromTab = '3';
          break;
        default:
          this.fromTab = '4';
          break;
      }
    }
    //let url = WEBPACK_CONIFG_HOST + 'sys/hqwxxt/api/getDetailInfo.do';
    axios({method:'GET',url:API.getDetailInfo,params: {
        wid: this.wid
      }}).then((response) => {
      var info = response.data.data;
      if (response.data.code === 200) {
        this.title = info.MS;
        this.timezone = info.BXSJ;
        this.bxuser = info.BXRXM;
        this.bxuserid = info.BXRGH;
        this.bxuserphone = info.BXRSJ;
        this.bxlocation = info.BXQY +'-'+ info.BXDD +'-'+ info.XXDD; //TODO
        this.bxadminrply = info.BHYJ; // 报修意见
        this.bxcomment = info.BXRPJ;
        this.bxcommentpoints = info.PF;
        this.wxperson.name = info.WXRXM;
        this.wxperson.phone = info.WXRSJ;
        this.status = info.ZT;
        if (info.TP) {
          let url = WEBPACK_CONIFG_HOST + "sys/emapcomponent/file/getUploadedAttachment/" + info.TP + ".do";
          axios({method:'GET',url:url}).then((response) => {
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
    this.queryCommentsByWid();
  },
  watch:{
    introduction2:function(n){
      if(n && n.length && n.length>0){
        this.isPopButtonOk = true;
      }else {
        this.isPopButtonOk = false;
      }
    },
    // introduction:function(n){
    //   if(n && n.length && n.length>0){
    //     this.isPopButtonOk = true;
    //   }else {
    //     this.isPopButtonOk = false;
    //   }
    // }
  },
  methods: {
    queryCommentsByWid:function(){
      var that =  this;
      axios({
        method:'POST',
        url:API.queryCommentsByWid,
        params: {
          BXBH:that.wid
        }
      }).then(function(data){
        if (data.data.code == '0' || data.data.code == '200') {
          //Toast(data.data.datas);
          that.commentsList = data.data.datas.T_IT_HQWX_BBS_QUERY.rows;
        }else {
          Toast('查询评论失败！');
        }
      });
    },
    submit: function() {
      this.popupVisible = false;
    },
    previewImage: function(index) {
      var preImg = [];
      let img = this.tps.map((item) => {
        return WEBPACK_CONIFG_HOST.split('/publicapp')[0] + item.fileUrl;
      })
      for (let i = 0; i < img.length; i++) {
        let obj = {
          url: img[i]
        }
        preImg.push(obj)
      }
      BH_MIXIN_SDK.preViewImages(preImg, index);
    },
    showActionSheet:function(){
      this.sheetVisible = true;
    },
    // actionHandUp:function(){
    //   this.introduction = '';
    //   this.popupVisible1 = true;
    //   this.popAction = "handup";
    // },
    // actionReject:function(){
    //   this.introduction = '';
    //   this.popupVisible1 = true;
    //   this.popAction = "reject";
    // },
    showCommentPop:function(){
      this.introduction2 = '';
      this.popupVisible2 = true;
      this.popAction = "comment";
    },
    // cancelPop:function(){
    //   this.popupVisible1 = false;
    // },
    // submitPop:function(tab){
    //   this.popupVisible1 = false;
    //   if (this.popAction == 'reject') {
    //     this.saveTd();
    //   } else if (this.popAction == 'handup'){
    //     this.batchUpDwx();
    //   } else if (this.popAction == 'comment'){
    //     this.addComment();
    //   }
    //   this.cancelPop();
    // },
    goCommentPage:function(){
        if (this.showCommentsList) {
          this.showCommentsList = false;
        }else {
          this.showCommentsList = true;
        }
        // let options = {
        //   wid: this.wid,
        //   comments:this.commentsList
        // }
        // this.$router.push({
        //   name: 'comment',
        //   params: {
        //     info: JSON.stringify(options)
        //   }
        // })
    },
    saveJd:function(){
      var that= this;
      axios({
        method:'POST',
        url:API.saveJd,
        params: {
          BZ:'',
          WID:that.wid,
          USERID:window.USERID
        }
      }).then(function(data){
        if (data.data.success == true) {
          Toast('已接单！');
          history.go(-1);
          //that.getMyDisrepairList(1);
        }else {
          Toast('接单失败！');
        }
      }); 
    },
    saveTd:function(cb){
      var that= this;
      axios({
        method:'POST',
        url:API.saveTd,
        params: {
          BZ:that.introduction,
          WID:that.wid,
          USERID:window.USERID
        }
      }).then(function(data){
        if (data.data.success == true) {
          Toast('已拒单！');
          //cb && cb(that.selected);
          history.go(-1);
        }else {
          Toast('拒单失败！');
        }
      });
    },
    saveJxwxUrl:function(){
        var that= this;
        axios({
          method:'POST',
          url:API.saveJxwxUrl,
          params: {
            WID:that.wid,
            USERID:window.USERID
          }
        }).then(function(data){
          if (data.data.success == true) {
            Toast('已继续维修！');
            //cb && cb(that.selected);
            history.go(-1);
          }else {
            Toast('继续维修失败！');
          }
        });
    },
    batchUpDwx:function(cb){
      var that= this;
      axios({
        method:'POST',
        url:API.batchUpDwx,
        params: {
          BZ:that.introduction2,
          WIDS:that.wid,
          FLAG:'single',
          USERID:window.USERID
        }
      }).then(function(data){
        if (data.data.success == true) {
          Toast('已挂起维修单！');
          //cb && cb(that.selected);
          history.go(-1);
        }else {
          Toast('挂起维修单失败！');
        }
      });
    },
    completeOrders:function(){
      var that = this;
      axios({
        method:'POST',
        url:API.completeOrders,
        params: {
          WIDS:that.wid,
          FLAG:'single',
          USERID:window.USERID,
          BZ:that.introduction2
        }}).then(function(data) {
          if (data.data.success == true) {
            Toast('已完工');
            history.go(-1);
          } else {
            Toast('完工失败');
          }
        }, function(err) {
          Toast('完工维修单失败');
        });
    },
    actionHandUp2:function(){
      this.popupVisible2 = true;
      this.popAction = "handup";
    },
    actionComplete2:function(){
      this.popupVisible2 = true;
      this.popAction = "complete";
    },
    cancelPop2:function(){
      this.popupVisible2 = false;
      this.introduction2 = '';
    },
    submitPop2:function(tab){
      this.popupVisible2 = false;
      if (this.popAction == 'complete') {
        this.completeOrders();
        //this.saveTd(this.getMyDisrepairList);
      } else if (this.popAction == 'handup'){
        this.batchUpDwx();
      }else if (this.popAction == 'comment'){
        if (this.isPopButtonOk) {
          this.addComment();
        }else {
          Toast('请填写评论');
        }
      }
      //this.cancel2();
      //this.getMyDisrepairList(1);
    },
    addComment:function(){
      var that = this;
      axios({
        method:'GET',
        url:API.addComment,
        params: {
          HFNR:this.introduction2,
          BXBH:this.wid,
          HFRY:window.USERID,
          HFSJ:moment().format('YYYY-MM-DD HH:MM:SS')
        }
      }).then(function(data){
        if (data.data.success == true) {
          Toast('添加评论成功');
          that.queryCommentsByWid();
        }else {
          Toast('添加评论失败');
        }
      });
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
    [Toast.name]: Toast,
    grade,
    process,
    tips,
    cpHeader,
    commentItem
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
  border-bottom: 1PX solid #E8E8E8;
  & .progress-title {
    font-size: 28px;
    height: 80px;
    line-height: 80px;
    margin-left: 30px;
    border-bottom: 1PX solid #E8E8E8;
  }
}

.comment-button {
  width: calc(100% - 60px);
  margin-left: 30px;
  margin-right: 30px;
  top: 20px;
  border-radius: 10px;
}
body {
  background-color: #f9f9f9;
}
.ri-comment-area {
  color:#26a2ff;
  padding:8PX 16PX;
}
.pop-button-ok {
  color:#06c1ae;
}
</style>
