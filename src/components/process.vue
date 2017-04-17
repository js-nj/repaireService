<template>
  <div class="progress">
    <!--待处理-->
    <div class="status" v-if='status==="DCL"'>
      <div class="repair-progress">
        <div class="left">
          <div></div>
          <div></div>
        </div>
        <span class=" middle-icon-yellow">
            <i class="middle iconMobile icon-loading"></i>
          </span>
        <div class="right">
          <div>
            <span>待处理</span>
          </div>
          <div></div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>12:01</div>
          <div>2016.09.09</div>
        </div>
        <span class="middle-icon-green">
            <i class="last middle iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已提交</span>
          </div>
          <div>王秋实提交报修</div>
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
            <span>维修中</span>
          </div>
          <div></div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>12:01</div>
          <div>2016.09.09</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已受理</span>
          </div>
          <div>贺平清受理报修</div>
          <div>指派给贺平清</div>
          <div>15062180721</div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>12:01</div>
          <div>2016.09.09</div>
        </div>
        <span class="middle-icon-green">
            <i class="last iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已提交</span>
          </div>
          <div>王秋实提交报修</div>
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
        <span class="middle-icon-yellow">
            <i class="iconMobile icon-loading"></i>
          </span>
        <div class="right">
          <div>
            <span>待评价</span>
            <span class="btn">
              <span @click ="showPop">去评价</span>
            </span>
          </div>
          <div></div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>12:01</div>
          <div>2016.09.09</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已维修</span>
          </div>
          <div>王秋实完成报修</div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>12:01</div>
          <div>2016.09.09</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已受理</span>
          </div>
          <div>贺平清受理报修</div>
          <div>指派给贺平清</div>
          <div>15062180721</div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>12:01</div>
          <div>2016.09.09</div>
        </div>
        <span class="middle-icon-green">
            <i class="last iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已提交</span>
          </div>
          <div>王秋实提交报修</div>
        </div>
      </div>
    </div>
    <!-- 已退回 -->
    <div class="status" v-if='status==="YBH"'>
      <div class="repair-progress">
        <div class="left">
          <div>12:01</div>
          <div>2016.09.09</div>
        </div>
        <span class=" middle middle-icon-error">
            <i class="iconMobile icon-error"></i>
          </span>
        <div class="right">
          <div>
            <span>已退回</span>
          </div>
          <div>王秋实打回</div>
          <div>退回意见：不存在</div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>12:01</div>
          <div>2016.09.09</div>
        </div>
        <span class="middle-icon-green">
            <i class="last iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已提交</span>
          </div>
          <div>王秋实提交报修</div>
        </div>
      </div>
    </div>
    <!-- 已评价 -->
    <div class="status" v-if='status==="YPJ"'>
      <div class="repair-progress">
        <div class="left">
          <div>12:01</div>
          <div>2016.09.09</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已评价</span>
          </div>
          <div>评分5星</div>
          <div>评论内容：很满意</div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>12:01</div>
          <div>2016.09.09</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已维修</span>
          </div>
          <div>王秋实完成报修</div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>12:01</div>
          <div>2016.09.09</div>
        </div>
        <span class="middle middle-icon-green">
            <i class="iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已受理</span>
          </div>
          <div>贺平清受理报修</div>
          <div>指派给贺平清</div>
          <div>15062180721</div>
        </div>
      </div>
      <div class="repair-progress">
        <div class="left">
          <div>12:01</div>
          <div>2016.09.09</div>
        </div>
        <span class=" middle-icon-green">
            <i class="last iconMobile icon-correct"></i>
          </span>
        <div class="right">
          <div>
            <span>已提交</span>
          </div>
          <div>王秋实提交报修</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    status: {
      type: String
    },
    visible:{
      type: Boolean
    },
    grade:{
      type: Boolean
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
  created() {


  },
  methods: {
    showPop(){
      this.visible = true;
      this.grade = true;
    }
  },
  components: {

  }
}
</script>
<style scoped>
.progress {
  background-color: #fff;
  & .progress-title {
    font-size: 28px;
    height: 80px;
    line-height: 80px;
    margin-left: 30px;
    border-bottom: 1Px solid #E8E8E8;
  }
  & .repair-progress {
    padding: 30px;
    display: flex;
    align-items: center;
    height: 200px;
    & .left {
      margin-left: 20px;
      text-align: right;
      font-size: 26px;
      color: #BDC0C5;
      width: 120px;
    }
    & .middle-icon-green {
      display: inline-block;
      margin-left: 20px;
      margin-right: 20px;
      background-color: #06c1ae;
      width: 24Px;
      height: 24Px;
      border-radius: 50%;
      & i {
        font-size: 40px;
        position: relative;
        color: #fff;
        &:after {
          position: absolute;
          height: 156px;
          left: 19px;
          right: 18px;
          top: 23Px;
          background: #e8e8e8;
          content: ''
        }
      }
    }
    & .middle-icon-yellow {
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
        left: 2px;
        &:after {
          position: absolute;
          height: 155px;
          left: 17px;
          right: 15px;
          top: 22Px;
          background: #E8E8E8;
          content: ''
        }
      }
    }
    & .middle-icon-error {
      display: inline-block;
      margin-left: 20px;
      margin-right: 20px;
      background-color: #ff571a;
      width: 24Px;
      height: 24Px;
      overflow: hidden;
      border-radius: 50%;
      & i {
        font-size: 35px;
        position: relative;
        color: #fff;
        top: 2px;
        left: 2px;
        &:after {
          position: absolute;
          height: 166px;
          left: 19px;
          right: 18px;
          top: 21Px;
          background: #E8E8E8;
          content: ''
        }
      }
    }
    & .right {
      font-size: 26px;
      color: #BDC0C5;
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
    position: absolute;
    height: 0px!important;
    left: 19px;
    right: 18px;
    top: 23Px;
    background: #e8e8e8;
    content: ''
  }
}
</style>
