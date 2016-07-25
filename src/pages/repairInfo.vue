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
    </div>
    <mt-cell class="maintenance-worker" title="派出维修人员" is-link>
      <span>王秋实（13811111111）</span>
    </mt-cell>
  </div>
  <div class="modal">
    <div class="modal-shadow"></div>
    <div class="modal-content">
      <span class="modal-title">报修评价</span>
      <div class="comment-div">
        <span>选择星级</span>
        <div class="grade-list">
          <i class="icon-grade" v-bind:class="{'grade-choosen':gradeChoosen[0]}" @click="gradeFunc(0)"></i>
          <i class="icon-grade" v-bind:class="{'grade-choosen':gradeChoosen[1]}" @click="gradeFunc(1)"></i>
          <i class="icon-grade" v-bind:class="{'grade-choosen':gradeChoosen[2]}" @click="gradeFunc(2)"></i>
          <i class="icon-grade" v-bind:class="{'grade-choosen':gradeChoosen[3]}" @click="gradeFunc(3)"></i>
          <i class="icon-grade" v-bind:class="{'grade-choosen':gradeChoosen[4]}" @click="gradeFunc(4)"></i>
        </div>
        <div class="comment-textarea">
          <textarea class="comment-describe" placeholder="请填写评价" rows="5"></textarea>
          <span class="comment-describe-holder">100</span>
        </div>
        <mt-button type="primary" class="save-button" @click="save">提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Header, Button, Swipe, SwipeItem, Cell} from 'bh-mint-ui';
export default {
  ready() {
    console.log(this.$route.params)
  },
  data() {
    return {
      gradeChoosen: [false,false,false,false,false]
    }
  },
  methods: {
    gradeFunc: function(index) {
      var gradeArr = [];
      for (var i = 0; i < this.gradeChoosen.length; i++) {
        if(i <= index) {
          gradeArr[i] = true;
        }
        else {
          gradeArr[i] = false;
        }
      }
      this.gradeChoosen = gradeArr;
    }
  },
  components: {
    [Header.name]: Header,
    [Button.name]: Button,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Cell.name]: Cell
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
  }
  & .maintenance-worker {
    margin-top: 20px;
  }
}
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  & .modal-shadow {
    width: 100%;
    height: 35%;
    opacity: 0.6;
    z-index: -1;
    background: #666;
  }
  & .modal-content {
    background-color: #fff;
    height: 65%;
    width: 100%;
    z-index: 1;
    /*position: fixed;*/
    /*bottom: 0px;*/
    & .modal-title{
      display: block;
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: #403F44;
      font-size: 32px;
      border-bottom: 1px solid #E8E9EC;
    }
    & .comment-div {
      height: 100px;
      width: 100%;
      border-bottom: 1px solid #E8E9EC;
      & span {
        display: inline-block;
        height: 100px;
        width: 25%;
        font-size: 24px;
        padding: 0 30px;
        line-height: 100px;
        text-align: center;
      }
      & .grade-list {
        display: inline-block;
        width: 70%;
        text-align: center;
        & .icon-grade {
          font-family:"iconfont" !important;
          color: #E8E9EC;
          font-size:36px;font-style:normal;
          -webkit-font-smoothing: antialiased;
          -webkit-text-stroke-width: 0.2px;
          -moz-osx-font-smoothing: grayscale;
        }
        & .grade-choosen {
          color: #FF8605;
        }
      }
      & .comment-describe {
        overflow: auto;
        resize: none;
        vertical-align: top;
        width: 100%;
        height: 280px;
        font-size: 26px;
        padding: 10px 10px;
      }
      & .comment-describe-holder {
        color: #B4B4B4;
        display: block;
        width: 100%;
        background: #fff;
        text-align: right;
      }
      & .save-button {
        width: 100%;
        top: 20px;
        border-radius: 0;
      }
    }
  } 
}
</style>
