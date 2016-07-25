<template>
  <mt-header fixed title="报修详情" id="repair-mt-header">
    <mt-button v-link="'/'" icon="back" slot="left"></mt-button>
  </mt-header>
  <div class="main">
    <div class="title-user-img">
      <mt-swipe :auto="4000" class="swipe-view">
        <mt-swipe-item class="swipe-view-item"><img class="swipe-view-item" src="http://f.named.cn/f/7654a71a2d5b8991973f5bbb2c3c7c7d.jpg"/></mt-swipe-item>
        <mt-swipe-item class="swipe-view-item"><img class="swipe-view-item" src="http://f.named.cn/f/2a7fd6fd84158d0ec5b99fce2f8d037a.jpg"/></mt-swipe-item>
        <mt-swipe-item class="swipe-view-item"><img class="swipe-view-item" src="http://f.named.cn/f/b6d4d1dbae3ee52fd164f85ab52a584e.t720x482.jpg"/></mt-swipe-item>
      </mt-swipe>
      <span class="message-title">Fuji Superia 200，很少拍这种城市题材，也几乎没用过柯达以外的胶卷，算是学习吧，各种渣片～～～</span>
      <div class="user-info">
        <div class="avatar-name">
          <img class="avatar" src="http://f.named.cn/f/b6d4d1dbae3ee52fd164f85ab52a584e.t720x482.jpg">
          <span>
            刘俊（1406021）
          </span>
        </div>
        <span> </span>
        <span class="time-zone">9小时前</span>
      </div>
    </div>
    <div class="location-phone">
      <div class="phone">
        <span><i>p</i>15895847445</span>
      </div>
      <div class="location">
        <span><i>l</i>爱乐学院男生宿舍B座3楼306室</span>
      </div>
    </div>
    <div class="admin-reply">
      <span>管理员回复:</span>
      <span>我知道你我都没有错，只是忘了怎么退后，信誓旦旦给的承诺我知道你我都没有错，只是忘了怎么退后，信誓旦旦给的承诺</span>
      <tips class="comment-tips"></tips>
    </div>
    <mt-cell class="maintenance-worker" title="派出维修人员" is-link>
      <span>王秋实（13811111111）</span>
    </mt-cell>
    <mt-button type="primary" class="comment-button" @click="doComment">评价本次报修</mt-button>
  </div>
  <grade v-show="showgrade"></grade>
</template>

<script>
import { Header, Button, Swipe, SwipeItem, Cell} from 'bh-mint-ui';
import grade from '../components/grade.vue';
import tips from '../components/tips.vue';
export default {
  data() {
    return {
      showgrade: false
    }
  },
  ready() {
    console.log(this.$route.params)
  },
  methods: {
    doComment: function() {
      this.showgrade = true;
    }
  },
  events: {
    'grade-close': function(notify) {
      this.showgrade = notify;
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
      border-bottom: 1px solid #E8E9EC;
    }
    & .location {
      height: 100px;
    }
  }
  & .admin-reply {
    background-color: #fff;
    width: 100%;
    color: #403F44;
    font-size: 13px;
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
  }
  & .comment-button {
    width: 100%;
    top: 20px;
    height: 100px;
    border-radius: 0;
  }
}
</style>
