<template>
  <div class="progress">
    <!--待处理-->
    <div class="status" v-if='status==="DCL"'>
      <div class="repair-progress">
        <div class="left">
          <div></div>
          <div></div>
        </div>
        <span class="middle middle-icon-yellow">
            <i class="iconMobile icon-loading"></i>
          </span>
        <div class="right">
          <div>
            <span class="next-step">待处理</span>
          </div>
          <div></div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>{{data.BXSJ.split(' ')[1]}}</div>
          <div>{{data.BXSJ.split(' ')[0]}}</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="last iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已提交</span>
          </div>
          <div>{{data.BXRXM}}提交报修</div>
        </div>
      </div>
    </div>
    <!--维修中-->
    <div class="status" v-if='status==="DWX"'>
      <div class="repair-progress">
        <div class="left">
          <div></div>
          <div></div>
        </div>
        <span class="middle middle-icon-yellow">
            <i class="iconMobile icon-loading"></i>
          </span>
        <div class="right">
          <div>
            <span class="next-step">维修中</span>
          </div>
          <div></div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>{{data.SLSJ.split(' ')[1]}}</div>
          <div>{{data.SLSJ.split(' ')[0]}}</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已受理</span>
          </div>
          <div>{{data.SLRXM}}受理报修</div>
          <div>指派给{{data.WXRXM}}</div>
          <div>{{data.WXRSJ}}</div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>{{data.BXSJ.split(' ')[1]}}</div>
          <div>{{data.BXSJ.split(' ')[0]}}</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="last iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已提交</span>
          </div>
          <div>{{data.BXRXM}}提交报修</div>
        </div>
      </div>
    </div>
    <!-- 已维修 -->
    <div class="status" v-if='status==="YWX"'>
      <div class="repair-progress">
        <div class="left">
          <div></div>
          <div></div>
        </div>
        <span class="middle middle-icon-yellow">
            <i class="iconMobile icon-loading"></i>
          </span>
        <div class="right">
          <div>
            <span class="next-step">待评价</span>
            <span class="btn">
              <span @click ="showPop">去评价</span>
            </span>
          </div>
          <div></div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>{{data.WXSJ.split(' ')[1]}}</div>
          <div>{{data.WXSJ.split(' ')[0]}}</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已维修</span>
          </div>
          <div>{{data.WXRXM}}完成报修</div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>{{data.SLSJ.split(' ')[1]}}</div>
          <div>{{data.SLSJ.split(' ')[0]}}</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已受理</span>
          </div>
          <div>{{data.SLRXM}}受理报修</div>
          <div>指派给{{data.WXRXM}}</div>
          <div>{{data.WXRSJ}}</div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>{{data.BXSJ.split(' ')[1]}}</div>
          <div>{{data.BXSJ.split(' ')[0]}}</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="last iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已提交</span>
          </div>
          <div>{{data.BXRXM}}提交报修</div>
        </div>
      </div>
    </div>
    <!-- 已退回 -->
    <div class="status" v-if='status==="YBH"'>
      <div class="repair-progress">
        <div class="left">
          <div>{{data.SLSJ.split(' ')[1]}}</div>
          <div>{{data.SLSJ.split(' ')[0]}}</div>
        </div>
        <span class="middle middle-icon-error">
            <i class="iconMobile icon-error"></i>
          </span>
        <div class="right">
          <div>
            <span class="next-step">已退回</span>
          </div>
          <div>{{data.SLRXM}}打回</div>
          <div>退回意见：{{data.BHYJ}}</div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>{{data.BXSJ.split(' ')[1]}}</div>
          <div>{{data.BXSJ.split(' ')[0]}}</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="last iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已提交</span>
          </div>
          <div>{{data.BXRXM}}提交报修</div>
        </div>
      </div>
    </div>
    <!-- 已评价 -->
    <div class="status" v-if='status==="YPJ"'>
      <div class="repair-progress">
        <div class="left">
          <div>{{data.WXSJ.split(' ')[1]}}</div>
          <div>{{data.WXSJ.split(' ')[0]}}</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span class="next-step">已评价</span>
          </div>
          <div>
            <span>评分</span>
            <tips class="comment-tips" :bxcommentpoints="data.PF"></tips>
          </div>
          <div>评论内容：{{data.BXRPJ}}</div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>{{data.WXSJ.split(' ')[1]}}</div>
          <div>{{data.WXSJ.split(' ')[0]}}</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已维修</span>
          </div>
          <div>{{data.WXRXM}}完成报修</div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>{{data.SLSJ.split(' ')[1]}}</div>
          <div>{{data.SLSJ.split(' ')[0]}}</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已受理</span>
          </div>
          <div>{{data.SLRXM}}受理报修</div>
          <div>指派给{{data.WXRXM}}</div>
          <div>{{data.WXRSJ}}</div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>{{data.BXSJ.split(' ')[1]}}</div>
          <div>{{data.BXSJ.split(' ')[0]}}</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="last iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已提交</span>
          </div>
          <div>{{data.BXRXM}}提交报修</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tips from './tips.vue';
