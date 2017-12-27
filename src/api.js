  import {
    Toast
  } from 'bh-mint-ui2';
  
  function postData(url, options, successCallback, errorCallback) {
    axios({method:'GET',url:WEBPACK_CONIFG_HOST + 'sys/hqwxxt/api' + url,params: options}).then(successCallback, errorCallback);
  }

  var merge = function() {
    return Array.prototype.concat.apply([], arguments)
  };
  
  function loadData(state, num, app) {
    var self = this;
    postData.call(self, '/getMyRepairsPagination.do', {
      state: state,
      pageNumber: num,
      pageSize: 10
    }, function(result) {
      self.loading = true;
      if (result.data.datas) {
        var data = result.data.datas.bxsscxwdbxjlbg;
        if (app) {
          self.unreadNum.repaired = data.totalSize;
        } else {
          if (data.rows.length > 0) {
            self.dataResource = merge(self.dataResource, data.rows);
          }
          if (data.rows.length < 10) {
            self.allLoaded = true;
          }
        }
      } else {
        self.allLoaded = true;
      }
    }, function(err) {
      Toast('取列表数据失败');
    });
  }
  
  function loadRepairData(num) {
    var self = this;
    postData.call(self, '/getMyDisrepairList.do', {
      pageNumber: num,
      pageSize: 10
    }, function(result) {
      self.loading = true;
      if (result.data.datas) {
        var data = result.data.datas.wxryjmbg;
        if (data.rows.length > 0) {
          self.dataResource = merge(self.dataResource, data.rows);
        }
        if (data.rows.length < 10) {
          self.allLoaded = true;
        }
        if (self.dataResource.length < 1) {
          self.isshow = true;
        }
      } else {
        self.allLoaded = true;
      }
    }, function(err) {
      Toast('取列表数据失败');
    });
  }
  
  function doComment(option) {
    var self = this;
    postData.call(self, '/commitCommentById.do', option, function(result) {
      if (result.data.success) {
        self.$dispatch('grade-close', false);
        self.$router.replace('/waitProcess');
      }
    }, function(err) {
      Toast('评价失败！');
    });
  }
  
  function getRepairType() {
    var self = this;
    postData.call(self, '/dic/8e4fd5c6-8bfc-4157-b5d5-3435c27d48be.do', '', function(result) {
      //var pickerarr = [];
      var typeObj = {};
      var targetArr = '';
  
      for (var i = 0; i < result.data.datas.code.rows.length; i++) {
        var itemName = result.data.datas.code.rows[i].name;
        //pickerarr.push(itemName)
        //new picker
        if (itemName.indexOf('类') > -1) {
          typeObj[itemName] = [];
          targetArr = itemName;
        } else {
          typeObj[targetArr].push(itemName);
        }
      }
      //self.slots[0].values = pickerarr;
      self.address = typeObj;
      self.slots['0'].values = Object.keys(typeObj); //Object.keys(typeObj);
      self.slots['2'].values = typeObj[Object.keys(typeObj)[0]]; //typeObj[Object.keys(typeObj)[0]];
  
    }, function(err) {
      Toast('获取数据失败！');
    });
  }
  
  function getRepairLoc() {
    var self = this;
    postData.call(self, '/dic/bb89c7e0-d3f9-4f64-978a-ee4eb21ae9e3.do', '', function(result) {
  
      self.repair[self.presentPicker].map = result.data.datas.code.rows;
  
      var pickerarr = [];
      for (var i = 0; i < self.repair[self.presentPicker].map.length; i++) {
        pickerarr.push(self.repair[self.presentPicker].map[i].name)
      }
      self.slots[0].values = merge(['请选择'], pickerarr)
    }, function(err) {
      Toast('获取数据失败！');
    });
  }
  
  function getRepairlocationinfo(val) {
    var self = this;
  
    postData.call(self, '/getRepairAreaByZone.do', {
      QYDM: val
    }, function(result) {
      this.repair[this.presentPicker].map = result.data.data;
  
      var pickerarr = [];
      for (var i = 0; i < self.repair[self.presentPicker].map.length; i++) {
        pickerarr.push(self.repair[self.presentPicker].map[i].label)
      }
      self.slots[0].values = pickerarr
    }, function(err) {
      Toast('获取数据失败！');
    });
  }
  
  function getRepaireAreaInfo() {
    var self = this;
    postData.call(self, '/getRepaireInfo.do', '', function(result) {
      if (result.status == 200) {
        let data = result.data;
        let returnArr = [];
        let multiArr = {};
        let mapArr = {};
        for (let i = 0; i < data.length; i++) {
          multiArr = {};
          multiArr[data[i].name] = [];
          self.QYArr.push({
            id: data[i].code,
            name: data[i].name
          });
          if (data[i].areaPlaces) {
            for (let j = 0; j < data[i].areaPlaces.length; j++) {
              multiArr[data[i].name].push(data[i].areaPlaces[j].name)
              mapArr[String(i) + String(j)] = {
                id: data[i].areaPlaces[j].code,
                name: data[i].areaPlaces[j].name
              };
            }
          }
          returnArr.push(multiArr)
        }
        self.returnArr = returnArr;
        self.mapArr = mapArr;
        //mock 数据 接口调不通
        var typeObj2 = {};
        data.forEach(function(item){
            typeObj2[item.name] = item.areaPlaces.map((place)=>place.name);
        });
        self.addressArea = typeObj2;
        self.slotsArea['0'].values = Object.keys(typeObj2); //Object.keys(typeObj);
        self.slotsArea['2'].values = typeObj2[Object.keys(typeObj2)[0]]; //typeObj[Object.keys(typeObj)[0]];
      } else {
        Toast('获取数据失败！');
      }
    }, function(err) {
      Toast('获取数据失败！');
    });
    //type=1表示保修类型
    let type = {
      type: 1
    }
    postData.call(self, '/getRepaireInfo.do', type, function(result) {
      if (result.status == 200) {
        let data = result.data;
        let returnArr = [];
        let multiArr = {};
        let mapArr = {};
        for (let i = 0; i < data.length; i++) {
          multiArr = {};
          multiArr[data[i].name] = [];
          self.GZLX.push({
            id: data[i].code,
            name: data[i].name
          });
          if (data[i].areaPlaces.length) {
            for (let j = 0; j < data[i].areaPlaces.length; j++) {
              multiArr[data[i].name].push(data[i].areaPlaces[j].name)
              mapArr[String(i) + String(j)] = {
                id: data[i].areaPlaces[j].code,
                name: data[i].areaPlaces[j].name
              };
            }
          } else {
            multiArr[data[i].name].push(data[i].name);
            mapArr[String(i) + '0'] = {
              id: data[i].code,
              name: data[i].name
            };
          }
          returnArr.push(multiArr)
        }
        self.returnTypeArr = returnArr;
        self.mapTypeArr = mapArr;
        data.forEach(function(item){
          self.address[item.name] = item.areaPlaces.map(function(place){
            return place.name;
          });
        });
        var keys = Object.keys(self.address);
        self.slots[0].values = keys;
        self.slots[2].values = self.address[keys[0]];
      } else {
        Toast('获取数据失败！');
      }
    }, function(err) {
      Toast('获取数据失败！');
    });
  }
  
  function saveRepair(option) {
    var self = this;
    postData.call(self, '/saveMyRepairInfo.do', option, function(result) {
      self.$router.replace('/waitProcess');
    }, function(err) {
      Toast('保存数据失败！');
    });
  }

  


  /**
 * WEBPACK_CONIFG_HOST的值，在webpack.config.js中更改
 * 开发环境时 = "http://amptest.wisedu.com/xsfwfw/"
 * 发布环境时 = location.origin + location.pathname.substring(0, location.pathname.indexOf("/", 1)) + "/"
 */
