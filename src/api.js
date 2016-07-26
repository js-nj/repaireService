var foundationUrl = 'http://amptest.wisedu.com/ggfw/sys/hqwxxt/api';

function postData(url, options, successCallback, errorCallback) {
    this.$http.post(foundationUrl + url, options).then(successCallback, errorCallback);
}
var merge = function() {
  return Array.prototype.concat.apply([], arguments)
};
function loadData(state, num) {
  var self = this;
  postData.call(self,'/getMyRepairsPagination.do',{state:state,pageNumber:num,pageSize:10}, function(result) {
    var data = result.data.datas.bxsscxwdbxjlbg;
    if(data.rows.length>0) {
      self.dataResource=merge(self.dataResource,data.rows);
    }else{
      self.allLoaded = true;
    }
  },function(err) {
  })  
}
module.exports = loadData;