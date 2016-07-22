<template>
  <mt-header fixed title="我的报修" id="repair-mt-header">
    <mt-button v-link="'/'" icon="back" slot="left"></mt-button>
  </mt-header>
  <div class="main">
    <textarea class="question-describe" placeholder="请描述您遇到的问题" rows="5" v-model="form.questioninfo"></textarea>
    <span class="question-describe-holder">100</span>
    <div class="list-item first-item">
        <label class="item-left">手机号</label>
        <input type="tel" class="item-right text-input" placeholder="请填写手机号" v-model="form.phone">
    </div>
    <mt-cell class="mint-cell-text-fix" title="故障类型" is-link v-on:click="showpicker('breaks')">
      <span>{{ form.breaks ? form.breaks : '请选择' }}</span>
    </mt-cell>
    <mt-cell class="mint-cell-text-fix" title="报修区域" is-link v-on:click="showpicker('area')">
      <span>{{ form.area ? form.area : '请选择' }}</span>
    </mt-cell>
    <mt-cell class="mint-cell-text-fix" title="报修地点" is-link v-on:click="showpicker('loc')">
      <span>{{ form.loc ? form.loc : '请选择' }}</span>
    </mt-cell>
    <div class="list-item first-item" style="margin-top: 0">
        <label class="item-left">详细地址</label>
        <input type="text" class="item-right text-input" placeholder="请填写" v-model="form.locationinfo">
    </div>
  </div>
  <mt-button type="primary" class="save-button" @click="save">提交</mt-button>
  <mt-picker v-show="isshowpicker" class="picker-show" :slots="slots" @change="onValuesChange" :show-toolbar="showToolbar" rotate-effect :visible-item-count="3">
    <slot><span class="toolbar-btn" @click="cancel">取消</span></slot>
    <slot><span class="toolbar-btn" style="float: right" @click="doOk">确定</span></slot>
  </mt-picker>
</template>

<script>
import { Header, Button, Cell, Picker, MessageBox } from 'bh-mint-ui';
var errTipsInfo = {
    questioninfo:'请描述您遇到的问题',
    phone:'请输入正确的手机号',
    locationinfo:'请输入详细地址',
    breaks: '请输入故障类型',
    area: '请输入报修区域',
    loc: '请输入报修地点'
}
//根据不同的类型取数据
function getPickerData(val) {
  var url;
  switch (val) {
    case 'breaks':
      url = '111';
      break;
    case 'area':
      url = '222';
      break;
    default:
      url = '333';
      break;
  }
  this.presentPicker = val;
  //TODO请求数据ajax
  this.slots[0].values = ['请选择',url];
}
function validForm() {
  for(var i in this.form) {
    if(this.form[i] == '')
       return errTipsInfo[i];
    if(i == 'phone' && !this.form[i].match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/))
      return errTipsInfo[i];
  }
  return true;
}
export default {
  methods: {
    cancel: function() {
      this.isshowpicker = false;
    },
    doOk: function() {
      if(this.changeval == '请选择') {
        return
      }
      this.form[(this.presentPicker)] = this.changeval;
      this.changeval = '请选择';
      this.isshowpicker = false;
    },
    showpicker: function(val) {
      if(val == 'loc' && this.form.area == '')
        return
      this.isshowpicker = true;
      getPickerData.call(this,val);
    },
    onValuesChange: function(picker, values) {
      this.changeval = values[0];
    },
    save: function() {
      var result = validForm.call(this);
      if(result === true) {
        MessageBox('提示', '提交成功！');
      }else {
        MessageBox('提示', result);
      }
    }
  },

  data() {
    return {
      showToolbar: true,
      form: {
        questioninfo:'',
        phone:'',
        breaks: '',
        area: '',
        loc: '',
        locationinfo:''
      },
      slots: [
        {
          flex: 1,
          defaultIndex:0,
          values: ['请选择',1,2,3,4,5],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      changeval: '请选择',
      isshowpicker: false,
      presentPicker:''
    };
  },
  components: {
    [Header.name]: Header,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Picker.name]: Picker
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
    width: 100%;
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
.mint-cell-text-fix {
  padding-left: 30px;
}
.text-input {
  padding: 0 50px;
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
.picker-show {
  background-color: #fff;
  width: 100%;
  height: 300px;
  position: absolute;
  bottom: 0;
}
.picker-toolbar {
  background: #fff;
  border-bottom: 1PX solid #BABABA;
  border-top: 1PX solid #BABABA;
  & .toolbar-btn {
    height: 40PX;
    line-height: 40PX;
    color: #2196F3;
    text-align: center;
    display: inline-block;
    padding: 0PX 15PX;
  }
}
.save-button {
  width: 100%;
  top: 20px;
  border-radius: 0;
}
</style>
