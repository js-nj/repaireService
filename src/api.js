import { Toast } from 'bh-mint-ui';
function postData(url, options, successCallback, errorCallback) {
    this.$http.get(global.HOST + '/sys/hqwxxt/api' + url, {params:options}).then(successCallback, errorCallback);
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
function loadRepairData(num) {
  var self = this;
  postData.call(self,'/getMyDisrepairList.do',{pageNumber:num,pageSize:10}, function(result) {
    if(result.data.datas) {
      var data = result.data.datas.wxryjmbg;
      if(data.rows.length > 0) {
        self.dataResource = merge(self.dataResource,data.rows);
      }
      if(data.rows.length < 10) {
        self.allLoaded = true;
      }
      if(self.dataResource.length < 1) {
        self.isshow = true;
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
    var pickerarr = [];
    for (var i = 0; i < result.data.datas.code.rows.length; i++) {
      pickerarr.push(result.data.datas.code.rows[i].name)
    }
    self.GZLX = pickerarr;
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
function getRepaireAreaInfo() {
  var self = this;
  postData.call(self,'/getRepaireAreaInfo.do','', function(result) {
    if(result.status == 200) {
      var data = result.data;
      var returnArr = [];
      var multiArr = {};
      var mapArr = {};
      for (var i = 0; i < data.length; i++) {
        multiArr = {};
        multiArr[data[i].name] = [];
        self.QYArr.push({id:data[i].code,name:data[i].name});
        if(data[i].areaPlaces) {
          for (var j = 0; j < data[i].areaPlaces.length; j++) {
            multiArr[data[i].name].push(data[i].areaPlaces[j].name)
            mapArr[String(i)+String(j)] = {id:data[i].areaPlaces[j].code, name: data[i].areaPlaces[j].name};
          }
        }
        returnArr.push(multiArr)
      }
      self.returnArr = returnArr;
      self.mapArr = mapArr
    } else {
      Toast('获取数据失败！');
    }
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
  loadRepairData: loadRepairData,
  doComment: doComment,
  getRepairType: getRepairType,
  getRepairLoc: getRepairLoc,
  getRepairlocationinfo: getRepairlocationinfo,
  getRepaireAreaInfo: getRepaireAreaInfo,
  saveRepair: saveRepair
};
