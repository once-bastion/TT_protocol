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
let typecontrol_list = (data) => {
  return http({
    method: 'POST',
    url: '/Typecontrol/indexlist',
    data
  })
}
let typecontrol_add = (data) => {
  return http({
    method: 'POST',
    url: '/Typecontrol/add',
    data
  })
}
let typecontrol_softDel = (data) => {
  return http({
    method: 'POST',
    url: '/Typecontrol/Soft_deletion',
    data
  })
}
let typecontrol_del = (data) => {
  return http({
    method: 'POST',
    url: '/Typecontrol/delete',
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
let head_image_del = (data) => {
  return http({
    method: 'POST',
    url: '/Headimage/delete',
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
let nickName_del = (data) => {
  return http({
    method: 'POST',
    url: '/Nickname/delete',
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
let autograph_del = (data) => {
  return http({
    method: 'POST',
    url: '/Autograph/delete',
    data
  })
}


export default {
  // getvip,
  // addvip,
  material,
  typecontrol,
  typecontrol_list,
  typecontrol_add,
  typecontrol_softDel,
  typecontrol_del,
  material_add,
  material_del,
  headImage,
  head_image_add,
  head_image_del,
  nickName,
  nickName_add,
  nickName_del,
  autograph,
  autograph_add,
  autograph_del,
}
