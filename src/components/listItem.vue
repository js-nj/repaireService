<template>
  <div class="list-item" @click="messageInfo">
    <div class="item-main">
      <span class="message-title">{{messagetitle}}</span>
      <div class="item-main-info" v-bind:class="{ 'item-main-img': !!(img)}">
        <span class="span-info">
          {{info}}
        </span>
        <div class='message-bottom'>
         <!--  <span class="message-tag" v-if="tag">
            {{tag}}
          </span> -->
          <span class="time-zone">
            {{timezone | fixtime}}
          </span>
        </div>
      </div>
      <img class="item-img" v-if="img" :src="imgurl">
    </div>
  </div>
</template>

<script>
import utils from '../utils.js';
export default {
  data() {
    return {
      imgurl: global.HOST + '/ggfw/sys/emapcomponent/file/getFileByToken/' + this.img + '.do'
    }
  },
  filters: {
    fixtime: utils.fixTime
  },
  methods: {
    messageInfo: function() {
      this.$router.go({name:'repairInfo', params: {info:JSON.stringify(this.all)}})
    }
  },
  props: {
    messagetitle:{
      type: String
    },
    info:{
      type: String
    },
    timezone: {
      type: String
    },
    tag: {
      type: String
    },
    img: {
      type:String
    },
    all:{
      type: Object
    },
    iswork:{
      type: Boolean
    }
  },
  created() {
    this.all.iswork = this.iswork;
  }
}
</script>

<style scoped>
.list-item {
  height: 220px;
  /*width: 640px;*/
  width: 100%;
  background-color: #fff;
  border-bottom: 0.5PX solid #E8E9EC;
  padding: 28px 30px;
  & .item-main {
    /*width: 580px;*/
    width: 100%;
    & span {
      color: #403F44;
      font-family: PingFang-SC-Bold;
      font-size: 30px;
      line-height: 30px;
      height: 30px;
    }
    & .message-title {
      overflow: hidden;
      display: block;
      /*width: 420px;*/
      width: 70%;
    }
    & .item-main-info {
      padding: 10px 0;
      /*width: 580px;*/
      width: 100%;
      float: left;
      & span {
        /*font-family: PingFang-SC-Medium;*/
        /*font-size: 16Px;*/
        color: #B4B4B4;
      }
      & .span-info {
        display: block;
        font-size: 22px;
        height: 60px;
        width: 100%;
        overflow: hidden;
      }
/*      & .message-tag {
        display: inline-block;
        text-decoration: none;
        font-weight: normal;
        font-size: 16px;
        height: 35px;
        line-height: 35px;
        padding: 0 5px 0px 10px;
        border: 1PX solid;
        -webkit-border-radius: 0 5px 5px 0;
        border-radius: 5px 5px 5px 5px;
        margin: 5px 9px 5px 8px;
      }*/
      & .message-tag {
        position: relative;
        border: 1PX solid #B4B4B4;
        display: inline-block;
        text-decoration: none;
        font-weight: normal;
        font-size: 16px;
        height: 20Px;
        line-height: 35px;
        padding: 0 5px 0px 8px;
        margin: 5px 9px 5px 8px;
        border-radius: 3Px;
      }
      & .message-tag:after, & .message-tag:before {
        right: 100%;
        top: 50%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
      }

      & .message-tag:after {
        border-color: rgba(136, 183, 213, 0);
        border-right-color: #fff;
        border-width: 8PX;
        margin-top: -8PX;
      }
      & .message-tag:before {
        border-color: rgba(194, 225, 245, 0);
        border-right-color: #B4B4B4;
        border-width: 9PX;
        margin-top: -9PX;
      }
/*      & .message-tag::before {
        content:"";
        position: absolute;
        width: 0;
        height: 0;
        left: 35px;
        border-top: 17px solid transparent;
        border-right: 35px solid red;
        border-bottom: 17px solid transparent;
      }*/
      & .time-zone {
        display: inline-block;
        height: 35px;
        font-size: 20px;
        padding: 10px 0;
      }
    }
    & .item-main-img {
      /*width: 420px;*/
      width: 70%;
    }
    & .item-img {
      width: 160px;
      height: 140px;
      float: right;
      margin-top: -35px;
    }
  }
}
</style>