export default {
  props: {
    status: {
      type: String
    },
    visible: {
      type: Boolean
    },
    grade: {
      type: Boolean
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      imgurl: global.IMGHOST,
      iswork: false,
      title: '',
      timezone: '',
      bxuser: '',
      bxuserid: '',
      bxuserphone: '',
      bxlocation: '',
      bxadminrply: '',
      bxcomment: '',
      bxcommentpoints: '',
      wxperson: {
        name: '',
        phone: ''
      },
      wid: '',
      sugg: '',
      tps: false,
      state: {
        adminreply: false,
        showgrade: false,
        worker: false,
        commentbutton: false,
        adminreplytips: false,
      }

    }
  },
  ready() {
    var progressDiv = document.getElementsByClassName('repair-progress');
    var icon = document.getElementsByClassName('middle');
    for (let i = 0 , len = progressDiv.length ; i <len ; i++) {
      let hight = progressDiv[i].clientHeight;
      icon[i].style.backgroundColor="black";
    }
  },
  methods: {
    showPop() {
      this.visible = true;
      this.grade = true;
    }
  },
  components: {
    tips
  }
}
</script>
<style scoped>
.progress {
  background-color: #fff;
  & .repair-progress {
    padding: 30px;
    display: flex;
    align-items: top;
    min-height: 150Px;
    & .left {
      margin-left: 20px;
      text-align: right;
      font-size: 26px;
      color: #BDC0C5;
      width: 160px;
      & div {
        width: 100%;
      }
    }
    & .middle-icon-green {
      flex: 0 0 auto;
      display: inline-block;
      margin-left: 20px;
      margin-right: 20px;
      background-color: #06c1ae;
      width: 24Px;
      height: 24Px;
      border-radius: 50%;
      text-align: center;
      & i {
        font-size: 40px;
        position: relative;
        color: #fff;
        &:after {
          position: absolute;
          height: 126Px;
          left: 19px;
          right: 18px;
          top: 23Px;
          background: #e8e8e8;
          content: ''
        }
      }
    }
    & .middle-icon-yellow {
      flex: 0 0 auto;
      display: inline-block;
      margin-left: 20px;
      margin-right: 20px;
      background-color: #ffb200;
      width: 24Px;
      height: 24Px;
      border-radius: 50%;
      & i {
        font-size: 35px;
        position: relative;
        color: #fff;
        top: 2px;
        left: 4px;
        &:after {
          position: absolute;
          height: 126Px;
          left: 9Px;
          right: 9Px;
          top: 22Px;
          background: #E8E8E8;
          content: ''
        }
      }
    }
    & .middle-icon-error {
      flex: 0 0 auto;
      display: inline-block;
      margin-left: 20px;
      margin-right: 20px;
      background-color: #ff571a;
      width: 24Px;
      height: 24Px;
      overflow: hidden;
      border-radius: 50%;
      flex: 0 0 auto;
      & i {
        font-size: 35px;
        position: relative;
        color: #fff;
        top: 2px;
        left: 2px;
        &:after {
          position: absolute;
          height: 126Px;
          left: 11px;
          right: 15px;
          top: 21Px;
          background: #E8E8E8;
          content: ''
        }
      }
    }
    & .right {
      font-size: 26px;
      color: #BDC0C5;
      width: 50%;
      & div {
        word-break: break-all;
      }
      & .btn {
        color: #06C1AE;
        font-size: 22px;
        & span {
          border-radius: 12Px;
          padding: 4px 12px 6px 12px;
          display: inline-block;
          border: 1px solid #BAFFF6;
        }
      }
    }
  }
}

.last {
  font-size: 40px;
  position: relative;
  color: #fff;
  &:after {
    content: '';
    position: absolute;
    height: 0px!important;
    left: 19px;
    right: 18px;
    top: 23Px;
    background: #e8e8e8;
  }
}

.next-step {
  color: #1E2329;
}
</style>
