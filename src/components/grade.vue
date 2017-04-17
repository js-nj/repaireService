<template>
  <div class="comment-div">
    <div class="grade-list">
      <i class="iconfont icon-wujiaoxing1" :class="{'grade-choosen':gradeChoosen[0]}" @click="gradeFunc(0)"></i>
      <i class="iconfont icon-wujiaoxing1" :class="{'grade-choosen':gradeChoosen[1]}" @click="gradeFunc(1)"></i>
      <i class="iconfont icon-wujiaoxing1" :class="{'grade-choosen':gradeChoosen[2]}" @click="gradeFunc(2)"></i>
      <i class="iconfont icon-wujiaoxing1" :class="{'grade-choosen':gradeChoosen[3]}" @click="gradeFunc(3)"></i>
      <i class="iconfont icon-wujiaoxing1" :class="{'grade-choosen':gradeChoosen[4]}" @click="gradeFunc(4)"></i>
    </div>
    <div class="comment-textarea">
      <textarea class="comment-describe" placeholder="填写你对此次维修服务的感受..." rows="7"  v-model.trim="commentinfo"></textarea>
      <div class="tips">
        <span class="number">{{commentinfo.length}}/100</span>
      </div>
    </div>
    <mt-button type="primary" class="save-button" @click="save">提交</mt-button>
  </div>
</template>
<script>
import {
  Button,
  Toast,
  Popup
} from 'bh-mint-ui';
import api from '../api.js';
export default {
  data() {
      return {
        gradeChoosen: [false, false, false, false, false],
        gradepoints: '',
        tipsmessage: '',
        commentinfo: '',
        popupVisible: true
      }
    },
    props: {
      wid: {
        type: String
      }
    },
    components: {
      [Button.name]: Button,
      [Popup.name]: Popup
    },
    watch:{
      'commentinfo':function(val,oldval){
        this.commentinfo = this.commentinfo.trim();
      }
    },
    methods: {
      hide: function() {
        this.$dispatch('grade-close', false)
      },
      save: function() {
        if(this.gradepoints==0){
          Toast('请选择星级');
          return ;
        }
        if(this.commentinfo.length===0){
          Toast('请填写评价');
          return ;
        }
        if(this.commentinfo.length>100){
          Toast('评价字数过长');
          return ;
        }
        api.doComment.call(this, {
          PF: this.gradepoints,
          BXRPJ: this.commentinfo,
          WID: this.wid
        });
      },
      gradeFunc: function(index) {
        var gradeArr = [];
        for (var i = 0; i < this.gradeChoosen.length; i++) {
          if (i <= index) {
            gradeArr[i] = true;
          } else {
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
.comment-div {
  width: 100%;
  & .grade-list {
    height: 100px;
    line-height: 100px;
    text-align: center;
    border-bottom: 1Px solid #E8E8E8;
    & i {
      color: #92969C;
      font-size: 36px;
      margin-right: 8px;
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
    border: none;
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
.tips{
  height: 30px;
}
 .number {
    position: absolute;
    right: 30px;
  }
</style>
