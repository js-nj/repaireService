<template>
  <div :style="{'height':bodyHeight}" style="overflow:auto;">
      <div style="padding: 16px 24px;">
        <comment-item v-for="item in commentsList" :key="item.WID" :option="item"></comment-item>
        <div v-if="commentsList.length===0" class="no-data">
          <img src="../components/img/no_data.png">
          <span>暂时没有评论呢</span>
        </div>
      </div>
      <div class="wi-buttons">
        <mt-button type="primary" class="wi-button wi-button-12" size="large" @click="showComment">添加留言</mt-button>
      </div>
      <mt-popup
          v-model="popupVisible"
          position="bottom"
          popup-transition="popup-fade">
          <div style="overflow:auto;">
            <span class="pop-button" style="float:left;" @click="cancelPop">取消</span>
            <span class="pop-button" :class="{'pop-button-ok':isPopButtonOk}" style="float:right;" @click="submitPop">提交</span>
          </div>
          <mt-field label="" placeholder="请填写理由" type="textarea" rows="6" v-model="introduction"></mt-field>
        </mt-popup>
  </div>
</template>

<script>
  import {
    Toast,Loadmore
  } from 'bh-mint-ui2';
  import CommentItem from '../components/CommentItem.vue';
  import API from "../api.js";
  import axios from 'axios';
  import moment from 'moment';
  import fixTime from 'formattime';
  export default {
    data () {
      return {
        commentsList:[],
        popupVisible:false,
        introduction:'',
        isPopButtonOk:false,
        wid:'',
        bodyHeight:''
      }
    },
    watch:{
      introduction:function(n){
        //console.log(n)
        if(n && n.length && n.length>0){
          this.isPopButtonOk = true;
        }else {
          this.isPopButtonOk = false;
        }
      }
    },
    methods: {
      cancelPop:function(){
        this.popupVisible = false;
        this.introduction = '';
      },
      submitPop:function(){
        this.popupVisible = false;
        if (this.introduction) {
          //alert('发送请求,重新请求上个页面数据');
          this.addComment();
        }else {
          Toast('请填写意见');
        }
      },
      showComment:function(){
        this.popupVisible = true;
      },
      addComment:function(){
        var that = this;
        axios({
          method:'GET',
          url:API.addComment,
          params: {
            HFNR:this.introduction,
            BXBH:this.wid,
            HFRY:window.USERID,
            HFSJ:moment().format('YYYY-MM-DD HH:MM:SS')
          }
        }).then(function(data){
          if (data.data.success == true) {
            Toast('添加评论成功');
            that.queryComment();
          }else {
            Toast('添加评论失败');
          }
        });
      },
      queryComment:function(){
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
      }
    },
    created() {
      BH_MIXIN_SDK.setTitleText('留言区');
      let data = JSON.parse(this.$route.params.info);
      this.commentsList = data.comments;
      this.wid = data.wid;
      this.bodyHeight = document.documentElement.clientHeight - 44 + 'px';
      //this.bxbh = data.bxbh;
    },
    components: {
      CommentItem,
      [Loadmore.name]: Loadmore
    }
  }
</script>
<style>
.pop-button {
  color:#999;padding:4PX 16PX;font-size:14PX;
}
.pop-button-ok {
  color:#06c1ae;
}
.wi-buttons {
  position: absolute;
    width: 100%;
    bottom: 0px;
}
.no-data {
    background-color: #fff;
    display: flex;
    /* width: 100vw; */
    /* height: 100vh; */
    flex-direction: column;
    align-items: center;    
}
.no-data img {
    width: 200px;
    margin-top: 240px;
    margin-bottom: 30px;
}
.no-data span {
    font-size: 26px;
}
</style>

