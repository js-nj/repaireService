<template>
  <div class="list-item" @click="messageInfo">
    <div class="item-main">
      <div class="left">
        <div class="message-title">{{messagetitle}}</div>
        <div class="item-main-info">
          <span class="span-info">{{info}}</span>
          <div class="time-zone"><span>报修时间 </span>{{timezone |formattime}}</div>
        </div>
      </div>
      <img class="item-img" v-if="img" :src="imgurl">
    </div>
  </div>
</template>
<script>
import utils from '../utils.js';
import fixTime from 'formattime';
export default {
  data() {
      return {
        imgurl: global.HOST + '/sys/emapcomponent/file/getFileByToken/' + this.img + '.do'
      }
    },
    filters: {
      // fixtime: utils.fixTime,
      formattime(val) {
        let date = val.split(" ");
        let yearMonth = date[0].split('-');
        let time = date[1].split(':');
        return fixTime(new Date(yearMonth[0], (yearMonth[1] - 1), yearMonth[2], time[0], time[1]).getTime(), [{
          separate: -60 * 1000,
          formateStyle: '刚刚'
        }, {
          separate: -60 * 60 * 1000,
          formateStyle: '#{{HH}}:#{{mm}}'
        }, {
          separate: -24 * 60 * 60 * 1000,
          formateStyle: '#{{hour}}小时前'
        }, {
          separate: -2 * 24 * 60 * 60 * 1000,
          formateStyle: '昨天 #{{HH}}:#{{mm}}',
        }, {
          separate: -3 * 24 * 60 * 60 * 1000,
          formateStyle: '前天 #{{HH}}:#{{mm}}',
        }, {
          separate: -Infinity,
          formateStyle: '#{{YYYY}}-#{{MM}}-#{{DD}}',
        }])
      },
    },
    methods: {
      messageInfo: function() {
        this.$router.go({
          name: 'repairInfo',
          params: {
            info: JSON.stringify(this.all)
          }
        })
      }
    },
    props: {
      messagetitle: {
        type: String
      },
      info: {
        type: String
      },
      timezone: {
        type: String
      },
      tag: {
        type: String
      },
      img: {
        type: String
      },
      all: {
        type: Object
      },
      iswork: {
        type: Boolean
      }
    },
    created() {
      this.all.iswork = this.iswork;
    }
}
</script>
<style scoped>
.list-item {
  background-color: #fff;
  border-bottom: 1PX solid #E8E9EC;
  padding: 30px;
  & .item-main {
    display: flex;
    justify-content: space-between;
    & .left {
      & .message-title {
        color: #403F44;
        font-size: 30px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      & .item-main-info {
        padding: 10px 0;
        color: #B4B4B4;
        & .span-info {
          font-size: 22px;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        & .time-zone {
          font-size: 20px;
          padding: 20px 0 0 0;
        }
      }
    }
    & .item-img {
      width: 160px;
      height: 140px;
      flex: 0 0 auto;
      margin-left: 30px;
    }
  }
}
</style>