export default {
	  loadData: loadData,
    loadRepairData: loadRepairData,
    doComment: doComment,
    getRepairType: getRepairType,
    getRepairLoc: getRepairLoc,
    getRepairlocationinfo: getRepairlocationinfo,
    getRepaireAreaInfo: getRepaireAreaInfo,
    saveRepair: saveRepair,
    getMyDisrepairList: WEBPACK_CONIFG_HOST + 'sys/hqwxxt/api/getMyDisrepairList.do',
    saveJd: WEBPACK_CONIFG_HOST + 'sys/hqwxxt/hqwx/saveJd.do',
    saveTd: WEBPACK_CONIFG_HOST + 'sys/hqwxxt/hqwx/saveTd.do',
    saveJxwxUrl:WEBPACK_CONIFG_HOST +'sys/hqwxxt/hqwx/saveJxwx.do',
    batchUpDwx: WEBPACK_CONIFG_HOST + 'sys/hqwxxt/hqwx/batchUpDwx.do',
    completeOrders:WEBPACK_CONIFG_HOST + "sys/hqwxxt/api/batchFinishRepair.do",
    queryCommentsByWid:WEBPACK_CONIFG_HOST + '/sys/hqwxxt/modelpage/yyglyhqbxbgjm/T_IT_HQWX_BBS_QUERY.do',
    addComment:WEBPACK_CONIFG_HOST + 'sys/hqwxxt/hqwx/saveHf.do',
    getMyDisrepairYbList:WEBPACK_CONIFG_HOST + 'sys/hqwxxt/api/getMyDisrepairYbList.do',
    //整理上面的请求函数
    getMyRepairsPagination:WEBPACK_CONIFG_HOST +'sys/hqwxxt/api/getMyRepairsPagination.do'
    
}