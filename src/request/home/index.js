import http from '../http.js';

// get请求
// let getvip = (params) => {
//   return http({
//     url: '/grade/grade',
//     params
//   })
// }

// post请求
// let addvip = (data) => {
//   return http({
//     method: 'POST',
//     url: '/grade/grade',
//     data
//   })
// }
let material = (data) => {
  return http({
    method: 'POST',
    url: '/material/index',
    data
  })
}
let typecontrol = (data) => {
  return http({
    method: 'POST',
    url: '/Typecontrol/index',
    data
  })
}
let material_add = (data) => {
  return http({
    method: 'POST',
    url: '/Material/add',
    data
  })
}
let material_del = (data) => {
  return http({
    method: 'POST',
    url: '/material/delete',
    data
  })
}
let headImage = (data) => {
  return http({
    method: 'POST',
    url: '/Headimage/index',
    data
  })
}
let head_image_add = (data) => {
  return http({
    method: 'POST',
    url: '/Headimage/add',
    data
  })
}
let nickName = (data) => {
  return http({
    method: 'POST',
    url: '/Nickname/index',
    data
  })
}
let nickName_add = (data) => {
  return http({
    method: 'POST',
    url: '/Nickname/add',
    data
  })
}
let autograph = (data) => {
  return http({
    method: 'POST',
    url: '/Autograph/index',
    data
  })
}
let autograph_add = (data) => {
  return http({
    method: 'POST',
    url: '/Autograph/add',
    data
  })
}


export default {
  // getvip,
  // addvip,
  material,
  typecontrol,
  material_add,
  material_del,
  headImage,
  head_image_add,
  nickName,
  nickName_add,
  autograph,
  autograph_add,
}
