<template>
  <div class="modal">
    <div class="modal-shadow" @click="hide"></div>
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
          <textarea class="comment-describe" placeholder="请填写评价" rows="5" v-model="commentinfo"></textarea>
          <span class="comment-describe-holder"><span class="tips" v-show="tipsmessage">{{tipsmessage}}</span>100</span>
        </div>
        <mt-button type="primary" class="save-button" @click="save">提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Toast } from 'bh-mint-ui';
import api from '../api.js';
export default {
  data() {
    return {
      gradeChoosen: [false,false,false,false,false],
      gradepoints:'',
      tipsmessage: '',
      commentinfo: ''
    }
  },
  props: {
    wid:{
      type: String
    }
  },
  components: {
    [Button.name]: Button,
  },
  methods: {
    hide: function() {
      this.$dispatch('grade-close', false)
    },
    save: function() {
      var self = this;
      if(this.gradepoints == '') {
        this.tipsmessage = '请选择星级';
        setTimeout(function() {
          self.tipsmessage = '';
        }, 2000);
        return;
      }
      if(this.commentinfo == '') {
        this.tipsmessage = '请选择填写评价';
        setTimeout(function() {
          self.tipsmessage = '';
        }, 2000);
        return;
      }
      api.doComment.call(this,{
        PF: this.gradepoints,
        BXRPJ: this.commentinfo,
        WID: this.wid
      });
    },
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
      this.gradepoints = String(1 + Number(index));
    }
  }
}
</script>

<style scoped>
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
        & .tips {
          float: left;
          color: red;
        }
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
