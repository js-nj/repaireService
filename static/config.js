window.HOST = location.origin + '/publicapp';
window.IMGHOST = location.origin;
window.config = {
  wx: {
    debug: false,
    url: 'http://auth.sustc.edu.cn/checkSign',
    corp: 'sustc',
    uploadImgsToEmapUrl: window.IMGHOST + '/uploadWxImgsToEmap',
    emapPrefixPath: window.HOST
  },
  dd: 22
};
