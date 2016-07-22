<template>
  <mt-header fixed title="我的报修" id="repair-mt-header">
    <mt-button v-link="'/'" icon="back" slot="left"></mt-button>
  </mt-header>
  <div class="main">
    <textarea class="question-describe" placeholder="请描述您遇到的问题" rows="5"></textarea>
    <span class="question-describe-holder">100</span>
    <div class="list-item first-item">
        <label class="item-left">手机号</label>
        <input type="tel" class="item-right text-input" placeholder="请填写手机号">
    </div>
    <mt-cell title="故障类型" is-link>
      <span>请选择</span>
    </mt-cell>
    <mt-cell title="报修区域" is-link>
      <span>请选择</span>
    </mt-cell>
    <mt-cell title="报修地点" is-link>
      <span>请选择</span>
    </mt-cell>
  </div>
</template>

<script>
import { Header, Button, Cell } from 'bh-mint-ui';
export default {
  components: {
    [Header.name]:Header,
    [Button.name]:Button,
    [Cell.name]:Cell,
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
  & .question-describe {
    overflow: auto;
    resize: none;
    vertical-align: top;
    width: 640px;
    height: 200px;
    font-size: 14px;
    padding: 10px 10px;
  }
  & .question-describe-holder {
    color: #B4B4B4;
    display: block;
    background: #fff;
    text-align: right;
    padding-right: 15px;
  }
}
.first-item {
  margin-top: 8px;
}
.list-item {
  background-color: #fff;
  /*border-bottom: 1PX solid #d9d9d9;*/
}
.item-left {
  display: inline-block;
  width: 34%;
  height: 100px;
  text-align: left;
  color: #403F44;
  padding-left: 30px;
  font-size: 28px;
  line-height: 100px;
}
.item-right {
  display: inline-block;
  width: 62%;
  height: 100px;
  line-height: 100px;
}
.text-input {
  padding: 0 30px;
  font-size: 28px;
  text-align: right;
  border: 0;
}
.mint-cell {
  height: 100px;
}
.mint-cell:before {
 left: 0px;
 color: #d9d9d9;
}
.mint-cell-text {
  color: #403F44;
}
.mint-cell-value {
  color: #C2C2C2;
  font-size: 28px;
}
</style>
