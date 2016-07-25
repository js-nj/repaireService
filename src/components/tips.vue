<template>
  <div class="speech-bubble speech-bubble-top">
    <div class="grade-list">
      <i class="icon-grade" v-bind:class="{'grade-show':gradeshow[0]}" @click="gradeShowFunc(0)"></i>
      <i class="icon-grade" v-bind:class="{'grade-show':gradeshow[1]}" @click="gradeShowFunc(1)"></i>
      <i class="icon-grade" v-bind:class="{'grade-show':gradeshow[2]}" @click="gradeShowFunc(2)"></i>
      <i class="icon-grade" v-bind:class="{'grade-show':gradeshow[3]}" @click="gradeShowFunc(3)"></i>
      <i class="icon-grade" v-bind:class="{'grade-show':gradeshow[4]}" @click="gradeShowFunc(4)"></i>
    </div>
    <span class="points">4.2</span>
    <div class="my-comment">
      <span class="my-comment-title">我的评价：</span>
      箭头在顶部箭头在顶部箭头在顶部箭头在顶部箭头在顶部箭头在顶
    </div>
  </div>
</template>
<script>
export default {
}
</script>

<style scoped>
.speech-bubble {
  position: relative;
  background-color: #F6F7F9;
  width: 100%;
  /*height: 150px;*/
  /*line-height: 150px;*/
  color: #fff;
  text-align: left;
  border-radius: 10px;
  font-family: sans-serif;
  & .grade-list {
    display: inline-block;
    height: 50px;
    /*width: 50%;*/
    padding-left: 20px;
    line-height: 50px;
    text-align: left;
    & .icon-grade {
      font-family:"iconfont" !important;
      color: #E8E9EC;
      font-size:28px;font-style:normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
    & .grade-choosen {
      color: #FF8605;
    }
  }
  & .points {
    margin-left: 10px;
    color: #FF8605;
  }
  & .my-comment {
    display: block;
    width: 100%;
    color: #403F44;
    padding: 0 20px;
    & .my-comment-title {
      /*margin-left: 20px;*/
      color: #888;
      font-size: 16px;
    }
  }
}
 
.speech-bubble:after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 15px solid;
}
 
/* 箭头的位置 */
.speech-bubble-top:after {
  border-bottom-color: #F6F7F9;
  left: 10%;
  bottom: 100%;
  margin-left: -15px;  
}
</style>
