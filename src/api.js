var foundationUrl = 'http://amptest.wisedu.com/ggfw/sys/hqwxxt/api/';

function postData(url, options, successCallback, errorCallback) {
    this.$http.post(foundationUrl + url, options).then(successCallback, errorCallback);
}
module.exports = postData;