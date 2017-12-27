<template>
  <div class="page-navbar">
    <mt-navbar v-model="selected" v-show="isShowNavbar">
      <mt-tab-item id="1">待接单</mt-tab-item>
      <mt-tab-item id="2">待维修</mt-tab-item>
      <mt-tab-item id="3">挂起维修</mt-tab-item>
      <mt-tab-item id="4">已完工</mt-tab-item>
    </mt-navbar>
    <div class="wi-edit-content" v-show="!isShowNavbar">
      <div class="wi-edit-head">已选择 {{selectedItems.length}}</div>
      <span class="wi-edit-cancel" @click="cancel">取消</span>
    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="wi-tabContainer-item" :class="{'wi-tabContainer-item-edit':!isShowNavbar}">
          <!-- <div v-for="n in data1"  :key="n.WID" @click="messageInfo(n)">
              <mt-cell-swipe
              :left="[
                {
                  style: { color: '#333' },
                  handler:''
                }
              ]" :check="checkFlag1"  class="wi-item">
                  <label slot="left" class="mint-checklist-label">
                    <span class="mint-checkbox">
                      <input type="checkbox" class="mint-checkbox-input" v-model="selectedItems" :value="n.WID">
                      <span class="mint-checkbox-core"></span>
                    </span>
                  </label>
                  <div slot='title' class="wi-item-head">
                    <mt-badge size="normal">{{n.GZLX_DISPLAY}}</mt-badge>
                    <div class="wi-item-title">{{n.BXDD_DISPLAY}}-{{n.BXQY_DISPLAY}}-{{n.XXDD}}</div>
                    <div class="wi-item-des">{{n.BXSJ}}</div>
                    <div class="wi-item-des">{{n.MS}}</div>
                  </div>
                  <div slot="icon" style="float:right;">
                    <img class="wi-item-img" :src="returnImgUrl(n.TP)" />
                  </div>
              </mt-cell-swipe>
          </div> -->
          <div v-for="n in data1" :key="n.WID" @click="messageInfo(n)" >
              <mt-cell  class="wi-item">
                <div slot='title' class="wi-item-head">
                      <mt-badge size="normal">{{n.GZLX_DISPLAY}}</mt-badge>
                      <div class="wi-item-title">{{n.BXDD_DISPLAY}}-{{n.BXQY_DISPLAY}}-{{n.XXDD}}</div>
                      <div class="wi-item-des">{{n.BXSJ}}</div>
                      <div class="wi-item-des">{{n.MS}}</div>
                </div>
                <div slot="icon" style="float:right;">
                  <img class="wi-item-img" :src="returnImgUrl(n.TP)" />
                </div>
            </mt-cell>
          </div>
          <div v-if="data1.length===0" class="no-data">
            <img src="../components/img/no_data.png">
            <span>还没有报修订单呢</span>
          </div>
        </div>
        <div v-show="!isShowNavbar" class="wi-buttons">
          <mt-button type="primary" class="wi-button wi-button-1" size="large" @click="saveJd">接单</mt-button>
          <i class="iconfont icon-gengduo wi-icon-more" @click="showActionSheet"></i>
        </div>
        <mt-actionsheet
          :actions="iconActions"
          v-model="sheetVisible">
        </mt-actionsheet>
        <mt-popup
          v-model="popupVisible"
          position="bottom"
          popup-transition="popup-fade">
          <div style="overflow:auto;">
            <span class="pop-button" style="float:left;" @click="cancelPop">取消</span>
            <span class="pop-button" :class="{'pop-button-ok':isPopButtonOk}" style="float:right;" @click="submitPop(selected)">提交</span>
          </div>
          <mt-field label="" placeholder="请填写理由" type="textarea" rows="6" v-model="introduction"></mt-field>
        </mt-popup>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="wi-tabContainer-item" :class="{'wi-tabContainer-item-edit':!isShowNavbar}">
          <div v-for="n in data2"  :key="n.WID" @click="messageInfo(n)">
              <mt-cell-swipe
              :left="[
                {
                  style: { color: '#333' },
                  handler:''
                }
              ]" :check="checkFlag2"  class="wi-item">
                  <label slot="left" class="mint-checklist-label">
                    <span class="mint-checkbox">
                      <input type="checkbox" class="mint-checkbox-input" v-model="selectedItems" :value="n.WID">
                      <span class="mint-checkbox-core"></span>
                    </span>
                  </label>
                  <div slot='title' class="wi-item-head">
                    <mt-badge size="normal">{{n.GZLX_DISPLAY}}</mt-badge>
                    <div class="wi-item-title">{{n.BXDD_DISPLAY}}-{{n.BXQY_DISPLAY}}-{{n.XXDD}}</div>
                    <div class="wi-item-des">{{n.BXSJ}}</div>
                    <div class="wi-item-des">{{n.MS}}</div>
                  </div>
                  <div slot="icon" style="float:right;">
                    <img class="wi-item-img" :src="returnImgUrl(n.TP)" />
                  </div>
              </mt-cell-swipe>
          </div>

          <div v-if="data2.length===0" class="no-data">
            <img src="../components/img/no_data.png">
            <span>还没有报修订单呢</span>
          </div>
        </div>
        <div v-show="!isShowNavbar" class="wi-buttons">
          <mt-button type="primary" class="wi-button wi-button-2" size="large" @click="actionComplete2">完工</mt-button>
          <mt-button type="default" class="wi-button wi-button-2" size="large" @click="actionHandUp2">挂起维修</mt-button>
        </div>
        <mt-popup
          v-model="popupVisible2"
          position="bottom"
          popup-transition="popup-fade">
          <div style="overflow:auto;">
            <span class="pop-button" style="float:left;" @click="cancelPop2">取消</span>
            <span class="pop-button" :class="{'pop-button-ok':isPopButtonOk2}" style="float:right;" @click="submitPop2(selected)">提交</span>
          </div>
          <mt-field label="" placeholder="请填写理由" type="textarea" rows="6" v-model="introduction2"></mt-field>
        </mt-popup>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="wi-tabContainer-item" :class="{'wi-tabContainer-item-edit':!isShowNavbar}">
          <!-- <div v-for="n in data3" :key="n.WID" @click="messageInfo(n)">
              <mt-cell-swipe
              :left="[
                {
                  style: { color: '#333' },
                  handler:''
                }
              ]" :check="checkFlag3"  class="wi-item">
                  <label slot="left" class="mint-checklist-label">
                    <span class="mint-checkbox">
                      <input type="checkbox" class="mint-checkbox-input" v-model="selectedItems" :value="n.WID">
                      <span class="mint-checkbox-core"></span>
                    </span>
                  </label>
                  <div slot='title' class="wi-item-head">
                    <mt-badge size="normal">{{n.GZLX_DISPLAY}}</mt-badge>
                    <div class="wi-item-title">{{n.BXDD_DISPLAY}}-{{n.BXQY_DISPLAY}}-{{n.XXDD}}</div>
                    <div class="wi-item-des">{{n.BXSJ}}</div>
                    <div class="wi-item-des">{{n.MS}}</div>
                  </div>
                  <div slot="icon" style="float:right;">
                    <img class="wi-item-img" :src="returnImgUrl(n.TP)" />
                  </div>
              </mt-cell-swipe>
          </div> -->
          <div v-for="n in data3" :key="n.WID" @click="messageInfo(n)" >
              <mt-cell  class="wi-item">
                <div slot='title' class="wi-item-head">
                      <mt-badge size="normal">{{n.GZLX_DISPLAY}}</mt-badge>
                      <div class="wi-item-title">{{n.BXDD_DISPLAY}}-{{n.BXQY_DISPLAY}}-{{n.XXDD}}</div>
                      <div class="wi-item-des">{{n.BXSJ}}</div>
                      <div class="wi-item-des">{{n.MS}}</div>
                </div>
                <div slot="icon" style="float:right;">
                  <img class="wi-item-img" :src="returnImgUrl(n.TP)" />
                </div>
            </mt-cell>
          </div>
          <div v-if="data3.length===0" class="no-data">
            <img src="../components/img/no_data.png">
            <span>还没有报修订单呢</span>
          </div>
        </div>
        <div v-show="!isShowNavbar" class="wi-buttons">
          <mt-button type="primary" class="wi-button wi-button-12" size="large" @click="saveJxwxUrl">继续维修</mt-button>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <div class="wi-tabContainer-item">
          <div v-for="n in data4" :key="n.WID" @click="messageInfo(n)" >
              <mt-cell  class="wi-item">
                <div slot='title' class="wi-item-head">
                      <mt-badge size="normal">{{n.GZLX_DISPLAY}}</mt-badge>
                      <div class="wi-item-title">{{n.BXDD_DISPLAY}}-{{n.BXQY_DISPLAY}}-{{n.XXDD}}</div>
                      <div class="wi-item-des">{{n.BXSJ}}</div>
                      <div class="wi-item-des">{{n.MS}}</div>
                </div>
                <div slot="icon" style="float:right;">
                  <img class="wi-item-img" :src="returnImgUrl(n.TP)" />
                </div>
            </mt-cell>
          </div>
          <div v-if="data4.length===0" class="no-data">
            <img src="../components/img/no_data.png">
            <span>还没有报修订单呢</span>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <!-- <i class="wi-edit-icon iconfont icon-edit"  v-show="isShowNavbar" @click="edit"></i> -->
    <div v-if="returnDataLength()">
      <div  class="wi-edit-icon" v-if="isShowNavbar && selected == '2'" @click="edit">
          <img class="wi-edit-img" :src="'static/assets/edit.png'" />
          <span class="wi-edit-span" style="">编辑</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Loadmore,Navbar, TabItem,Cell,Badge,Checkbox,Toast} from "bh-mint-ui2";
