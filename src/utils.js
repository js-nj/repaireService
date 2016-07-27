// if (!Date.prototype.fromISOString) {
//     (function() {
//         var D = new Date('2011-06-02T09:34:29+02:00');
//         if (!D || +D !== 1307000069000) {
//             Date.fromISOString = function(s) {
//                 var day, tz, rx = /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/,
//                     p = rx
//                     .exec(s) || [];
//                 if (p[1]) {
//                     day = p[1].split(/\D/);
//                     for (var i = 0, L = day.length; i < L; i++) {
//                         day[i] = parseInt(day[i], 10) || 0;
//                     }

//                     day[1] -= 1;
//                     day = new Date(Date.UTC.apply(Date, day));
//                     if (!day.getDate())
//                         return NaN;
//                     if (p[5]) {
//                         tz = (parseInt(p[5], 10) * 60);
//                         if (p[6])
//                             tz += parseInt(p[6], 10);
//                         if (p[4] == '+')
//                             tz *= -1;
//                         if (tz)
//                             day.setUTCMinutes(day.getUTCMinutes() + tz);
//                     }
//                     return day;
//                 }
//                 return NaN;
//             }
//         } else {
//             Date.fromISOString = function(s) {
//                 return new Date(s);
//             }
//         }
//     })();
// }

// function _fixTime(time, flag, noYear) {
//     function _n2(n) {
//         return (100 + n).toString().substr(1, 2);
//     }
//     time = Date.fromISOString(time);
//     var s = '';
//     if (time.getYear() !== new Date().getYear())
//         s = (time.getFullYear() + "").slice(-2) + "年";
//     if (!noYear) {
//         if (flag) {
//             return s + (time.getMonth() + 1) + "月" + time.getDate() + "日 ";
//         } else {
//             return s + (time.getMonth() + 1) + "月" + time.getDate() + "日 " + _n2(time.getHours()) + ":" + _n2(time.getMinutes());
//         }
//     } else {
//         return (time.getMonth() + 1) + "月" + time.getDate() + "日 " + _n2(time.getHours()) + ":" + _n2(time.getMinutes());
//     }
// }
function _fixTime(time, flag, noYear) {
  function _n2(n) {
      return (100 + n).toString().substr(1, 2);
  }
  // time = new Date(time);
  time = new Date(time.replace(/\s+/g, 'T').concat('.000+08:00'));
  var s = '';
  if (time.getYear() !== new Date().getYear())
      s = (time.getFullYear() + "").slice(-2) + "年";
  if (!noYear) {
      if (flag) {
          return s + (time.getMonth() + 1) + "月" + time.getDate() + "日 ";
      } else {
          return s + (time.getMonth() + 1) + "月" + time.getDate() + "日 " + _n2(time.getHours()) + ":" + _n2(time.getMinutes());
      }
  } else {
      return (time.getMonth() + 1) + "月" + time.getDate() + "日 " + _n2(time.getHours()) + ":" + _n2(time.getMinutes());
  }
}
module.exports = {
    fixTime: _fixTime
};
