<template>
  <div class="list-item" @click="messageInfo">
    <div class="item-main">
      <span class="message-title">{{messagetitle}}</span>
      <div class="item-main-info" v-bind:class="{ 'item-main-img': !!(img)}">
        <span>
          {{info}}
        </span>
        <div class='message-bottom'>
          <span class="message-tag" v-if="tag">
            {{tag}}
          </span>
          <span class="time-zone">
            {{timezone | fixtime}}
          </span>
        </div>
      </div>
      <img class="item-img" v-if="img" :src="img">
    </div>
  </div>
</template>

<script>
import utils from '../utils.js';
export default {
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
    }
  },
  created() {
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
        font-family: PingFang-SC-Medium;
        font-size: 26px;
        color: #B4B4B4;
      }
      & .message-tag {
        display: inline-block;
        text-decoration: none;
        font-weight: normal;
        font-size: 10px;
        height: 35px;
        line-height: 35px;
        padding: 0 5px 0px 10px;
        border: 1PX solid;
        -webkit-border-radius: 0 5px 5px 0;
        border-radius: 0 5px 5px 0;
        margin: 5px 9px 5px 8px;
      }
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
