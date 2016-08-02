import { Toast } from 'bh-mint-ui';
var foundationUrl = 'http://amptest.wisedu.com/ggfw/sys/hqwxxt/api';

function postData(url, options, successCallback, errorCallback) {
    this.$http.post(foundationUrl + url, options, ).then(successCallback, errorCallback);
}
var merge = function() {
  return Array.prototype.concat.apply([], arguments)
};
function loadData(state, num, app) {
  var self = this;
  postData.call(self,'/getMyRepairsPagination.do',{state:state,pageNumber:num,pageSize:10}, function(result) {
    if(result.data.datas) {
      var data = result.data.datas.bxsscxwdbxjlbg;
      if(app) {
        self.unreadNum.repaired = data.totalSize;
      } else {
        if(data.rows.length > 0) {
          self.dataResource = merge(self.dataResource,data.rows);
        }
        if(data.rows.length < 10) {
          self.allLoaded = true;
        }
      }
    } else {
      self.allLoaded = true;
    }
  },function(err) {
      Toast('取列表数据失败');
  });
}
function doComment(option) {
  var self = this;
  postData.call(self,'/commitCommentById.do',option, function(result) {
    if(result.data.success) {
      self.$dispatch('grade-close', false);
      self.$router.replace('/waitProcess');
    }
  },function(err) {
    Toast('评价失败！');
  });
}
function getRepairType() {
  var self = this;
  postData.call(self,'/dic/8e4fd5c6-8bfc-4157-b5d5-3435c27d48be.do','', function(result) {
    this.repair[this.presentPicker].map = result.data.datas.code.rows;
    var pickerarr = [];
    for (var i = 0; i < this.repair[this.presentPicker].map.length; i++) {
      pickerarr.push(this.repair[this.presentPicker].map[i].name)
    }
    this.slots[0].values = merge(['请选择'],pickerarr)
  },function(err) {
    Toast('获取数据失败！');
  });
}
function getRepairLoc() {
  var self = this;
  postData.call(self,'/dic/bb89c7e0-d3f9-4f64-978a-ee4eb21ae9e3.do','', function(result) {
    this.repair[this.presentPicker].map = result.data.datas.code.rows;
    var pickerarr = [];
    for (var i = 0; i < this.repair[this.presentPicker].map.length; i++) {
      pickerarr.push(this.repair[this.presentPicker].map[i].name)
    }
    this.slots[0].values = merge(['请选择'],pickerarr)
  },function(err) {
    Toast('获取数据失败！');
  });
}
function getRepairlocationinfo(val) {
  var self = this;
  postData.call(self,'/getRepairAreaByZone.do',{QYDM:val}, function(result) {
    this.repair[this.presentPicker].map = result.data.data;
    var pickerarr = [];
    for (var i = 0; i < this.repair[this.presentPicker].map.length; i++) {
      pickerarr.push(this.repair[this.presentPicker].map[i].label)
    }
    this.slots[0].values = pickerarr
  },function(err) {
    Toast('获取数据失败！');
  });
}
function saveRepair(option) {
  var self = this;
  postData.call(self,'/saveMyRepairInfo.do',option, function(result) {
    self.$router.replace('/waitProcess');
  },function(err) {
    Toast('保存数据失败！');
  });
}
module.exports = {
  loadData: loadData,
  doComment: doComment,
  getRepairType: getRepairType,
  getRepairLoc: getRepairLoc,
  getRepairlocationinfo: getRepairlocationinfo,
  saveRepair: saveRepair
};
