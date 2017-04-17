<template>
  <span class="grade-list">
      <i class="iconfont icon-wujiaoxing1" :class="{'grade-show':gradeshow[0]}"></i>
      <i class="iconfont icon-wujiaoxing1" :class="{'grade-show':gradeshow[1]}"></i>
      <i class="iconfont icon-wujiaoxing1" :class="{'grade-show':gradeshow[2]}"></i>
      <i class="iconfont icon-wujiaoxing1" :class="{'grade-show':gradeshow[3]}"></i>
      <i class="iconfont icon-wujiaoxing1" :class="{'grade-show':gradeshow[4]}"></i>
    </span>
</template>
<script>
export default {
  created() {
      if (this.bxcommentpoints !== '') {
        var num = []
        for (var i = 0; i < 5; i++) {
          if (i < Number(this.bxcommentpoints)) {
            num[i] = true
          } else {
            num[i] = false
          }
        }
        this.gradeshow = num;
      }
    },
    data() {
      return {
        gradeshow: [false, false, false, false, false]
      }
    },
    props: {
      bxcommentpoints: {
        type: String
      }
    }
}
</script>
<style scoped>
.grade-list {
  display: inline-block;
  height: 50px;
  padding-left: 20px;
  line-height: 50px;
  text-align: left;
  & .grade-show {
    color: #FF8605;
  }
}
</style>
