<template>
  <mt-header fixed title="我的报修" id="repair-mt-header">
    <mt-button v-link="'/'" icon="back" slot="left"></mt-button>
  </mt-header>
  <div class="main">
    <textarea class="question-describe" placeholder="请描述您遇到的问题" rows="5" v-model="form.questioninfo"></textarea>
    <span class="question-describe-holder">100</span>
    <div class="post__imgs">
      <div class="post__img" v-for="img in imgs">
        <img @click="previewImg($index)" :src="img.base64">
        <span @click="deleteImg($index)" class="post__img-del"><img src="../components/img/delete.png"/></span>
      </div>
      <div class="post__img"  @click="showActions" v-if="imgs.length < imgLimit">
        <img src="../components/img/post.png"/>
      </div>
    </div>
    <div class="list-item first-item">
        <label class="item-left" @click="debug">手机号</label>
        <input type="tel" class="item-right text-input" placeholder="请填写手机号" v-model="form.phone">
    </div>
    <mt-cell class="mint-cell-text-fix" title="故障类型" is-link v-on:click="showpicker('breaks')">
      <span>{{ form.breaks ? form.breaks : '请选择' }}</span>
    </mt-cell>
    <mt-cell class="mint-cell-text-fix" title="报修区域" is-link v-on:click="showpicker('area')">
      <span>{{ form.area ? form.area : '请选择' }}</span>
    </mt-cell>
<!--     <mt-cell class="mint-cell-text-fix" title="报修地点" is-link v-on:click="showpicker('loc')">
      <span>{{ form.loc ? form.loc : '请选择' }}</span>
    </mt-cell> -->
    <div class="list-item first-item" style="margin-top: 0">
        <label class="item-left">详细地址</label>
        <!-- <input type="text" class="item-right text-input" placeholder="请填写" v-model="form.locationinfo"> -->
        <textarea class="item-right text-textarea" placeholder="请填写" v-model="form.locationinfo"></textarea>
    </div>
  </div>
  <mt-button type="primary" class="save-button" @click="save">提交</mt-button>
  <!-- <mt-picker v-show="isshowpicker" class="picker-show" :slots="slots" @change="onValuesChange" :show-toolbar="showToolbar" rotate-effect :visible-item-count="3">
    <slot><span class="toolbar-btn" @click="cancel">取消</span></slot>
    <slot><span class="toolbar-btn" style="float: right" @click="doOk">确定</span></slot>
  </mt-picker> -->
</template>

