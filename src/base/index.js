// 此处用于创建自定义函数,因为项目中有很多重复率高的代码,我进行整合,提高代码利用率,针对不同组件下采取相同的方法,只要给触发函数传入不同的值就行,在函数中再加判断

// exports.install = function(Vue,options){
// 现在已经不允许使用es5写法了,不然会报错 exports is not defined  ↓

// 所以必须用es6语法,下面两行正是es6语法下的写法

let base = {};
base.install = function (Vue, options) {
  //-------------- 处理日期数据的函数
  Vue.prototype.countDown = function (n) {
    // console.log(n)
    //----------------------- 根据更新时间
    // var true_date = n.split('T')[0] + ' ' + n.split('T')[1].split('.')[0]
    //----------------------- 根据发行时间
    let n_list = n.split(' ')[1].split('/')
    var true_date = n_list[2] + '-' + n_list[1] + '-' + n_list[0] + ' ' + n.split(' ')[0] + ':28'

    // console.log(true_date)
    let dateStamp = Date.parse(true_date.replace(/-/gi, "/"));

    let publishTime = dateStamp / 1000,
      d_seconds,
      d_minutes,
      d_hours,
      d_days,
      d_week,
      d_mouth,
      d_year,
      timeNow = parseInt(new Date().getTime() / 1000),
      d,
      date = new Date(publishTime * 1000),
      Y = date.getFullYear(),
      M = date.getMonth() + 1,
      D = date.getDate(),
      H = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds();
    //小于10的在前面补0
    if (M < 10) {
      M = '0' + M;
    }
    if (D < 10) {
      D = '0' + D;
    }
    if (H < 10) {
      H = '0' + H;
    }
    if (m < 10) {
      m = '0' + m;
    }
    if (s < 10) {
      s = '0' + s;
    }
    d = timeNow - publishTime;
    d_year = parseInt(d / 31536000);
    d_mouth = parseInt(d / 2592000);
    d_week = parseInt(d / 604800);
    d_days = parseInt(d / 86400);
    d_hours = parseInt(d / 3600);
    d_minutes = parseInt(d / 60);
    d_seconds = parseInt(d);
    if (d_year > 0) {
      return d_year + ' năm trước';  // 一年之前
    } else if (d_year <= 0 && d_mouth > 0) {
      return d_mouth + ' tháng trước';  // 月之前
      // return '30 ngày trước';  // 30天之前
    } else if (d_mouth <= 0 && d_week > 0) {
      return d_week + '  tuần trước';  // 周之前
    } else if (d_week <= 0 && d_days > 0) {
      return d_days + ' ngày trước';// 天之前
    } else if (d_days <= 0 && d_hours > 0) {
      return d_hours + ' giờ trước'; // 小时之前
    } else if (d_hours <= 0 && d_minutes > 0) {
      return d_minutes + ' phút trước'; // 分钟之前
    } else if (d_seconds < 60) {
      if (d_seconds <= 0) {
        return 'vừa mới xuất bản';
      } else {
        return d_seconds + ' giây trước';
      }
    } else if (d_days >= 3 && d_days < 30) {
      return M + '-' + D + ' ' + H + ':' + m;
    } else if (d_days >= 30) {
      return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
    }
  };
  //-------------- 置顶函数
  Vue.prototype.toTop = function (n) {
    document.documentElement.scrollTop = 0;
  };
  //-------------- 数组去重
  Vue.prototype.quChong = function (arr) {
    let map = new Map();
    for (let item of arr) {
      map.set(item.id, item);
    }
    arr = [...map.values()];
    // console.log(arr)
    return arr;
  };
  //-------------- 遍历数组并获取下标
  Vue.prototype.bianLi = function (arr, item) {
    //-------------- 遍历数组并获取下标
    arr.forEach((e, i) => {
      if (item === e.id) {
        arr.splice(i, 1)
      }
    });
    return arr;
  }
  //-------------- vue时间表转换
  Vue.prototype.vueTimeChange = function (arr, item) {
    let a = arr.toString()
    // console.log(a)
    let n = a.split(' ')
    // console.log(n[1])
    // 把英文字符换算成数字月份
    switch (n[1]) {
      case 'Jan':
        n[1] = '01'
        break;
      case 'Feb':
        n[1] = '02'
        break;
      case 'Mar':
        n[1] = '03'
        break;
      case 'Apr':
        n[1] = '04'
        break;
      case 'May':
        n[1] = '05'
        break;
      case 'Jun':
        n[1] = '06'
        break;
      case 'Jul':
        n[1] = '07'
        break;
      case 'Aug':
        n[1] = '08'
        break;
      case 'Sep':
        n[1] = '09'
        break;
      case 'Oct':
        n[1] = '10'
        break;
      case 'Nov':
        n[1] = '11'
        break;
      case 'Dec':
        n[1] = '12'
        break;
    }
    // console.log(n)
    let newdata = n[3]+'-'+n[1]+'-'+n[2]+' '+n[4]
    // console.log(newdata)
    return newdata;
  }
};

export default base;
