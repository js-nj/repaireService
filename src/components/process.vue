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
          <div><a href="tel:{{data.WXRSJ}}">{{data.WXRSJ}}</a></div>
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
          <div><a href="tel:{{data.WXRSJ}}">{{data.WXRSJ}}</a></div>
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
          <div><a href="tel:{{data.WXRSJ}}">{{data.WXRSJ}}</a></div>
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
a {
  text-decoration: none;
  color: #06c1ae;
}

.progress {
  background-color: #fff;
  & .repair-progress {
    margin: 30px;
    display: flex;
    align-items: top;
    min-height: 150Px;
    position: relative;
    & .left {
      margin-left: 20px;
      text-align: right;
      font-size: 26px;
      color: #BDC0C5;
      width: 30%;
      & div {
        width: 100%;
      }
    }
    & .middle {
      flex: 0 0 auto;
      margin-left: 20px;
      margin-right: 20px;
      width: 24Px;
      height: 24Px;
      border-radius: 50%;
      text-align: center;
      & i {
        font-size: 36px;
        color: #fff;
      }
    }
    & .middle-icon-green {
      background-color: #06c1ae;
      & i {}
    }
    & .middle-icon-yellow {
      background-color: #ffb200;
      & i {
        position: relative;
        top: 2px;
      }
    }
    & .middle-icon-error {
      background-color: #ff571a;
      & i {
        position: relative;
        font-size: 32px;
        top: 4px;
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
          border: 1Px solid #BAFFF6;
        }
      }
    }
    &:after {
      position: absolute;
      height: 100%;
      left: calc(30% + 60px);
      width: 1.5Px;
      top:24Px;
      background: #e8e8e8;
      content: '';
    }
    &:last-child:after {
      position: absolute;
      height: 100%;
      left: calc(30% + 60px);
      width: 0Px;
      top:24Px;
      background: red;
      content: '';
    }
  }
}

.next-step {
  color: #1E2329;
}
</style>
