module.exports = {
  config: {
    wx: {
      debug: false,
      url: 'http://res.wisedu.com:8888/checkSign',
      corp: 'sustc',
      uploadImgsToEmapUrl: global.IMGHOST + '/uploadWxImgsToEmap',
      emapPrefixPath: global.HOST
    },
    dd: 22
  }
}