import API from "../api.js";
import axios from 'axios';
export default {
  data() {
    return {
      selected: '1',
      checkFlag1:false,
      checkFlag2:false,
      checkFlag3:false,
      data1:[],
      data2:[],
      data3:[],
      data4:[],
      isShowNavbar:true,
      selectedItems:[],
      sheetVisible:false,
      iconActions:[{name:'挂起',method:this.actionHandUp},{name:'拒绝',method:this.actionReject}],
      introduction:'',
      popupVisible:false,
      introduction2:'',
      popupVisible2:false,
      popAction:'',
      isPopButtonOk:false
    };
  },
  // computed:{
  //   isShowNavbar:function (params) {
  //     if (!params) {
  //       return false;
  //     } else {
  //       var objData = 'data'+this.selected;
  //       if (this[objData].length>0) {
  //         return true;
  //       }else {
  //         return false;
  //       }
  //     }
  //   }
  // },
  created(){
    //默认展示待接单列表
    this.getMyDisrepairList(1);
  },
  watch:{
    selectedItems:function(n){
      console.log(n)
    },
    selected:function(n){
      var that = this;
      console.log('当前tab页：'+n)
      if(n == '4'){
        // setTimeout(function(){
        //   if (document.querySelector('.wi-edit-icon')) {
        //     document.querySelector('.wi-edit-icon').style='display:none;';
        //   }
        // },100);
        that.getMyDisrepairYbList(n);
      }else {
        // setTimeout(function(){
        //   if (document.querySelector('.wi-edit-icon')) {
        //     document.querySelector('.wi-edit-icon').style='display:block;';
        //   }
        // },100);
        that.getMyDisrepairList(n);//前三个tab页是同一个接口，待接单，待维修，挂起维修
      }
    },
    introduction:function(n){
      if(n && n.length && n.length>0){
        this.isPopButtonOk = true;
      }else {
        this.isPopButtonOk = false;
      }
    },
    introduction2:function(n){
      if(n && n.length && n.length>0){
        this.isPopButtonOk2 = true;
      }else {
        this.isPopButtonOk2 = false;
      }
    }
  },
  methods:{
    getChangedCheck:function(e){
      console.log(e)
    },
    edit:function(){
      this.selectedItems = [];
      this['checkFlag'+this.selected] = true;
      this.isShowNavbar = false;
    },
    cancel:function(){
      this['checkFlag'+this.selected] = false;
      this.selectedItems = [];
      this.isShowNavbar = true;
    },
    showActionSheet:function(){
      this.sheetVisible = true;
    },
    actionHandUp:function(){
      this.popupVisible = true;
      this.popAction = "handup";
    },
    actionReject:function(){
      this.popupVisible = true;
      this.popAction = "reject";
    },
    actionHandUp2:function(){
      this.popupVisible2 = true;
      this.popAction = "handup";
    },
    actionComplete2:function(){
      this.popupVisible2 = true;
      this.popAction = "complete";
    },
    cancelPop:function(){
      this.popupVisible = false;
      this.introduction = '';
    },
    submitPop:function(tab){
      this.popupVisible = false;
      if (this.popAction == 'reject') {
        this.saveTd(this.getMyDisrepairList);
      } else if (this.popAction == 'handup'){
        this.batchUpDwx(this.getMyDisrepairList);
      }
      this.cancel();
      //this.getMyDisrepairList(1);
    },
    cancelPop2:function(){
      this.popupVisible2 = false;
      this.introduction2 = '';
    },
    submitPop2:function(tab){
      this.popupVisible2 = false;
      if (this.popAction == 'complete') {
        this.completeOrders();
        //this.saveTd(this.getMyDisrepairList);
      } else if (this.popAction == 'handup'){
        this.batchUpDwx(this.getMyDisrepairList);
      }
      //this.cancel2();
      //this.getMyDisrepairList(1);
    },
    messageInfo: function(item) {
      console.log(item)
      let options = {
        wid: item.WID,
        id:this.selected,
        iswork: true,
        detail:item
      }
      this.$router.push({
        name: 'repairInfo',
        params: {
          info: JSON.stringify(options)
        }
      })
    },
    getMyDisrepairList:function(n){
      //debugger
      var that= this;
      var requestParam = ['DFP','DWX','UPDWX'];//来自乔杰-王凯-山东区 [待接单，待维修，挂起维修]
      axios({
        method:'GET',
        url:API.getMyDisrepairList,
        params: {
          ZT:requestParam[Number(n) - 1]
        }
      }).then(function(data){
        if (data.data.code == '0' || data.data.code == '200') {
          if (data.data.datas.wxryjmbg.rows) {
            that['data'+n] = data.data.datas.wxryjmbg.rows;
          } else {
            Toast('getMyDisrepairList返回值结构有问题！');
          }
        }else {
          Toast('获取'+ requestParam[Number(n) - 1] +'类型数据失败！');
        }
      });
    },
    getMyDisrepairYbList:function(){
      var that = this;
      axios({
        method:'GET',
        url:API.getMyDisrepairYbList,
        params: {}
      }).then(function(data){
        if (data.data.code == '0' || data.data.code == '200') {
          if (data.data.datas.wxryjmbgyb.rows) {
            that['data4'] = data.data.datas.wxryjmbgyb.rows;
          } else {
            Toast('getMyDisrepairYbList返回值结构有问题！');
          }
        }else {
          Toast('获取已完成数据失败！');
        }
      });
    },
    saveJd:function(){
      var that= this;
      if (that.selectedItems.length>0) {
        axios({
          method:'POST',
          url:API.saveJd,
          params: {
            BZ:'',
            WID:that.selectedItems.join(','),
            USERID:window.USERID
          }
        }).then(function(data){
          if (data.data.success == true) {
            Toast('已接单！');
            that.cancel();
            that.getMyDisrepairList(1);
          }else {
            Toast('接单失败！');
          }
        });
      } else {
        Toast('请至少选择一个单子奥~');
      }
    },
    saveTd:function(cb){
      var that= this;
      if (that.selectedItems.length>0) {
        axios({
          method:'POST',
          url:API.saveTd,
          params: {
            BZ:that.introduction,
            WID:that.selectedItems.join(','),
            USERID:window.USERID
          }
        }).then(function(data){
          if (data.data.success == true) {
            Toast('已拒单！');
            that.cancel();
            cb && cb(that.selected);
          }else {
            Toast('拒单失败！');
          }
        });
      } else {
        Toast('请至少选择一个单子奥~');
        //debugger
      }
    },
    saveJxwxUrl:function(cb){
        var that= this;
        if (that.selectedItems.length>0) {
          axios({
            method:'POST',
            url:API.saveJxwxUrl,
            params: {
              WID:that.selectedItems.join(','),
              USERID:window.USERID
            }
          }).then(function(data){
            if (data.data.success == true) {
              Toast('已继续维修！');
              that.cancel();
              that.getMyDisrepairList(that.selected);
            }else {
              Toast('继续维修失败！');
            }
          });
        }else {
          Toast('请至少选择一个单子奥~');
          //debugger
        }
    },
    batchUpDwx:function(cb){
      var that= this;
      if (that.selectedItems.length>0) {
        var options = {
          BZ:that.introduction2,
          WIDS:that.selectedItems.join(','),
          USERID:window.USERID,
          FLAG:'multi'
        };
        if (that.selectedItems.length == 1) {
          options.FLAG = 'single';
        }
        axios({
          method:'POST',
          url:API.batchUpDwx,
          params: options
        }).then(function(data){
          if (data.data.success == true) {
            Toast('已挂起维修单！');
            that.cancel();
            cb && cb(that.selected);
          }else {
            Toast('挂起维修单失败！');
          }
        });
      } else {
        Toast('请至少选择一个单子奥~');
      }
    },
    completeOrders:function(){
      var that = this;
      if (that.selectedItems.length>0) {
        var options = {
          WIDS:that.selectedItems.join(','),
          USERID:window.USERID,
          FLAG:'multi'
        };
        if (that.selectedItems.length == 1) {
          options.FLAG = 'single';
        }
        axios({
          method:'POST',
          url:API.completeOrders,
          params: options}).then(function(data) {
            if (data.data.success == true) {
              Toast('已完工');
              that.cancel();
              that.getMyDisrepairList(that.selected);
            } else {
              Toast('完工失败');
            }
          }, function(err) {
            Toast('完工维修单失败');
          });
      }else {
        Toast('请至少选择一个单子奥~');
      }
      
    },
    returnImgUrl:function(url){
      return WEBPACK_CONIFG_HOST + '/sys/emapcomponent/file/getFileByToken/' + url + '.do'
    },
    returnDataLength:function(){
      return this['data'+this.selected].length;
    }
  },
  components: {
    [Cell.name]: Cell,
    [TabItem.name]: TabItem,
    [Navbar.name]: Navbar,
    [Loadmore.name]: Loadmore,
    [Badge.name]: Badge,
    [Checkbox.name]: Checkbox,
    [Toast.name]: Toast
    //MtCellSwipe
  }
};
</script>
<style>
.wi-tabContainer-item {
  height:calc(100vh - 52PX);
  overflow: auto;
}
.wi-tabContainer-item-edit {
  height:calc(100vh - 112PX);
}
.wi-item-head {
  padding: 8PX 16PX;
}
.wi-item-head .mint-badge.is-size-normal {
  border-radius: 4PX;
  font-size: 12PX;
  height: 16PX;
  line-height: 16PX;
}
 .wi-item-title {
   font-size: 16PX;
    /* font-weight: 600; */
    padding: 8PX 0;
 }
 .wi-item-des {
   padding: 0PX 0 8PX 0;
    color: #999;
    font-size: 12PX;
 }
 .wi-item-img {
   margin-top:14PX;
   width:80PX;height:80PX;
 }
 .wi-edit-icon {
  position: fixed;
  background: #06c1ae;
  height: 46PX;
  width: 46PX;
  border: none;
  color: #fff;
  text-align: center;
  /* line-height: 80PX; */
  border-radius: 40PX;
  bottom: 20PX;
  right: 20PX;
  font-family: "iconfont" !important;
  color: #e8e9ec;
  /* font-size: 40px; */
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2PX;
  -moz-osx-font-smoothing: grayscale;
 }
 .wi-edit-head {
   width:25%;
  float: left;
 }
 .wi-edit-cancel {
   float: right;
   height: 52PX;
   line-height: 52PX;
 }
 .wi-edit-head .mint-cell-wrapper {
   border:none;
 }
 .wi-edit-content {
   overflow:hidden;
   padding: 0 16PX;
    height: 52PX;
    line-height: 52PX;
 }