<script>
import { Header, Indicator, Toast , Button, Cell, MessageBox } from 'bh-mint-ui';
import api from '../api.js';
import SDK from 'bh-mobile-sdk';
var errTipsInfo = {
    questioninfo:'请描述您遇到的问题',
    phone:'请输入正确的手机号',
    locationinfo:'请输入详细地址',
    breaks: '请输入故障类型',
    area: '请输入报修区域'
}
//根据不同的类型取数据
String.prototype.getTextLen = function() {
  let len = 0;
  for (var i = 0; i < this.length; i++) {
    if (this[i].match(/[^\x00-\xff]/ig) != null) len += 1;
    else len += 1;
  }
  return len
}
function validForm() {
  for(var i in this.form) {
    if(this.form[i] == '')
       return errTipsInfo[i];
    if(i == 'phone' && !this.form[i].match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)) {
      return errTipsInfo[i];
    }
    if(i == 'questioninfo' && this.form[i].getTextLen() > 100) {
      return '问题描述字数过长'
    }
  }
  return true;
}
export default {
  ready() {
    api.getRepaireAreaInfo.call(this);
    api.getRepairType.call(this);
  },
  methods: {
    debug: function() {
      this.debugnum +=1;
      if(this.debugnum == 10) {
        this.$router.go('debug');
      }
    },
    showActions() {
      let {UI: {actionSheet}} = SDK()
      actionSheet('上传图片', this.actions.map((action) => {
        return action.title
      }), (index) => {
        this.actions[index].action()
      })
    },
    takeCamera() {
      let takeCamera = BH_MOBILE_SDK.systemAbility.takeCamera
      takeCamera((ret) => {
        this.imgs = this.imgs.concat(ret)
      })
      this.uploadImgType = '拍照';
    },
    takePhoto() {
      let takePhoto = BH_MOBILE_SDK.systemAbility.takePhoto
      takePhoto((ret) => {
        this.imgs = this.imgs.concat(ret);
      }, this.imgLimit - this.imgs.length)
      this.uploadImgType = '相册';
    },
    deleteImg(index) {
      this.imgs.splice(index, 1)
    },
    previewImg(index) {
      BH_MOBILE_SDK.UI.preViewImages(this.imgs, index);
    },
    showpicker: function(val) {
      var _self = this;
      var multiPicker = SDK().UI && SDK().UI.multiPicker;
      var singleSelect = SDK().UI && SDK().UI.singleSelect;
      if(val == 'breaks') {
        singleSelect(this.GZLX, 0,function(data) {
          _self.form.breaks = _self.GZLX[data];
          _self.repair.breaks.val = _self.GZLX[data];
        })
      } else {
        multiPicker(this.returnArr, function(data) {
          data = data.split(',');
          _self.repair.loc.val = _self.mapArr[String(data[0]) + String(data[1])].id;
          _self.form.area = _self.mapArr[String(data[0]) + String(data[1])].name;
          _self.repair.area.val = _self.QYArr[String(data[0])].id;
        })
      }
    },
    uploadImage() {
      return BH_MOBILE_SDK.wisedu.uploadToEMAP(HOST, this.imgs.map(img => img.url)).then((result) => {
        return result
      }).catch((err) => {
        Toast('上传图片出错啦')
      })
    },
    save: function() {
      var result = validForm.call(this);
      if(result === true) {
        var options = {
          BXRSJ:this.form.phone,
          GZLX:this.repair.breaks.val,
          BXQY:this.repair.area.val,
          BXDD:this.repair.loc.val,
          XXDD:this.form.locationinfo,
          MS:this.form.questioninfo
        }
        if(this.imgs.length > 0) {
          Indicator.open();
          this.uploadImage().then((result) => {
            options.TP = result.token;
            Indicator.close();
            api.saveRepair.call(this,options)
          });
        } else {
          api.saveRepair.call(this,options)
        }
      }else {
        MessageBox('提示', result);
      }
    }
  },

  data() {
    return {
      debugnum:0,
      showToolbar: true,
      form: {
        questioninfo:'',
        phone:'',
        breaks: '',
        area: '',
        locationinfo:''
      },
      repair: {
        breaks: {
          map: '',
          val: ''
        },
        area: {
          map: '',
          val: ''
        },
        loc: {
          map: '',
          val: ''
        }
      },
      changeval: '请选择',
      isshowpicker: false,
      presentPicker:'',
      returnArr: [],
      mapArr: {},
      QYArr: [],
      GZLX: [],
      imgs: [],
      actions: [{
        title: '拍照',
        action: this.takeCamera
      }, {
        title: '从相册选择',
        action: this.takePhoto
      }],
      imgLimit: 3,
    };
  },
  components: {
    [Header.name]: Header,
    [Button.name]: Button,
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
  & .question-describe {
    overflow: auto;
    resize: none;
    vertical-align: top;
    width: 100%;
    height: 200px;
    font-size: 32px;
    border: none;
    padding: 15px 10px;
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
  font-size: 30px;
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
  height: 350px;
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
.post__imgs {
  /*padding: 30px;*/
  background-color: #fff;
  color: #eee;
  overflow: hidden;
  border-bottom: 1px solid #efefef;
}
.post__img {
  position: relative;
  float: left;
  width: 20%;
  box-sizing: border-box;
  margin: 10px;
}
.post__img .post__img-del {
  position: absolute;
  right: -10px;
  top: -10px;
  display: block;
  width: 40px;
  height: 40px;
  /*border-radius: 20px;*/
  text-align: center;
  line-height: 40px;
  font-size: 30px;
  background-color: #000;
  /*opacity: 0.7;*/
}
.post__img:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
.post__img img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.text-textarea {
  overflow: auto;
  resize: none;
  vertical-align: top;
  height: 100px;
  line-height: 1.2;
  font-size: 32px;
  border: none;
  padding: 25px 10px;
}
</style>
<style>
  .mint-cell-title {
    font-size: 28px;
  }
</style>
