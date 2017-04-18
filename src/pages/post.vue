<template>
  <div class="main">
    <textarea class="question-describe" placeholder="请描述您遇到的问题" rows="5" v-model="form.questioninfo"></textarea>
    <span class="question-describe-holder">{{form.questioninfo.length}}/100</span>
    <div class="post__imgs">
      <div class="post__img" v-for="img in imgs">
        <img @click="previewImg($index)" :src="img.base64">
        <span @click="deleteImg($index)" class="post__img-del"><img src="../components/img/delete.png"/></span>
      </div>
      <div class="post__img" @click="showActions" v-if="imgs.length < imgLimit">
        <img src="../components/img/post1.png" />
      </div>
    </div>
    <div class="list-item first-item">
      <label class="item-left phone-label" @click="debug">手机号</label>
      <input type="tel" class="phone-number" placeholder="请填写手机号" v-model="form.phone">
    </div>
    <div class="list-item first-item">
      <label class="item-left">故障类型</label>
      <span class="item-right text-input" @click="showpicker('breaks')">
        <span>{{ form.breaks ? form.breaks : '请选择' }}</span>
      <i class="iconfont icon-keyboardarrowright"></i>
      </span>
    </div>
    <div class="list-item first-item">
      <label class="item-left">故障区域</label>
      <span class="item-right text-input" @click="showpicker('area')">
        <span>{{ form.area ? form.area : '请选择' }}</span>
      <i class="iconfont icon-keyboardarrowright"></i>
      </span>
    </div>
    <div class="list-item first-item" style="margin-top: 0;display:flex">
      <label class="item-left">详细地址</label>
      <textarea class="item-right text-textarea" placeholder="请填写详细地址" v-model="form.locationinfo"></textarea>
    </div>
    <div class="btn">
      <mt-button class="save-button cancel" @click="cancel">取消</mt-button>
      <mt-button type="primary" class="save-button" @click="save">提交</mt-button>
    </div>
  </div>
</template>
<script>
import {
  Header,
  Indicator,
  Toast,
  Button,
  Cell,
  MessageBox
} from 'bh-mint-ui';
import api from '../api.js';
import SDK from 'bh-mobile-sdk';
var errTipsInfo = {
    questioninfo: '请描述您遇到的问题',
    phone: '请输入正确的手机号',
    locationinfo: '请输入详细地址',
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
  for (var i in this.form) {
    if (this.form[i] == '')
      return errTipsInfo[i];
    if (i == 'phone' && !this.form[i].match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)) {
      return errTipsInfo[i];
    }
    if (i == 'questioninfo' && this.form[i].getTextLen() > 100) {
      return '问题描述字数过长'
    }
  }
  return true;
}
export default {
  ready() {
      var config = {
        left: {
          left1: {
            title: '',
            callFunction: function() {
              history.back();
            }
          }
        }
      };
      BH_MOBILE_SDK.UI.setNavHeader(config);
      BH_MOBILE_SDK.UI.setTitleText('我要报修');
      api.getRepaireAreaInfo.call(this);
    },
    methods: {
      cancel() {
        history.back();
      },
      debug: function() {
        this.debugnum += 1;
        if (this.debugnum == 10) {
          this.$router.go('debug');
        }
      },
      showActions() {
        let {
          UI: {
            actionSheet
          }
        } = SDK()
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
        if (val == 'breaks') {
          multiPicker(this.returnTypeArr, function(data) {
            data = data.split(',');
            _self.type.loc.val = _self.mapTypeArr[String(data[0]) + String(data[1])].id;
            _self.form.breaks = _self.mapTypeArr[String(data[0]) + String(data[1])].name;
            _self.type.area.val = _self.GZLX[String(data[0])].id;
          })
        } else {
          multiPicker(this.returnArr, function(data) {
            data = data.split(',');
            _self.repair.loc.val = _self.mapArr[String(data[0]) + String(data[1])].id; //code
            _self.form.area = _self.mapArr[String(data[0]) + String(data[1])].name; //name
            _self.repair.area.val = _self.QYArr[String(data[0])].id; //parent code
          })
        }
      },
      uploadImage() {
        // TODO
        return BH_MOBILE_SDK.wisedu.uploadToEMAP(HOST, this.imgs.map(img => img.url)).then((result) => {
          return result
        }).catch((err) => {
          Toast('上传图片出错啦')
          Toast(err)
          Indicator.close()
        })
      },
      save: function() {
        var result = validForm.call(this);
        if (result === true) {
          var options = {
            BXRSJ: this.form.phone,
            GZLX: this.type.loc.val,
            BXQY: this.repair.area.val, //TODO
            BXDD: this.repair.loc.val, //TODO
            XXDD: this.form.locationinfo,
            MS: this.form.questioninfo
          }
          if (this.imgs.length > 0) {
            Indicator.open();
            this.uploadImage().then((result) => {
              options.TP = result.token;
              Indicator.close();
              api.saveRepair.call(this, options)
            });
          } else {
            api.saveRepair.call(this, options)
          }
        } else {
          Toast(result)
        }
      }
    },

    data() {
      return {
        debugnum: 0,
        showToolbar: true,
        form: {
          questioninfo: '',
          phone: '',
          breaks: '',
          area: '',
          locationinfo: ''
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
        type: {
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
        presentPicker: '',
        returnArr: [],
        mapArr: {},
        returnTypeArr: [],
        mapTypeArr: {},
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
}

.main {
  & .title {
    height: 70px;
    background: #F2F2F4;
    font-size: 28px;
    color: #92969C;
    line-height: 70px;
    padding-left: 30px;
  }
  & .question-describe {
    overflow: auto;
    resize: none;
    vertical-align: top;
    width: 100%;
    height: 200px;
    font-size: 28px;
    border: none;
    padding: 15px 30px;
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
  border-top: 1Px solid #eaeaea;
}

.list-item {
  background-color: #fff;
}

.item-left {
  display: inline-block;
  width: 25%;
  height: 100px;
  text-align: left;
  color: #403F44;
  padding-left: 30px;
  font-size: 28px;
  line-height: 100px;
}

.item-right {
  display: inline-block;
  width: 70%;
  height: 100px;
  line-height: 100px;
}

.mint-cell-text-fix {
  padding-left: 30px;
}

.text-input {
  padding: 0;
  font-size: 30px;
  border: 0;
  color: darkgrey;
  & i {
    font-size: 40px;
    float: right;
    color: #BDC0C5;
  }
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

.btn {
  width: 100%;
  display: flex;
  align-items: center;
  height: 120px;
  border-top: 1Px solid #E8E8E8;
}

.save-button {
  top: 20px;
  border-radius: 0;
  width: calc(50% - 52px);
  border-radius: 10px;
}

.cancel {
  margin-left: 40px;
  margin-right: 24px;
}

.post__imgs {
  padding-left: 30px;
  background-color: #fff;
  color: #eee;
  overflow: hidden;
  /*border-bottom: 1px solid #efefef;*/
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
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  font-size: 30px;
  background-color: #000;
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
  vertical-align: middle;
  height: 180px;
  line-height: 1.2;
  font-size: 30px;
  border: none;
  padding: 30px 0;
  color: darkgrey;
}

.phone-label {
  position: relative;
  top: 4px;
}

.phone-number {
  display: inline-block;
  width: 62%;
  padding: 0;
  font-size: 30px;
  border: 0;
  color: darkgrey;
  height: 100px;
}
</style>
<style>
.mint-cell-title {
  font-size: 28px;
}
</style>