.mint-checklist-label {
    display: block;
    padding: 0 10PX;
        font-size: 16PX;
    line-height: 1;
}
.mint-checkbox-input {
    display: none;
}
[type=checkbox], [type=radio] {
    box-sizing: border-box;
    padding: 0;
}
/* input, textarea {
    -webkit-user-modify: read-write-plaintext-only;
}
input, select, textarea {
    outline: 0;
}
button, input {
    overflow: visible;
}
button, input, optgroup, select, textarea {
    color: inherit;
    font: inherit;
    margin: 0;
    vertical-align: middle;
} */
.mint-checkbox-core {
    display: inline-block;
    background-color: #fff;
    border-radius: 100%;
    border: 1PX solid #ccc;
    position: relative;
    width: 20PX;
    height: 20PX;
    vertical-align: middle;
}
.mint-checkbox-core:after {
    border: 2PX solid transparent;
    border-left: 0;
    border-top: 0;
    content: " ";
    top: 3PX;
    left: 6PX;
    position: absolute;
    width: 4PX;
    height: 8PX;
    -webkit-transform: rotate(45deg) scale(0);
    transform: rotate(45deg) scale(0);
    -webkit-transition: -webkit-transform .2s;
    transition: -webkit-transform .2s;
    transition: transform .2s;
    transition: transform .2s,-webkit-transform .2s;
}
.mint-checkbox-input:checked+.mint-checkbox-core {
    background-color: #26a2ff;
    border-color: #26a2ff;
}
.mint-checkbox-input:checked+.mint-checkbox-core:after {
    border-color: #fff;
    -webkit-transform: rotate(45deg) scale(1);
    transform: rotate(45deg) scale(1);
}
.wi-item .mint-cell-swipe-buttongroup {
  border-top:0.5px solid #e8e8e8;
}
.wi-item .mint-cell-swipe-buttongroup .mint-checklist-label {
    position: relative;
    top: calc(50% - 22px);
}
.wi-buttons {
      position: fixed;
    bottom: 0PX;
    left: 0PX;
    right: 0PX;
    height: 60PX;
    background: #fff;
    border-top: solid 1px #ddd;
}
.wi-button {
    margin: 8PX 0 0 8PX;
    border-radius: 6PX;
    display: inline-block;
}
.wi-button-1 {
  width: 85%;
}
.wi-button-2 {
  width: 46%;
}
.wi-button-12 {
  width: 88%;
  display:block;
  margin:8PX auto 0 auto;
}
.wi-icon-more {
  position:relative;
  left:8PX;
}
.wi-tabContainer-item .wi-item:last-child {
  border-bottom:solid 0.5px #e8e8e8;
}
.pop-button {
  color:#999;padding:4PX 16PX;font-size:14PX;
}
.pop-button-ok {
  color:#06c1ae;
}
.wi-edit-img {
 width: 16PX;
    display: block;
    margin: 8PX auto 0 auto;
}
.wi-edit-span {
  font-size:12PX;
  color:#fff;
}
.is-textarea .mint-cell-wrapper {
  padding-right: 0PX !important;
}
.no-data {
    display: flex;
    width: 100vw;
    /* height: 100vh; */
    background-color: #fff;
    flex-direction: column;
    align-items: center;
  }
  .no-data img {
    width: 200px;
    margin-top: 240px;
    margin-bottom: 30px;
  }
  .no-data span {
    font-size: 26px;
  }
</style>
